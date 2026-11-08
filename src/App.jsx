import { useTranslation } from "react-i18next";

import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Stats from "./components/Stats.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import RevealAnimations from "./animations/RevealAnimations.jsx";

export default function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      {/* Skip link — first tabbable element on the page */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
      >
        {t("a11y.skipToContent")}
      </a>

      {/* Page-wide scroll-reveals + active section tracking */}
      <RevealAnimations />

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Stats />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  );
}
