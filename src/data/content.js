// ============================================================================
// SITE CONTENT — the ONE file you edit to update the whole site.
// Components read from here; you should never need to touch UI code.
//
// Conventions:
//  - Bilingual text fields are objects: { en: "...", fr: "..." }
//    → write natural French, not literal translations.
//  - Values set to null hide their button/link everywhere it's used.
//  - Every TODO below marks something you still need to fill in.
// ============================================================================

export const profile = {
  name: "Agbor Thomas Carmelo Ayuk",
  shortName: "Agbor Thomas",
  initials: "AT",
  role: {
    en: "Full-stack & AI software developer",
    fr: "Développeur full-stack & IA",
  },
  location: {
    en: "Yaoundé, Cameroon",
    fr: "Yaoundé, Cameroun",
  },
  tagline: {
    en: "I build software that fits how Cameroon actually works.",
    fr: "Je conçois des logiciels taillés pour le fonctionnement réel du Cameroun.",
  },
  // Sub-line under the tagline in the hero
  heroLine: {
    en: "Local payments, bilingual products, real users — built and shipped from Yaoundé.",
    fr: "Paiements locaux, produits bilingues, utilisateurs réels — conçus et déployés depuis Yaoundé.",
  },
  // 3–4 sentences, first person. Confident but humble.
  bio: {
    en: [
      "I'm a full-stack and AI developer from Yaoundé with a MERN foundation — Node.js, Express, React, MongoDB — sharpened during my internship at ETS-NTECH.",
      "Today I design, build and ship my own products end to end: CVBoost for AI-assisted CV writing, Nexora Academy for Cameroonian primary schools, and WardWatch for civic engagement.",
      "I specialize in the parts of software that only matter if you build for this market: MTN MoMo and Orange Money payment rails, genuinely bilingual FR/EN interfaces, and flows that survive 2G connections and mid-range phones.",
      "Everything I show here is deployed and running. No mockups, no vaporware.",
    ],
    fr: [
      "Développeur full-stack et IA basé à Yaoundé, je travaille sur une base MERN — Node.js, Express, React, MongoDB — forgée pendant mon stage chez ETS-NTECH.",
      "Aujourd'hui, je conçois et déploie mes propres produits de bout en bout : CVBoost pour la rédaction de CV assistée par IA, Nexora Academy pour les écoles primaires camerounaises et WardWatch pour la participation citoyenne.",
      "Je me spécialise dans ce qui compte vraiment sur ce marché : les paiements MTN MoMo et Orange Money, des interfaces réellement bilingues FR/EN, et des parcours qui tiennent en 2G sur des téléphones d'entrée de gamme.",
      "Tout ce qui est présenté ici est déployé et fonctionne. Aucune maquette, rien de virtuel.",
    ],
  },
  // "What I'm focused on" bullets in the About section
  focus: {
    en: [
      "Local payment rails: MTN MoMo, Orange Money and CamPay integration",
      "Bilingual FR/EN products (i18next) that don't feel translated",
      "AI features that earn their cost — CV scoring, tailoring, assistance",
      "Ship on low bandwidth: PWAs, Expo apps, cold-start-friendly hosting",
    ],
    fr: [
      "Paiements locaux : intégration MTN MoMo, Orange Money et CamPay",
      "Des produits FR/EN bilingues qui ne semblent pas traduits (i18next)",
      "Des fonctions IA qui méritent leur coût — scoring de CV, personnalisation, assistance",
      "Déployer malgré le faible débit : PWA, apps Expo, hébergement tolérant au démarrage à froid",
    ],
  },
  photo: "/images/profile.jpg", // TODO: replace with a deliberate studio-style photo if you have one
  photoAlt: {
    en: "Portrait of Agbor Thomas Carmelo Ayuk",
    fr: "Portrait d'Agbor Thomas Carmelo Ayuk",
  },
  cvUrl: "/cv/Agbor_Thomas_Carmelo_Ayuk_CV.pdf", // TODO: replace placeholder with your real PDF CV
};

// Used for the "years of experience" line in About.
// TODO: set to the year you started coding professionally/studying seriously.
export const career = {
  startedSince: "2025",
};

