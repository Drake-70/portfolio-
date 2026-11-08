import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Deploy to Vercel/Netlify: nothing else is needed — both detect Vite
// automatically and run `npm run build` with `dist` as the output dir.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2019",
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split three.js so the hero canvas code is cached separately
        manualChunks: {
          three: ["three"],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
