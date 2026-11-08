import { marquee } from "../data/content.js";

// Scrolling services strip — the classic agency marquee. Content is rendered
// twice for a seamless -50% translate loop; the second copy is aria-hidden.
// Pauses on hover; wraps into a static row under prefers-reduced-motion.
export default function Marquee() {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex items-center">
      {marquee.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="flex items-center gap-6 pr-6 font-heading text-lg font-extrabold uppercase tracking-tight text-text/90 sm:text-2xl"
        >
          <span className="whitespace-nowrap">{item}</span>
          <Diamond />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee border-y border-line bg-surface-2/70 py-4 sm:py-5" role="presentation">
      <div className="marquee-track">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}

const Diamond = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="shrink-0 text-accent-solid">
    <rect width="6" height="6" x="2" y="2" transform="rotate(45 5 5)" fill="currentColor" />
  </svg>
);
