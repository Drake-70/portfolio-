// Final visual check: hero at desktop + mobile, dark default, after photo fix.
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const DIST = decodeURIComponent(new URL("../dist", import.meta.url).pathname).replace(/^\/([A-Z]:)/, "$1");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
  let f = join(DIST, req.url.split("?")[0]);
  if (!existsSync(f) || extname(f) === "") f = join(DIST, "index.html");
  try { res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(4179, r));

const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
const p = await b.newPage();
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await p.goto("http://localhost:4179/", { waitUntil: "load", timeout: 20000 });
await p.evaluate(() => {
  localStorage.setItem("theme", "dark");
  localStorage.setItem("lang", "en");
});
await p.reload({ waitUntil: "load", timeout: 20000 });
await p.waitForTimeout(1800);

await p.setViewportSize({ width: 1360, height: 860 });
await p.waitForTimeout(600);
await p.screenshot({ path: "scripts/hero-desktop.png" });

await p.setViewportSize({ width: 390, height: 844 });
await p.waitForTimeout(600);
await p.screenshot({ path: "scripts/hero-mobile.png" });

console.log("saved: scripts/hero-desktop.png, scripts/hero-mobile.png");
await b.close();
server.close();