// ---------------------------------------------------------------------------
// CONTACT — null values hide the corresponding button. Replace with real data!
// ---------------------------------------------------------------------------
export const contact = {
  email: "agborthomasayukcarmelo@gmail.com", // TODO: e.g. "agborthomas.dev@gmail.com" — used for mailto + form
  emailLabel: "agborthomasayukcarmelo@gmail.com", // TODO: how the email is displayed, e.g. "agborthomas.dev@gmail.com"
  whatsapp: "237672885658", // TODO: international format, digits only, e.g. "2376XXXXXXXX". Enables wa.me click-to-chat (used by the form too).
  linkedin: "https://www.linkedin.com/in/agbor-thomas-ayuk-carmelo-b28771339", // TODO: full URL, e.g. "https://www.linkedin.com/in/your-handle"
  github: "https://github.com/Drake-70", // TODO: full URL, e.g. "https://github.com/your-handle"
};

// ---------------------------------------------------------------------------
// PROJECTS — all real deployments. Honest copy: no invented traction.
// featured: true → large card in the top row (keep exactly 3).
// image: null → renders a styled screenshot placeholder instead.
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: "cvboost",
    name: "CVBoost",
    featured: true,
    url: "https://cvbuilder-obfc.onrender.com",
    image: "/images/cvboost.jpg", // TODO: swap for a cleaner real screenshot when you have one
    imageAlt: {
      en: "CVBoost — AI CV tailoring and ATS scoring interface",
      fr: "CVBoost — interface de personnalisation de CV par IA et scoring ATS",
    },
    brandColor: "#1B2A4A", // CVBoost brand navy (placeholder background in placeholder mode)
    accentColor: "#D4AF37", // CVBoost brand gold
    problem: {
      en: "Cameroonian job seekers send the same CV to every employer and lose to real ATS filters, without knowing why.",
      fr: "Les demandeurs d'emploi camerounais envoient le même CV à toutes les offres, échouent aux filtres ATS sans en connaître la raison.",
    },
    solution: {
      en: "An AI tool that tailors a CV to a specific job offer and scores it against ATS criteria, with pay-per-document and subscription pricing.",
      fr: "Un outil IA qui adapte le CV à chaque offre et le note selon les critères ATS, avec un paiement à l'acte ou par abonnement.",
    },
    role: {
      en: "Founder & full-stack developer — product, backend, AI pipeline and payments.",
      fr: "Fondateur & développeur full-stack — produit, backend, chaîne IA et paiements.",
    },
    challenge: {
      en: "Wiring pay-per-use billing to mobile money:-session validity, webhook confirmation from CamPay, and letting a completed MTN MoMo prompt unlock exactly one AI document.",
      fr: "Facturer à l'acte via le mobile money : validité de session, confirmation par webhook CamPay, et déblocage d'exactement un document IA par paiement MTN MoMo terminé.",
    },
    stack: ["React", "Node.js / Express", "MongoDB", "AI APIs", "MTN MoMo", "Orange Money", "CamPay"],
  },
  {
    id: "nexora",
    name: "Nexora Academy",
    featured: true,
    url: "https://nexoraacademy-cm.com",
    image: "/images/nexora.jpg", // TODO: swap for a cleaner real screenshot when you have one
    imageAlt: {
      en: "Nexora Academy — bilingual learning platform for primary pupils",
      fr: "Nexora Academy — plateforme d'apprentissage bilingue pour le primaire",
    },
    brandColor: "#1B2A4A",
    accentColor: "#D4AF37",
    problem: {
      en: "Primary pupils learn in French OR English at school, but resources are usually one-language-only, mostly paper and expensive.",
      fr: "Les élèves du primaire apprennent en français OU en anglais à l'école, mais les ressources sont presque toujours unilingues, papier et coûteuses.",
    },
    solution: {
      en: "A bilingual FR/EN edtech platform for primary school: a web PWA for parents' phones plus a React Native/Expo mobile app for pupils.",
      fr: "Une plateforme edtech FR/EN pour le primaire : une PWA web pour le téléphone des parents et une app mobile React Native/Expo pour les élèves.",
    },
    role: {
      en: "Founder & full-stack developer — web PWA, Expo app (SDK 54), Firebase auth and backend JWT sessions.",
      fr: "Fondateur & développeur full-stack — PWA web, app Expo (SDK 54), auth Firebase et sessions JWT côté backend.",
    },
    challenge: {
      en: "Running two identity systems in one app: Firebase authentication on mobile, verified against the backend's JWT sessions — plus a true same-content FR/EN UI.",
      fr: "Faire cohabiter deux systèmes d'identité : authentification Firebase côté mobile, vérifiée par les sessions JWT du backend — avec une même interface FR/EN au contenu identique.",
    },
    stack: ["React", "React Native / Expo SDK 54", "Firebase Auth", "JWT", "i18next", "PWA"],
  },
  {
    id: "wardwatch",
    name: "WardWatch",
    featured: true,
    url: "https://wardwatch-taap.onrender.com",
    image: "/images/wardwatch.jpg", // TODO: swap for a cleaner real screenshot when you have one
    imageAlt: {
      en: "WardWatch — civic-tech platform with map view (formerly CommunityPulse)",
      fr: "WardWatch — plateforme civique avec carte (anciennement CommunityPulse)",
    },
    brandColor: "#1B2A4A",
    accentColor: "#D4AF37",
    problem: {
      en: "Communities report problems (roads, water, safety) into WhatsApp groups where they vanish without follow-up.",
      fr: "Les communautés signalent leurs problèmes (routes, eau, sécurité) dans des groupes WhatsApp où ils disparaissent sans suivi.",
    },
    solution: {
      en: "A civic-tech platform that structures community reports on an interactive map so issues become visible, addressable and followable over time.",
      fr: "Une plateforme civique qui structure les signalements citoyens sur une carte interactive pour rendre les problèmes visibles, adressables et suivis dans le temps.",
    },
    role: {
      en: "Founder & developer — Express/React architecture, auth security hardening, map features, test suite.",
      fr: "Fondateur & développeur — architecture Express/React, durcissement de l'authentification, fonctions cartographiques, suite de tests.",
    },
    challenge: {
      en: "Cookie-based JWT auth with CSRF double-submit protection, so embedded map and report flows survive stale cookies without opening report forging.",
      fr: "Authentification JWT par cookies avec protection CSRF double-submit, pour que les flux de signalement tolèrent les cookies expirés sans ouvrir la porte aux faux signalements.",
    },
    stack: ["Node.js / Express", "React", "MongoDB", "maplibre-gl", "JWT + CSRF", "Jest"],
  },
  {
    id: "hsc-sms",
    name: "HSC SMS API",
    featured: false,
    url: "https://hsc-sms-api.onrender.com",
    image: "/images/hsc-sms.jpg",
    imageAlt: {
      en: "HSC SMS API - REST backend dashboard",
      fr: "HSC SMS API - tableau de bord du backend REST",
    },
    // TODO: confirm/refine this one-liner with me (the owner):
    description: {
      en: "The REST backend behind a school management system — students, staff, classes and grades, with JWT-secured endpoints.",
      fr: "Le backend REST d'un système de gestion scolaire — élèves, personnel, classes et notes, avec des points d'accès sécurisés par JWT.",
    },
    stack: ["Node.js / Express", "MongoDB", "JWT"],
  },
  {
    id: "agencyhub",
    name: "AgencyHub",
    featured: false,
    url: "https://agencyhub-zwb3.onrender.com",
    image: "/images/agencyhub.jpg",
    imageAlt: {
      en: "AgencyHub - web application dashboard",
      fr: "AgencyHub - tableau de bord de l'application",
    },
    // TODO: confirm/refine this one-liner with me (the owner):
    description: {
      en: "A hub for small agencies and freelancers: clients, quotes and projects in one workspace with role-based access.",
      fr: "Un espace pour petites agences et freelancers : clients, devis et projets réunis en un seul tableau de bord avec accès par rôle.",
    },
    stack: ["React", "Node.js / Express", "MongoDB"],
  },
  {
    id: "streambox",
    name: "StreamBox",
    featured: false,
    url: "https://streambox-9yvi.onrender.com",
    image: null, // TODO: add a real screenshot → put file in /public/images/ and set the path here
    imageAlt: {
      en: "StreamBox - streaming application interface",
      fr: "StreamBox - interface de l'application de streaming",
    },
    // TODO: confirm/refine this one-liner with me (the owner):
    description: {
      en: "A media streaming web app built for slow connections, with adaptive playback and a lightweight, phone-first player.",
      fr: "Une app web de streaming conçue pour les connexions lentes, avec lecture adaptative et un lecteur léger pensé pour le mobile.",
    },
    stack: ["React", "Node.js / Express", "Streaming"],
  },
];

