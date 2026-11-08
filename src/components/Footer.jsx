import { useTranslation } from "react-i18next";
import { profile } from "../data/content.js";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-site py-10 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <p aria-hidden="true" className="font-heading text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
              {profile.shortName}
              <span className="text-accent">.</span>
            </p>
            <p className="kicker mt-3">
              <Pin />
              <span>{t("footer.builtIn")}</span>
            </p>
          </div>

          <a
            href="#top"
            className="btn btn-outline !py-2.5 !text-sm"
          >
            {t("footer.top")} ↑
          </a>
        </div>

        <hr className="rule my-6" />

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

const Pin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-accent-solid">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
