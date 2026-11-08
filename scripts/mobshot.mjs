// Mobile hero capture at 390px.
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
await new Promise((r) => server.listen(4183, r));

const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await p.goto("http://localhost:4183/", { waitUntil: "load", timeout: 20000 });
await p.waitForTimeout(1600);
await p.screenshot({ path: "scripts/mobile-hero.png" });
// scroll to the photo card region
await p.evaluate(() => {
  const img = document.querySelector('img[alt*="Portrait"]');
  if (img) window.scrollTo(0, img.getBoundingClientRect().top + scrollY - 260);
});
await p.waitForTimeout(600);
await p.screenshot({ path: "scripts/mobile-photo.png" });
console.log("saved mobile-hero.png, mobile-photo.png");
await b.close();
server.close();
