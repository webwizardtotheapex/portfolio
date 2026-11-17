// @ts-nocheck
/**
 * Portfolio Projects CMS — standalone LOCAL authoring server.
 *
 * This runs ONLY on your machine via `npm run cms`. It is never part of
 * `next build` and never shipped to GitHub Pages — the production site stays a
 * 100% static export. It reads/writes two committed files and uploads images:
 *
 *   • content/projects.json      ← the project gallery (what the site renders)
 *   • content/icon-catalog.json  ← pickable icon names (read-only here)
 *   • public/projects/<img>      ← uploaded screenshots
 *
 * Publish workflow: edit here → Save → `git add` + `commit` + `push`.
 * The existing GitHub Action rebuilds and deploys to soldevhassan.com.
 *
 * Node builtins only — zero dependencies.
 */
import http from 'node:http';
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..'); // portfolio/
const CONTENT_DIR = path.join(ROOT, 'content');
const PROJECTS_FILE = path.join(CONTENT_DIR, 'projects.json');
const ICONS_FILE = path.join(CONTENT_DIR, 'icon-catalog.json');
const PUBLIC_PROJECTS_DIR = path.join(ROOT, 'public', 'projects');
const ADMIN_HTML = path.join(__dirname, 'admin.html');

const PORT = Number(process.env.CMS_PORT) || 4321;
const ARCH_KINDS = ['trigger', 'ai', 'process', 'output'];
const REQUIRED_TEXT = ['id', 'title', 'tagline', 'description', 'impact', 'gradient', 'emoji'];
const MAX_UPLOAD_BYTES = 12 * 1024 * 1024; // 12 MB per image
const MAX_BODY_BYTES = 25 * 1024 * 1024; // 25 MB request cap

