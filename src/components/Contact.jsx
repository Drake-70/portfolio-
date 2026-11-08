import { useTranslation } from "react-i18next";
import { profile, contact } from "../data/content.js";
import { useBilingual } from "../hooks/useBilingual.js";
import SectionHeading from "./SectionHeading.jsx";
import { waLink } from "./Hero.jsx";
import { useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const tx = useBilingual();
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  const channels = [contact.email, contact.whatsapp, contact.linkedin, contact.github].some(Boolean);
  const helloLine = tx({
    en: `Hello Agbor Thomas, I'd like to talk about`,
    fr: `Bonjour Agbor Thomas, je voudrais échanger au sujet de`,
  });

  const mailtoHref = contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(
        `[Portfolio] ${helloLine}${name ? ` — ${name}` : ""}`
      )}&body=${encodeURIComponent(`${message}\n\n—\n${name || "Anonymous"}\n${fromEmail || ""}`)}`
    : null;

  const whatsappHref = waLink(contact.whatsapp, `${helloLine}\n${message}\n\n${name || ""}`);

  const onSubmit = (e) => {
    e.preventDefault();
    // No backend on a static site — the form composes a prefilled message
    // and opens the visitor's email client or WhatsApp.
    const target = mailtoHref || whatsappHref;
    if (target) window.open(target, "_self");
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="container-site py-20 sm:py-28"
    >
      <SectionHeading
        id="contact-title"
        num="05"
        eyebrow={t("contact.title")}
        title={t("contact.bigCta")}
        subtitle={t("contact.subtitle")}
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Direct channels + CV */}
        <div className="reveal min-w-0 space-y-4">
          {channels ? (
            <>
              {contact.whatsapp && (
                <ChannelCard
                  href={waLink(contact.whatsapp, helloLine)}
                  icon={<WhatsAppIcon />}
                  label={t("contact.whatsapp")}
                  valuePrefix={t("contact.whatsappChat")}
                  accent
                />
              )}
              {contact.email && (
                <ChannelCard
                  href={`mailto:${contact.email}`}
                  icon={<MailIcon />}
                  label={t("contact.email")}
                  value={contact.emailLabel || contact.email}
                />
              )}
              {contact.linkedin && (
                <ChannelCard
                  href={contact.linkedin}
                  icon={<LinkedInIcon />}
                  label={t("contact.linkedin")}
                  value={contact.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                />
              )}
              {contact.github && (
                <ChannelCard
                  href={contact.github}
                  icon={<GitHubIcon />}
                  label={t("contact.github")}
                  value={contact.github.replace(/^https?:\/\/(www\.)?/, "")}
                />
              )}

              {/* Downloadable CV also lives here (plus one in the hero) */}
              <a
                href={profile.cvUrl}
                download
                className="btn btn-outline w-full !justify-start !border-accent-solid !text-accent hover:!bg-accent-solid/10"
              >
                <DownloadIcon />
                {t("nav.downloadCv")}
              </a>
            </>
          ) : (
            // Rendered only while contact data in src/data/content.js is still null
            <p className="rounded-xl border border-dashed border-line bg-surface-2 p-4 text-sm text-muted">
              {import.meta.env.DEV
                ? "TODO: fill contact.email / contact.whatsapp / contact.linkedin / contact.github in src/data/content.js — these buttons will appear automatically."
                : t("contact.noChannels")}
            </p>
          )}
        </div>

        {/* Form → mailto / WhatsApp */}
        {channels && (
          <form className="reveal min-w-0" onSubmit={onSubmit}>
            <fieldset className="space-y-4 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <legend className="px-2 font-heading text-base font-bold">{t("contact.formTitle")}</legend>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  {t("contact.name")}
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent-solid"
                  />
                </label>
                <label className="block text-sm font-medium">
                  {t("contact.emailField")}
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent-solid"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium">
                {t("contact.message")}
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-y rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent-solid"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                {mailtoHref && (
                  <button type="submit" className="btn btn-primary">
                    <MailIcon />
                    {t("contact.sendEmail")}
                  </button>
                )}
                {whatsappHref && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => window.open(whatsappHref, "_blank", "noopener,noreferrer")}
                  >
                    <WhatsAppIcon />
                    {t("contact.sendWhatsapp")}
                  </button>
                )}
              </div>
            </fieldset>
          </form>
        )}
      </div>
    </section>
  );
}

function ChannelCard({ href, icon, label, value, valuePrefix, accent = false }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`flex min-w-0 max-w-full items-center gap-4 rounded-2xl border p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 ${
        accent
          ? "!border-[#22b573] bg-surface"
          : "border-line bg-surface hover:border-accent-solid"
      }`}
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent ? "bg-[#22b573]/10 text-[#0d8a52]" : "bg-surface-2 text-accent"}`}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
        <span className="block truncate text-sm font-semibold text-text">
          {value ?? valuePrefix}
        </span>
      </span>
    </a>
  );
}

const MailIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.02 3a9 9 0 0 0-7.8 13.5L3.2 21l4.6-1a9 9 0 1 0 4.2-17Zm4.9 12.6c-.2.55-1.17 1.06-1.6 1.1-.42.05-.83.07-1.35-.08a11.6 11.6 0 0 1-3.02-1.9 9.6 9.6 0 0 1-1.92-2.7c-.2-.4-.34-.94-.35-1.4 0-.5.3-.95.44-1.13.14-.18.6-.72.8-.74.2-.02.5-.02.7.02.2.05.25.1.38.36l.55 1.3c.05.11.09.24 0 .38l-.26.4-.24.26c-.1.1-.2.2-.1.4.15.3.65 1.02 1.4 1.68.97.87 1.74 1.15 2 1.28.2.1.35.08.48-.06l.68-.78c.15-.18.3-.15.5-.08l1.3.63c.2.1.34.15.4.24.05.1.05.56-.15 1.11Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5A2.49 2.49 0 0 0 2.5 6c0 1.38 1.11 2.5 2.48 2.5A2.5 2.5 0 0 0 7.47 6c0-1.38-1.11-2.5-2.49-2.5ZM2.9 21h4.16V9.75H2.9V21ZM9.2 9.75V21h4.16v-5.57c0-1.63.9-2.1 1.56-2.1.66 0 1.44.66 1.44 2.13V21h4.16v-6.53c0-3.63-2.06-5.02-4.06-5.02-2 0-2.9 1.05-3.1 1.55h-.02V9.75H9.2Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.55 2.34 1.1 2.9.84.1-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.21 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.8c0 .27.18.6.69.5A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12M7 11l5 5 5-5" />
    <path d="M4 21h16" />
  </svg>
);
