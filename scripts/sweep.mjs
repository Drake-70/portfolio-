// Fine-grained sweep between 280–500px in 20px steps, both themes, to catch
// widths dev tools emulates that the coarse audit misses.
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const DIST = decodeURIComponent(new URL("../dist", import.meta.url).pathname).replace(/^\/([A-Z]:)/, "$1");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg" };
const server = createServer((req, res) => {
  let f = join(DIST, req.url.split("?")[0]);
  if (!existsSync(f) || extname(f) === "") f = join(DIST, "index.html");
  try { res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(4177, r));

const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
const p = await b.newPage();
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());

let bad = 0;
for (const theme of ["dark", "light"]) {
  for (let w = 280; w <= 500; w += 20) {
    await p.setViewportSize({ width: w, height: 800 });
    await p.goto("http://localhost:4177/", { waitUntil: "load", timeout: 20000 });
    await p.evaluate((t) => { localStorage.setItem("theme", t); localStorage.setItem("lang", "en"); }, theme);
    await p.reload({ waitUntil: "load" });
    await p.waitForTimeout(1300);
    await p.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 350));
    });
    const { sw, iw, wide } = await p.evaluate(() => {
      const doc = document.documentElement;
      const iw = window.innerWidth;
      const out = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > iw + 2 || r.width > iw + 2) {
          out.push(`${el.tagName}.${String(el.className).slice(0, 55)} w=${Math.round(r.width)} right=${Math.round(r.right)} top=${Math.round(r.top + scrollY)}`);
        }
      });
      return { sw: doc.scrollWidth, iw, wide: out.slice(0, 6) };
    });
    if (sw > iw + 1) {
      bad += 1;
      console.log(`FAIL ${theme}-${w}: scrollWidth=${sw} innerWidth=${iw}`);
      wide.forEach((x) => console.log("   -", x));
    } else {
      console.log(`OK   ${theme}-${w}`);
    }
  }
}
console.log(bad === 0 ? "SWEEP: clean everywhere" : `SWEEP: ${bad} failing widths`);
await b.close();
server.close();
