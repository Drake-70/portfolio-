import { useTranslation } from "react-i18next";
import { experience } from "../data/content.js";
import { useBilingual } from "../hooks/useBilingual.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Experience() {
  const { t } = useTranslation();
  const tx = useBilingual();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-surface-2/60 py-20 sm:py-28"
    >
      <div className="container-site">
        <SectionHeading
          id="experience-title"
          num="04"
          eyebrow={t("experience.subtitle")}
          title={t("experience.title")}
        />

        {/* Agency table: year column left, story column right, hairlines between */}
        <ol aria-busy="false">
          {experience.map((job, i) => (
            <li key={i} className="reveal min-w-0 border-t border-line py-7 sm:py-8">
              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                {/* Dates */}
                <p className="kicker">
                  <b aria-hidden="true">—</b>
                  <span>{tx(job.dates)}</span>
                </p>

                <div className="min-w-0">
                  <h3 className="display-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {job.org}
                  </h3>
                  <p className="mt-1.5 text-sm">
                    <span className="font-semibold uppercase tracking-wider text-accent">{tx(job.role)}</span>
                    <span aria-hidden="true" className="text-muted"> · </span>
                    <span className="text-muted">{tx(job.place)}</span>
                  </p>
                  <ul className="mt-3 space-y-2">
                    {tx(job.points)
                      .split("\n")
                      .map((point, j) => (
                        <li key={j} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-muted">
                          <Dash />
                          <span>{point}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const Dash = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="mt-2 shrink-0">
    <rect width="7" height="2" x="1.5" y="4" rx="1" fill="currentColor" className="text-accent-solid" />
  </svg>
);
