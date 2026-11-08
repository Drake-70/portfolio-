export default function SectionHeading({ num, eyebrow, title, subtitle, center = false, id }) {
  return (
    <div className={`mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      <hr className="rule reveal mb-5" />
      <p className={`kicker reveal ${center ? "justify-center" : ""}`}>
        {num && <b>{num}</b>}
        <span>/ {eyebrow}</span>
      </p>
      <h2 id={id} className="reveal display-2 mt-4">
        {title}
      </h2>
      {subtitle && <p className="reveal mt-4 max-w-xl text-muted text-base sm:text-lg">{subtitle}</p>}
    </div>
  );
}