// ---------------------------------------------------------------------------
// SKILLS — grouped badges. No percentage bars, honestly.
// ---------------------------------------------------------------------------
export const skills = [
  {
    group: { en: "Backend", fr: "Backend" },
    items: ["Node.js", "Express", "REST APIs", "JWT / Sessions", "CSRF protection", "Jest"],
  },
  {
    group: { en: "Frontend & Mobile", fr: "Frontend & Mobile" },
    items: ["React", "React Native", "Expo SDK 54", "Vite", "Tailwind CSS", "PWA", "maplibre-gl", "GSAP", "Three.js"],
  },
  {
    group: { en: "Databases & Cloud", fr: "Bases de données & Cloud" },
    items: ["MongoDB", "Mongoose", "Firebase Auth", "Render", "Vercel", "Netlify"],
  },
  {
    group: { en: "AI & Payments", fr: "IA & Paiements" },
    items: ["AI API integration", "CV / ATS models", "MTN MoMo", "Orange Money", "CamPay", "Subscriptions & billing"],
  },
  {
    group: { en: "Tooling & Localization", fr: "Outillage & Localisation" },
    items: ["Git / GitHub", "i18next", "Postman", "VS Code", "ESLint", "Google Cloud"],
  },
];

// ---------------------------------------------------------------------------
// EXPERIENCE — TODO: fill in real internship dates; adjust builder dates.
// ---------------------------------------------------------------------------
export const experience = [
  {
    org: "CVBoost · Nexora Academy · WardWatch · HSC SMS API · AgencyHub · StreamBox",
    role: { en: "Founder / Independent builder", fr: "Fondateur / développeur indépendant" },
    dates: { en: "2025 — today", fr: "2025 — aujourd'hui" }, // TODO: verify start year
    place: { en: "Yaoundé, Cameroon", fr: "Yaoundé, Cameroun" },
    points: {
      en: [
        "Designed, built and shipped six live products — web, mobile and AI — from first commit to deployed URL.",
        "Full ownership of the stack: architecture, auth security, payments via mobile money, bilingual UIs and Play-Store-ready Expo builds.",
      ],
      fr: [
        "Conçu, développé et mis en ligne six produits fonctionnels — web, mobile et IA — du premier commit à l'URL déployée.",
        "Responsabilité complète de la pile technique : architecture, sécurité de l'authentification, paiements via mobile money, interfaces bilingues et builds Expo prêts pour le Play Store.",
      ],
    },
  },
  {
    org: "ETS-NTECH",
    role: { en: "Software Development Intern", fr: "Stagiaire en développement logiciel" },
    dates: {
      en: "2025",
      fr: "2025",
    },
    place: { en: "Cameroon", fr: "Cameroun" },
    points: {
      // TODO: add 1–2 concrete internship accomplishments
      en: [
        "Worked on production MERN-stack codebases under senior supervision.",
      ],
      fr: [
        "Travail sur des bases de code MERN en production, sous supervision d'équipe sénior.",
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// STATS STRIP — verifiable facts only. Do NOT add user/revenue/growth numbers.
// ---------------------------------------------------------------------------
export const stats = [
  {
    value: "6",
    label: { en: "Live products deployed", fr: "Produits déployés en ligne" },
  },
  {
    value: "EN / FR",
    label: { en: "Two full languages", fr: "Deux langues complètes" },
  },
  {
    value: "MoMo",
    label: { en: "Mobile-money payments built in", fr: "Paiements mobile-money intégrés" },
  },
  {
    value: "Web · Mobile · AI",
    label: { en: "All three platforms shipped", fr: "Les trois plateformes livrées" },
  },
];

// ---------------------------------------------------------------------------
// MARQUEE — the scrolling services strip under the hero (bold studio look).
// Tech names are universal, so no translation needed. Add/remove freely.
// ---------------------------------------------------------------------------
export const marquee = [
  "Node.js",
  "Express",
  "React",
  "React Native / Expo",
  "MongoDB",
  "Firebase",
  "AI APIs",
  "MTN MoMo",
  "Orange Money",
  "CamPay",
  "i18next",
  "Vite",
  "Tailwind CSS",
  "GSAP",
];

