import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap.js";

// Subtle hero background: a drifting gold particle field plus a slow
// wireframe icosahedron (visual design goals), with hard performance rules:
//
//   - 2–3 tiny draw calls, no lights, no shadows, no postprocessing
//   - capped pixel ratio; lower still on memory/CPU-limited devices
//   - the scene module is dynamically imported ONLY when the hero is on
//     screen AND motion is allowed — reduced-motion users and visitors who
//     land mid-page never download it (≈130 kB gzip avoided)
//   - render work is skipped while the hero is scrolled out of view;
//     hidden tabs pause automatically (rAF-based loop)
//   - everything is disposed on unmount (StrictMode double-mount safe)

export default function ThreeBackground({ theme }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let disposed = false; // guards the async gap between import() and boot
    let disposeScene = null;

    // Reduced motion → no 3D at all; the CSS gradient layer stays.
    if (prefersReducedMotion()) return undefined;

    const boot = async () => {
      const { buildHeroScene } = await import("../lib/heroScene.js");
      if (disposed) return; // unmounted while importing — drop it
      disposeScene = buildHeroScene(host, { dark: theme === "dark" });
    };

    // Boot exactly once, when the hero actually becomes visible.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || disposed || disposeScene) return;
        io.disconnect();
        boot();
      },
      { threshold: 0.05 }
    );
    io.observe(host);

    return () => {
      disposed = true;
      io.disconnect();
      if (disposeScene) disposeScene();
    };
  }, [theme]); // rebuild canvas colors with the active theme

  // The gradient fallback renders immediately; the canvas fades in above it.
  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          theme === "dark"
            ? "radial-gradient(1200px 600px at 75% 20%, rgb(27 42 74 / 0.55), transparent 70%), radial-gradient(900px 500px at 15% 85%, rgb(212 175 55 / 0.07), transparent 65%)"
            : "radial-gradient(1200px 600px at 75% 20%, rgb(212 175 55 / 0.10), transparent 70%), radial-gradient(900px 500px at 15% 85%, rgb(27 42 74 / 0.05), transparent 65%)",
        maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
      }}
    />
  );
}
