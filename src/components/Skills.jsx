import { useTranslation } from "react-i18next";
import { skills } from "../data/content.js";
import { useBilingual } from "../hooks/useBilingual.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Skills() {
  const { t } = useTranslation();
  const tx = useBilingual();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="container-site py-20 sm:py-28"
    >
      <SectionHeading id="skills-title" num="03" eyebrow={t("skills.subtitle")} title={t("skills.title")} />

      {/* Capabilities table: one hairline row per layer, agency-style */}
      <ul className="min-w-0 divide-y divide-line border-t border-b border-line">
        {skills.map((group) => (
          <li className="reveal grid gap-3 py-6 sm:grid-cols-[15rem_1fr] sm:items-baseline sm:gap-6" key={group.group.en}>
            <h3 className="kicker">
              <Dot />
              <span>{tx(group.group)}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="badge transition-colors duration-200 hover:border-accent-solid hover:text-text">
                  {item}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const Dot = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="text-accent-solid">
    <rect width="6" height="6" x="2" y="2" transform="rotate(45 5 5)" fill="currentColor" />
  </svg>
);
