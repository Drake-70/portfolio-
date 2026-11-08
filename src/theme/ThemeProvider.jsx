import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });

function resolveInitial() {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light") return "light"; // only an explicit light choice wins
  } catch {
    /* noop */
  }
  return "dark"; // dark is always the default
}

// Theme rules:
//   1. explicit user choice (persisted in localStorage)
//   2. otherwise: always dark (the base palette)
// The active theme lives on <html data-theme>; index.html sets it pre-paint.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(resolveInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
