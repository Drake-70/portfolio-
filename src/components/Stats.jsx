import { useTranslation } from "react-i18next";
import { stats } from "../data/content.js";
import { useBilingual } from "../hooks/useBilingual.js";

export default function Stats() {
  const { t } = useTranslation();
  const tx = useBilingual();

  return (
    <section
      id="stats"
      aria-labelledby="stats-title"
      className="bg-navy py-14 text-[#EDF0F8] dark:bg-surface-2 sm:py-16"
    >
      <div className="container-site">
        <p id="stats-title" className="reveal kicker mb-8 flex justify-center sm:justify-center">
          <b aria-hidden="true">✦</b>
          <span>{t("stats.title")}</span>
        </p>

        <dl className="reveal-cards grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value}>
              <dt className="sr-only">{tx(s.label)}</dt>
              <dd className="font-heading text-3xl font-extrabold uppercase tracking-tight text-accent-solid sm:text-4xl">
                {s.value}
              </dd>
              <dd className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C9CFDE] sm:text-[0.8rem]">
                {tx(s.label)}
              </dd>
            </div>
          ))}
        </dl>

        <p className="reveal mt-8 text-center text-xs text-[#8FA0C4] dark:text-muted">
          {/* Honest strip: deployed ≠ adopted. */}
          {t("stats.disclaimer")}
        </p>
      </div>
    </section>
  );
}