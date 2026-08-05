'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Applies the theme by toggling the `.dark` class on <html> and persisting the
 * choice to localStorage. The initial class is set by an inline script in the
 * document head (see layout) to avoid a flash of the wrong theme.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  // Sync React state with whatever the pre-hydration script already applied.
  useEffect(() => {
    const initial = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
    setThemeState(initial);
  }, []);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage may be unavailable (private mode) — ignore. */
    }
    setThemeState(next);
  }, []);

  const toggle = useCallback(
    () => apply(theme === 'dark' ? 'light' : 'dark'),
    [theme, apply]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme: apply }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Access the current theme and controls. Must be used within ThemeProvider. */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
