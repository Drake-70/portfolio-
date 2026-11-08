import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { profile } from "../data/content.js";
import { useThemeContext } from "../theme/ThemeProvider.jsx";

const SECTIONS = [
  { id: "about", key: "nav.about" },
  { id: "projects", key: "nav.work" },
  { id: "skills", key: "nav.skills" },
  { id: "experience", key: "nav.experience" },
  { id: "contact", key: "nav.contact" },
];

function Monogram() {
  return (
    <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#1B2A4A" />
      <path
        d="M14 44 L23 20 L26.5 20 L35.5 44 L31 44 L29 38 L20.5 38 L18.5 44 Z M21.8 34.5 L27.7 34.5 L24.7 25.5 Z"
        fill="#D4AF37"
      />
      <path
        d="M38 20 L52 20 L52 23.6 L46.9 23.6 L46.9 44 L43.1 44 L43.1 23.6 L38 23.6 Z"
        fill="#EDEFF7"
      />
    </svg>
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggle: toggleTheme } = useThemeContext();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Elevation change once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlight (IntersectionObserver, cheaper than scroll math)
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open + close on Escape
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  const switchLang = () => i18n.changeLanguage(lang === "fr" ? "en" : "fr");

  const linkClass = (id, extra = "") =>
    `rounded-md px-3 py-2 text-[0.8rem] font-bold uppercase tracking-[0.09em] transition-colors duration-200 ${extra} ${
      active === id ? "text-accent" : "text-muted hover:text-text"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label={t("a11y.navLabel")}
        className="container-site flex h-16 items-center justify-between gap-2"
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5" aria-label={profile.name}>
          <Monogram />
          <span className="hidden font-heading text-sm font-extrabold uppercase tracking-[0.12em] sm:inline">
            {profile.shortName}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={linkClass(s.id, "text-sm")}>
                {t(s.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={switchLang}
            className="rounded-md border border-line px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-muted transition-colors duration-200 hover:border-accent-solid hover:text-accent"
            aria-label={t("nav.lang")}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-line p-2 text-muted transition-colors duration-200 hover:border-accent-solid hover:text-accent"
            aria-label={t("nav.theme")}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="rounded-md border border-line p-2 text-text md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line bg-bg md:hidden"
      >
        <ul className="container-site flex flex-col py-3">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className={linkClass(s.id, "block text-base")}
              >
                {t(s.key)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4 6.8 6.8 0 0 0 20 13.5Z" />
    </svg>
  );
}

function BurgerIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" fill="none">
      {open ? (
        <>
          <path d="M5 5l14 14" />
          <path d="M19 5L5 19" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}
