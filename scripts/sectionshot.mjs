// Section-level viewport screenshots (no fullPage stitching) for both themes.
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
await new Promise((r) => server.listen(4180, r));

const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
const p = await b.newPage({ viewport: { width: 1360, height: 860 } });
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await p.goto("http://localhost:4180/", { waitUntil: "load", timeout: 20000 });
await p.waitForTimeout(1200);

// scroll to bottom progressively so every reveal has fired
await p.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(800);

const spots = ["hero", "work", "stats", "skills", "experience", "contact", "footer"];

for (const [theme, t] of [["dark", "dark"], ["light", "light"]]) {
  await p.evaluate((theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, t);
  await p.waitForTimeout(400);

  for (const name of spots) {
    await p.evaluate((name) => {
      const top = (el) => el.getBoundingClientRect().top + scrollY;
      let y = 0;
      if (name === "work") {
        const el = document.querySelector("#projects .reveal-cards h3");
        y = el ? top(el.closest("article")) - 120 : 0;
      } else if (name === "stats") {
        const el = document.querySelector("#stats");
        y = el ? top(el) + el.scrollHeight / 2 - 430 : 0;
      } else if (name === "skills") {
        y = top(document.querySelector("#skills")) - 10;
      } else if (name === "experience") {
        y = top(document.querySelector("#experience")) - 10;
      } else if (name === "contact") {
        y = top(document.querySelector("#contact")) - 10;
      } else if (name === "footer") {
        y = document.body.scrollHeight;
      }
      window.scrollTo(0, y);
    }, name);
    await p.waitForTimeout(500);
    await p.screenshot({ path: `scripts/shot-${t}-${name}.png` });
  }
}

console.log("captured: scripts/shot-{dark,light}-*.png");
await b.close();
server.close();
