import { useTranslation } from "react-i18next";
import { projects } from "../data/content.js";
import { useBilingual } from "../hooks/useBilingual.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  const { t } = useTranslation();

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-surface-2/60 py-20 sm:py-28"
    >
      <div className="container-site">
        <SectionHeading id="projects-title" num="02" eyebrow={t("projects.subtitle")} title={t("projects.title")} />

        {/* Top 3: large alternating rows, agency-numbered */}
        <div className="space-y-12 lg:space-y-20">
          {featured.map((p, i) => (
            <FeaturedRow key={p.id} project={p} flip={i % 2 === 1} index={i + 1} />
          ))}
        </div>

        {/* Remaining 3: compact numbered grid */}
        <div className="reveal-cards mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-20">
          {rest.map((p, i) => (
            <SmallCard key={p.id} project={p} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Large featured row                                                  */
/* ------------------------------------------------------------------ */
function FeaturedRow({ project, flip, index }) {
  const { t } = useTranslation();
  const tx = useBilingual();

  return (
    <article
      className={`reveal-cards grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 ${
        flip ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Screenshot */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden="true"
        tabIndex={-1}
        className="group relative block overflow-hidden rounded-2xl border border-line shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none"
      >
        <Screenshot project={project} tall />
      </a>

      {/* Content */}
      <div className="min-w-0">
        {/* agency index: giant ghost number */}
        <p aria-hidden="true" className="font-heading text-5xl font-black leading-none tracking-tight text-[color:var(--line)] sm:text-7xl">
          {String(index).padStart(2, "0")}
        </p>

        <header className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="display-3">{project.name}</h3>
          <LiveBadge />
        </header>

        <Row label={t("projects.problem")} icon="problem">
          {tx(project.problem)}
        </Row>
        <Row label={t("projects.solution")} icon="solution">
          {tx(project.solution)}
        </Row>
        <Row label={t("projects.role")} icon="role">
          {tx(project.role)}
        </Row>

        {/* Key challenge — highlighted */}
        <div className="mt-4 rounded-xl border border-line bg-surface p-4">
          <p className="flex items-start gap-2 text-sm font-semibold text-text">
            <BoltIcon />
            {t("projects.challenge")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{tx(project.challenge)}</p>
        </div>

        {/* Stack */}
        <div className="mt-5 flex flex-wrap gap-1.5" aria-label={`${t("projects.stack")}: ${project.stack.join(", ")}`}>
          {project.stack.map((s) => (
            <span key={s} className="badge">{s}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
          <LiveButton url={project.url} />
          <ColdStartNote />
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Compact card                                                        */
/* ------------------------------------------------------------------ */
function SmallCard({ project, index }) {
  const { t } = useTranslation();
  const tx = useBilingual();

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden="true"
        tabIndex={-1}
        className="block overflow-hidden rounded-xl border border-line"
      >
        <Screenshot project={project} />
      </a>

      <header className="mt-4 flex items-center gap-2.5">
        <span aria-hidden="true" className="font-heading text-sm font-black text-accent">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="min-w-0 truncate font-heading text-lg font-bold">{project.name}</h3>
        <LiveBadge small />
      </header>

      <p className="mt-2 text-sm leading-relaxed text-muted">{tx(project.description)}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="badge !py-1 !text-[11px]">{s}</span>
        ))}
      </div>

      <footer className="mt-auto flex flex-wrap items-end gap-x-3 gap-y-2 pt-4">
        <LiveButton url={project.url} small />
        <ColdStartNote small />
      </footer>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */
function Screenshot({ project, tall = false }) {
  const { t } = useTranslation();
  const tx = useBilingual();
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={tx(project.imageAlt)}
        loading="lazy"
        decoding="async"
        width="1200"
        height={tall ? 700 : 675}
        className="aspect-video w-full bg-surface-2 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />
    );
  }

  // Styled placeholder until a real screenshot is supplied (see TODO in content.js)
  return (
    <div
      className="flex aspect-video w-full flex-col items-center justify-center gap-2"
      style={{
        background: `linear-gradient(135deg, ${project.brandColor || "#1B2A4A"} 0%, #2A3A61 100%)`,
      }}
    >
      <span className="font-heading text-2xl font-extrabold text-white/90">{project.name}</span>
      <span className="text-xs tracking-wide text-white/60">{t("projects.placeholder")}</span>
    </div>
  );
}

function LiveBadge({ small = false }) {
  const { t } = useTranslation();
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface font-semibold text-[#0d8a52] ${
        small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span className="live-dot" aria-hidden="true" />
      {t("projects.live")}
    </span>
  );
}

function LiveButton({ url, small = false }) {
  const { t } = useTranslation();
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary ${small ? "!px-3.5 !py-2 !text-[13px]" : ""}`}
    >
      {t("projects.visitLive")}
      <ExternalIcon />
    </a>
  );
}

function ColdStartNote({ small = false }) {
  const { t } = useTranslation();
  return (
    <p className={`flex max-w-[15rem] items-start gap-1.5 text-muted ${small ? "text-[11px]" : "text-xs"} leading-snug`}>
      <InfoIcon />
      {t("projects.coldStartNote")}
    </p>
  );
}

function Row({ label, children }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted">
      <span className="mr-1.5 font-semibold text-text">{label}:</span>
      {children}
    </p>
  );
}

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M19 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
  </svg>
);

const InfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

const BoltIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
  </svg>
);
