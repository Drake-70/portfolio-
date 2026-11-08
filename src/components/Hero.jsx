import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { profile, contact } from "../data/content.js";
import { useBilingual } from "../hooks/useBilingual.js";
import { useThemeContext } from "../theme/ThemeProvider.jsx";
import ThreeBackground from "./ThreeBackground.jsx";
import Marquee from "./Marquee.jsx";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap.js";

// WhatsApp click-to-chat (only renders when a number is set)
export const waLink = (number, text = "") =>
  number
    ? `https://wa.me/${String(number).replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : null;

export default function Hero() {
  const { t } = useTranslation();
  const tx = useBilingual();
  const { theme } = useThemeContext();
  const root = useRef(null);

  // Entrance timeline: kicker → name → tagline → CTAs → photo.
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".hero-el, .hero-photo", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.75 } });
      tl.from(".hero-el", { opacity: 0, y: 20, stagger: 0.08, clearProps: "transform" })
        .from(".hero-photo", { opacity: 0, y: 26, duration: 0.9 }, "-=0.4");
      gsap.to(".hero-photo", {
        y: -10,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative isolate overflow-hidden">
      {/* Three.js canvas + gradient base layer (aria-hidden, purely decorative) */}
      <ThreeBackground theme={theme} />

      <div className="container-site relative pb-14 pt-28 sm:pt-36">
        {/* availability kicker */}
        <p className="hero-el kicker mb-6">
          <span className="live-dot" aria-hidden="true" />
          <span>
            {tx({
              en: "Open to opportunities",
              fr: "Disponible pour de nouvelles opportunités",
            })}{" "}
            · {tx(profile.location)}
          </span>
        </p>

        {/* Giant stacked name */}
        <h1 className="display-hero">
          <span className="hero-el block">Agbor Thomas</span>
          <span className="hero-el block text-accent">Carmelo Ayuk</span>
        </h1>

        {/* Row: copy + portrait card (minmax(0,1fr) so wide text wraps, never overflows) */}
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 md:mt-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="min-w-0">
            <p className="hero-el kicker mb-6">
              <b aria-hidden="true">↳</b>
              <span>{tx(profile.role)}</span>
            </p>
            <p className="hero-el max-w-2xl font-heading text-xl font-bold leading-snug sm:text-2xl lg:text-[1.7rem]">
              {tx(profile.tagline)}
            </p>
            <p className="hero-el mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {tx(profile.heroLine)}
            </p>

            {/* CTAs */}
            <div className="hero-el mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                {t("hero.viewWork")}
                <ArrowDown />
              </a>
              <a href="#contact" className="btn btn-outline">
                {t("hero.contactMe")}
              </a>
              <a
                href={profile.cvUrl}
                download
                className="btn btn-outline !border-transparent !text-muted hover:!border-accent-solid hover:!text-accent"
              >
                <DownloadIcon />
                {t("nav.downloadCv")}
              </a>
            </div>

            {/* Social row (buttons render only when data is set) */}
            <div className="hero-el mt-8 flex items-center gap-2">
              {contact.whatsapp && (
                <SocialLink href={waLink(contact.whatsapp)} label={t("contact.whatsapp")}>
                  <WhatsAppIcon />
                </SocialLink>
              )}
              {contact.email && (
                <SocialLink href={`mailto:${contact.email}`} label={t("contact.email")}>
                  <MailIcon />
                </SocialLink>
              )}
              {contact.github && (
                <SocialLink href={contact.github} label={t("contact.github")}>
                  <GitHubIcon />
                </SocialLink>
              )}
              {contact.linkedin && (
                <SocialLink href={contact.linkedin} label={t("contact.linkedin")}>
                  <LinkedInIcon />
                </SocialLink>
              )}
            </div>
          </div>

          {/* Portrait card — aligned gold border, studio look */}
          <div className="hero-photo relative mx-auto w-full max-w-[16rem] md:max-w-[17rem] lg:mb-2">
            <div className="relative overflow-hidden rounded-3xl border-2 border-accent-solid bg-gradient-to-b from-surface-2 to-surface shadow-card">
              <img
                src={profile.photo}
                alt={t("a11y.profilePhoto", { name: profile.name })}
                width="520"
                height="650"
                className="aspect-[4/5] w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <a
          href="#about"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent sm:flex"
        >
          {t("hero.scrollHint")}
          <span aria-hidden="true" className="block h-8 w-px bg-line" />
        </a>
      </div>

      {/* services marquee, flush with the hero bottom */}
      <div className="relative">
        <Marquee />
      </div>
    </section>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-solid hover:text-accent"
    >
      {children}
    </a>
  );
}

const ArrowDown = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12M7 11l5 5 5-5" />
    <path d="M4 21h16" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.02 3a9 9 0 0 0-7.8 13.5L3.2 21l4.6-1a9 9 0 1 0 4.2-17Zm4.9 12.6c-.2.55-1.17 1.06-1.6 1.1-.42.05-.83.07-1.35-.08a11.6 11.6 0 0 1-3.02-1.9 9.6 9.6 0 0 1-1.92-2.7c-.2-.4-.34-.94-.35-1.4 0-.5.3-.95.44-1.13.14-.18.6-.72.8-.74.2-.02.5-.02.7.02.2.05.25.1.38.36l.55 1.3c.05.11.09.24 0 .38l-.26.4-.24.26c-.1.1-.2.2-.1.4.15.3.65 1.02 1.4 1.68.97.87 1.74 1.15 2 1.28.2.1.35.08.48-.06l.68-.78c.15-.18.3-.15.5-.08l1.3.63c.2.1.34.15.4.24.05.1.05.56-.15 1.11Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.55 2.34 1.1 2.9.84.1-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.21 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.8c0 .27.18.6.69.5A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5A2.49 2.49 0 0 0 2.5 6c0 1.38 1.11 2.5 2.48 2.5A2.5 2.5 0 0 0 7.47 6c0-1.38-1.11-2.5-2.49-2.5ZM2.9 21h4.16V9.75H2.9V21ZM9.2 9.75V21h4.16v-5.57c0-1.63.9-2.1 1.56-2.1.66 0 1.44.66 1.44 2.13V21h4.16v-6.53c0-3.63-2.06-5.02-4.06-5.02-2 0-2.9 1.05-3.1 1.55h-.02V9.75H9.2Z" />
  </svg>
);
