// Responsive audit: loads the production build at several common viewport
// widths, fails on horizontal overflow, and saves screenshots (light+dark).
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const DIST = decodeURIComponent(new URL("../dist", import.meta.url).pathname).replace(
  /^\/([A-Z]:)/,
  "$1"
);
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png",
  ".json": "application/json", ".pdf": "application/pdf", ".xml": "text/xml", ".txt": "text/plain",
};
const server = createServer((req, res) => {
  let f = join(DIST, req.url.split("?")[0]);
  if (!existsSync(f) || extname(f) === "") f = join(DIST, "index.html");
  try {
    res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" });
    res.end(readFileSync(f));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(4176, r));

const b = await chromium.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
});
const p = await b.newPage();
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
let failures = 0;

for (const theme of ["dark", "light"]) {
  for (const [w, h] of [[320, 700], [390, 760], [768, 900], [1360, 860], [1920, 1080]]) {
    const tag = `${theme}-${w}`;
    await p.setViewportSize({ width: w, height: h });
    await p.goto("http://localhost:4176/", { waitUntil: "load", timeout: 20000 });
    await p.evaluate((t) => {
      localStorage.setItem("theme", t);
      localStorage.setItem("lang", "en");
    }, theme);
    await p.reload({ waitUntil: "load" });
    await p.waitForTimeout(1400);
    await p.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await p.waitForTimeout(400);

    const overflow = await p.evaluate(() => {
      const doc = document.documentElement;
      return { sw: doc.scrollWidth, iw: window.innerWidth };
    });
    const ok = overflow.sw <= overflow.iw + 1;
    if (!ok) {
      failures += 1;
      // dump the widest elements at this exact moment
      const offenders = await p.evaluate(() => {
        const out = [];
        const iw = window.innerWidth;
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > iw + 2 || r.right > iw + 2) {
            out.push({
              tag: el.tagName,
              cls: String(el.className).slice(0, 70),
              w: Math.round(r.width),
              right: Math.round(r.right),
              top: Math.round(r.top + window.scrollY),
            });
          }
        });
        // fall back: widest elements overall
        const fam = [...document.querySelectorAll("*")]
          .map((el) => ({ t: el.tagName, c: String(el.className).slice(0, 60), w: Math.round(el.getBoundingClientRect().width) }))
          .sort((a, b) => b.w - a.w)
          .slice(0, 8);
        return { out, fam };
      });
      console.log("OFFENDERS @fail:", JSON.stringify(offenders, null, 1));
    }
    console.log(`${ok ? "OK  " : "FAIL"} ${tag}: scrollWidth=${overflow.sw} innerWidth=${overflow.iw}`);
    await p.screenshot({ path: `scripts/resp-${tag}.png`, fullPage: true });
  }
}

console.log(failures === 0 ? "RESPONSIVE: no horizontal overflow at any size" : `RESPONSIVE: ${failures} failing widths`);
await b.close();
server.close();
process.exit(failures === 0 ? 0 : 1);
