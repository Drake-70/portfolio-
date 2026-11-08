// One-off: full-page light-mode screenshot of the production build.
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const DIST = decodeURIComponent(new URL("../dist", import.meta.url).pathname).replace(
  /^\/([A-Z]:)/,
  "$1"
);
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".json": "application/json", ".pdf": "application/pdf", ".xml": "text/xml", ".txt": "text/plain" };

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
await new Promise((r) => server.listen(4174, r));

const b = await chromium.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
});
const p = await b.newPage({ viewport: { width: 1360, height: 900 } });
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await p.goto("http://localhost:4174/", { waitUntil: "load", timeout: 20000 });
await p.evaluate(() => {
  localStorage.setItem("theme", "light");
  localStorage.setItem("lang", "en");
});
await p.reload({ waitUntil: "load" });
await p.waitForTimeout(1800);
// scroll through the page so every ScrollTrigger reveals before capture
await p.evaluate(async () => {
  const step = window.innerHeight / 2;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
});
await p.waitForTimeout(600);
await p.screenshot({ path: "scripts/full-light.png", fullPage: true });
console.log("screenshot saved");
await b.close();
server.close();
