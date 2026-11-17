# Adding projects with the CMS

Your portfolio has a small built-in CMS so you can add and edit projects
**without touching code**. It runs on your computer, writes to a file in the
repo, and you publish by pushing to GitHub — the site stays 100% static.

> You never need an account, a database, or a server. Nothing about the CMS is
> deployed to soldevhassan.com.

---

## 1. Start the CMS

In the `portfolio` folder:

```bash
npm run cms
```

Your browser opens `http://localhost:4321` with the editor. (If it doesn't open
automatically, click the link printed in the terminal.)

## 2. Add or edit a project

- Click **+ Add project** (left) — or click an existing one to edit it.
- Fill in **Title** (the slug/id fills in automatically), **Tagline**,
  **Description**, **Impact**, and an **Emoji**.
- Add **Features** and **Tech** tags: type a value and press **Enter**.
- Pick an **Accent gradient** swatch.
- **Links** — for GitHub and Demo buttons choose:
  - **Default** — uses your standard GitHub / booking link,
  - **Custom URL** — link a specific repo or demo,
  - **Hidden** — no button.
- **Screenshots** — click the upload box and choose one or more images. They're
  saved into `public/projects/`. Reorder with ◀ ▶, remove with 🗑. The first
  image is the card's main shot.
- **Architecture diagram** (optional) — add stages, and inside each stage add
  nodes. Each node has a **label**, an **icon** (pick from the list), and a
  **kind**: Trigger, AI, Logic, or Output (these set the node's colour).
- The **Live preview** on the right updates as you type. The real brand icons
  render when you view the actual site (`npm run dev`); the preview uses
  coloured dots.

Reorder projects in the left list with ▲ ▼ — that's the order they appear on the
site. **Duplicate** is handy for making a similar project.

## 3. Save

Click **Save** (top right). This writes `content/projects.json`. If anything is
invalid (e.g. a missing title or a duplicate slug) you'll get a clear message
and nothing is written.

## 4. (Optional) Check it on the real site

In another terminal:

```bash
npm run dev
```

Open `http://localhost:3000`, scroll to Projects. The card and diagram render
exactly as they will live, with the real icons.

## 5. Publish

The CMS only changes files on your computer. To put them live:

```bash
git add content/projects.json public/projects
git commit -m "Add project: <name>"
git push
```

GitHub rebuilds and deploys to **soldevhassan.com** automatically (usually
1–2 minutes).

---

## How it fits together (for reference)

| File | Role |
| --- | --- |
| `content/projects.json` | The project data (what the site renders). Edited by the CMS. |
| `content/icon-catalog.json` | The list of pickable icons. |
| `lib/icons.ts` | Maps icon names → real icon components. |
| `lib/projects.ts` | Loads + validates the JSON and feeds `lib/data.ts`. |
| `scripts/cms/` | The local editor (`npm run cms`). Never deployed. |

### Adding a new icon to the palette

Day-to-day you just pick from existing icons. To add a brand-new one (a code
change):

1. Add an entry to `content/icon-catalog.json`, e.g.
   `{ "name": "stripe", "group": "Integrations" }`.
2. In `lib/icons.ts`, import the component and add one line to `iconRegistry`:
   `stripe: SiStripe,`.

If a name is in one file but not the other, the build fails with a message
telling you exactly which name to fix — so a typo can never ship a blank icon.

### Safety net

`content/projects.json` is validated in two places: the CMS rejects bad input
on **Save**, and `lib/projects.ts` re-validates during `npm run build`. A bad
manual edit therefore fails the build before it can reach the live site.
