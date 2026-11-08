import { useTranslation } from "react-i18next";
import { profile, career } from "../data/content.js";
import { useBilingual } from "../hooks/useBilingual.js";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  const { t } = useTranslation();
  const tx = useBilingual();

  const joinedYears = t("about.yearsOne", { years: career.startedSince });

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="container-site py-20 sm:py-28"
    >
      <SectionHeading id="about-title" num="01" eyebrow={t("about.subtitle")} title={t("about.title")} />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Bio */}
        <div className="reveal min-w-0">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {tx(profile.bio)
              .split("\n")
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-sm text-muted">
            <PinIcon />
            <span>
              <strong className="font-semibold text-text">{t("about.locatedIn")}:</strong>{" "}
              {tx(profile.location)}
            </span>
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-accent">{joinedYears}</p>
        </div>

        {/* Focus list — agency hairline rows */}
        <div className="reveal min-w-0">
          <h3 className="kicker">
            <b aria-hidden="true">✦</b>
            <span>{t("about.focusTitle")}</span>
          </h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {tx(profile.focus)
              .split("\n")
              .map((item, i) => (
                <li key={i} className="flex items-baseline gap-3 py-4 text-[0.95rem] text-muted">
                  <span aria-hidden="true" className="shrink-0 font-heading text-xs font-extrabold text-accent-solid">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-accent">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
