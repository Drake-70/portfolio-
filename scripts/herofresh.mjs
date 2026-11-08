// Fresh-boot hero captures in both themes (how real visitors arrive).
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
await new Promise((r) => server.listen(4182, r));

const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
for (const theme of ["light", "dark"]) {
  const p = await b.newPage({ viewport: { width: 1360, height: 860 } });
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.goto("http://localhost:4182/", { waitUntil: "load", timeout: 20000 });
  await p.evaluate((t) => {
    localStorage.setItem("theme", t);
    localStorage.setItem("lang", "en");
  }, theme);
  await p.reload({ waitUntil: "load", timeout: 20000 });
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `scripts/hero-fresh-${theme}.png` });
  await p.close();
  console.log(`saved hero-fresh-${theme}.png`);
}

await b.close();
server.close();
