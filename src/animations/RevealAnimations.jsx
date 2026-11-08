import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap.js";

// One global animation layer:
//   1. Scroll-reveal for every `.reveal` element (small fade, never flashy)
//   2. Batched stagger for project/skill cards (`.reveal-cards` children)
// Notes:
//   - `.reveal` starts at opacity 0 ONLY when JS is present (html.js), so
//     crawlers and no-JS visitors always see full content.
//   - prefers-reduced-motion → everything renders in its final state.
//   - useGSAP handles revert/kill on unmount (StrictMode double-mount safe).
export default function RevealAnimations() {
  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(".reveal, .reveal-cards > *", { opacity: 1, y: 0 });
      return;
    }

    // Scroll-reveals
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // Cards: batch so groups entering together stagger in one wave
    gsap.utils.toArray(".reveal-cards").forEach((group) => {
      const cards = group.children;
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power1.out",
            stagger: 0.08,
          }),
      });
      gsap.set(cards, { opacity: 0, y: 14 });
    });
  });

  return null;
}