/* --------------------------------- helpers -------------------------------- */

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (c) => {
      total += c.length;
      if (total > MAX_BODY_BYTES) {
        reject(new Error('Request body too large.'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function loadIconNames() {
  const raw = JSON.parse(await readFile(ICONS_FILE, 'utf8'));
  return new Set(raw.map((e) => e.name));
}

/** Mirrors lib/projects.ts validation so bad data is caught before writing. */
function validateProjects(projects, iconNames) {
  if (!Array.isArray(projects)) throw new Error('Payload must be an array of projects.');
  const seen = new Set();
  projects.forEach((p, i) => {
    const where = `Project #${i + 1}${p && p.id ? ` ("${p.id}")` : ''}`;
    if (!p || typeof p !== 'object') throw new Error(`${where} is not an object.`);
    for (const key of REQUIRED_TEXT) {
      if (typeof p[key] !== 'string' || p[key].trim() === '') {
        throw new Error(`${where}: field "${key}" is required.`);
      }
    }
    if (!/^[a-z0-9-]+$/.test(p.id)) {
      throw new Error(`${where}: id must be kebab-case (lowercase letters, numbers, dashes).`);
    }
    if (seen.has(p.id)) throw new Error(`Duplicate project id "${p.id}".`);
    seen.add(p.id);
    if (!Array.isArray(p.features) || p.features.length === 0) {
      throw new Error(`${where}: at least one feature is required.`);
    }
    if (!Array.isArray(p.tech) || p.tech.length === 0) {
      throw new Error(`${where}: at least one tech tag is required.`);
    }
    if (p.images !== undefined && !Array.isArray(p.images)) {
      throw new Error(`${where}: "images" must be an array.`);
    }
    if (p.arch !== undefined) {
      if (!Array.isArray(p.arch)) throw new Error(`${where}: "arch" must be an array.`);
      p.arch.forEach((stage, si) => {
        if (!stage || typeof stage.title !== 'string' || stage.title.trim() === '') {
          throw new Error(`${where}: arch stage #${si + 1} needs a title.`);
        }
        if (!Array.isArray(stage.nodes) || stage.nodes.length === 0) {
          throw new Error(`${where}: arch stage "${stage.title}" needs at least one node.`);
        }
        stage.nodes.forEach((node, ni) => {
          const nw = `${where} · stage "${stage.title}" · node #${ni + 1}`;
          if (!node || typeof node.label !== 'string' || node.label.trim() === '') {
            throw new Error(`${nw}: label is required.`);
          }
          if (!ARCH_KINDS.includes(node.kind)) {
            throw new Error(`${nw}: kind "${node.kind}" is invalid (use ${ARCH_KINDS.join(', ')}).`);
          }
          if (!iconNames.has(node.icon)) {
            throw new Error(`${nw}: unknown icon "${node.icon}".`);
          }
        });
      });
    }
  });
}

/** Normalize to the on-disk shape (drop empty optionals, keep key order stable). */
function normalizeProjects(projects) {
  return projects.map((p) => {
    const out = {
      id: p.id.trim(),
      title: p.title.trim(),
      tagline: p.tagline.trim(),
      description: p.description.trim(),
      features: p.features.map((f) => String(f).trim()).filter(Boolean),
      tech: p.tech.map((t) => String(t).trim()).filter(Boolean),
      impact: p.impact.trim(),
    };
    if (p.github) out.github = p.github.trim();
    if (p.demo) out.demo = p.demo.trim();
    out.gradient = p.gradient.trim();
    out.emoji = p.emoji.trim();
    if (Array.isArray(p.images) && p.images.length) out.images = p.images.slice();
    if (Array.isArray(p.arch) && p.arch.length) {
      out.arch = p.arch.map((s) => ({
        title: s.title.trim(),
        nodes: s.nodes.map((n) => ({ label: n.label.trim(), icon: n.icon, kind: n.kind })),
      }));
    }
    return out;
  });
}

async function writeProjectsAtomic(projects) {
  const json = JSON.stringify(projects, null, 2) + '\n';
  const tmp = PROJECTS_FILE + '.tmp';
  await writeFile(tmp, json, 'utf8');
  await rename(tmp, PROJECTS_FILE);
}

const EXT_BY_MIME = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

const CONTENT_TYPE_BY_EXT = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  avif: 'image/avif',
};

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

async function handleUpload(body) {
  const { projectId, filename, dataUrl } = JSON.parse(body.toString('utf8'));
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl || '');
  if (!match) throw new Error('Expected a base64 data URL.');
  const mime = match[1].toLowerCase();
  const ext = EXT_BY_MIME[mime];
  if (!ext) throw new Error(`Unsupported image type "${mime}".`);
  const buf = Buffer.from(match[2], 'base64');
  if (buf.length > MAX_UPLOAD_BYTES) throw new Error('Image exceeds 12 MB.');

  const base = slug(projectId || 'project') || 'project';
  const stem = slug((filename || '').replace(/\.[^.]+$/, '')) || 'image';
  const unique = Date.now().toString(36).slice(-5);
  const name = `${base}-${stem}-${unique}.${ext}`;

  // Containment guard: resolved path MUST stay inside public/projects.
  const dest = path.join(PUBLIC_PROJECTS_DIR, name);
  if (path.dirname(path.resolve(dest)) !== path.resolve(PUBLIC_PROJECTS_DIR)) {
    throw new Error('Invalid filename.');
  }
  await mkdir(PUBLIC_PROJECTS_DIR, { recursive: true });
  await writeFile(dest, buf);
  return { path: `/projects/${name}` };
}

/* --------------------------------- routes --------------------------------- */

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const { pathname } = url;

    if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
      const html = await readFile(ADMIN_HTML);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(html);
      return;
    }

    if (req.method === 'GET' && pathname === '/api/projects') {
      const raw = await readFile(PROJECTS_FILE, 'utf8').catch(() => '[]');
      sendJson(res, 200, JSON.parse(raw));
      return;
    }

    if (req.method === 'GET' && pathname === '/api/icons') {
      const raw = await readFile(ICONS_FILE, 'utf8');
      sendJson(res, 200, JSON.parse(raw));
      return;
    }

    // Read-only: serve uploaded screenshots so the admin can show thumbnails.
    if (req.method === 'GET' && pathname.startsWith('/projects/')) {
      const name = path.basename(decodeURIComponent(pathname));
      const file = path.join(PUBLIC_PROJECTS_DIR, name);
      if (path.dirname(path.resolve(file)) !== path.resolve(PUBLIC_PROJECTS_DIR)) {
        sendJson(res, 404, { error: 'Not found.' });
        return;
      }
      const buf = await readFile(file).catch(() => null);
      if (!buf) { sendJson(res, 404, { error: 'Not found.' }); return; }
      const ext = path.extname(name).slice(1).toLowerCase();
      const type = CONTENT_TYPE_BY_EXT[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
      res.end(buf);
      return;
    }

    if (req.method === 'POST' && pathname === '/api/projects') {
      const body = await readBody(req);
      let payload;
      try {
        payload = JSON.parse(body.toString('utf8'));
      } catch {
        sendJson(res, 400, { error: 'Request body is not valid JSON.' });
        return;
      }
      const iconNames = await loadIconNames();
      try {
        validateProjects(payload, iconNames);
      } catch (err) {
        sendJson(res, 400, { error: err.message });
        return;
      }
      const normalized = normalizeProjects(payload);
      await writeProjectsAtomic(normalized);
      sendJson(res, 200, { ok: true, count: normalized.length });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/upload') {
      const body = await readBody(req);
      try {
        const result = await handleUpload(body);
        sendJson(res, 200, result);
      } catch (err) {
        sendJson(res, 400, { error: err.message });
      }
      return;
    }

    sendJson(res, 404, { error: 'Not found.' });
  } catch (err) {
    sendJson(res, 500, { error: err && err.message ? err.message : 'Internal error.' });
  }
});

function openBrowser(targetUrl) {
  try {
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', '""', targetUrl], { detached: true, stdio: 'ignore' }).unref();
    } else if (process.platform === 'darwin') {
      spawn('open', [targetUrl], { detached: true, stdio: 'ignore' }).unref();
    } else {
      spawn('xdg-open', [targetUrl], { detached: true, stdio: 'ignore' }).unref();
    }
  } catch {
    /* opening the browser is best-effort */
  }
}

server.listen(PORT, () => {
  const addr = `http://localhost:${PORT}`;
  console.log('\n  Portfolio Projects CMS');
  console.log('  ----------------------');
  console.log(`  Editing : ${path.relative(ROOT, PROJECTS_FILE)}`);
  console.log(`  Open    : ${addr}`);
  console.log('\n  After saving, publish with:');
  console.log('    git add content/projects.json public/projects');
  console.log('    git commit -m "Update projects"');
  console.log('    git push\n');
  console.log('  Press Ctrl+C to stop.\n');
  openBrowser(addr);
});
