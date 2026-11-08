// Smoke test: boots the production build in headless Edge (system Edge, no
// browser download), clicks around the main interactions, and fails on any
// real console error / page error / failed local request.
// Run: node scripts/smoke.mjs
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const DIST = decodeURIComponent(new URL("../dist", import.meta.url).pathname).replace(
  /^\/([A-Z]:)/,
  "$1"
);
const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".xml": "text/xml",
  ".txt": "text/plain",
};

// Tiny static server for dist/
const server = createServer((req, res) => {
  let file = join(DIST, req.url.split("?")[0]);
  if (!existsSync(file) || extname(file) === "") file = join(DIST, "index.html");
  try {
    const data = readFileSync(file);
    res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(4173, r));

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });

// Headless sandbox has unreliable internet — abort all non-localhost requests
// (Google Fonts) so navigation settles deterministically. These aborts are
// expected and are excluded from the failure count below.
const externallyBlocked = new Set();
await page.route(/^https?:\/\/(?!localhost)/, (route) => {
  externallyBlocked.add(route.request().url());
  return route.abort();
});

const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];
page.on("console", (m) => {
  if (m.type() !== "error") return;
  // Resource-load failures caused by our own external-request blocker are
  // expected and not real failures (their console rows carry the blocked URL).
  const loc = m.location()?.url || "";
  if (loc && externallyBlocked.has(loc)) return;
  consoleErrors.push(m.text());
});
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("requestfailed", (r) => {
  if (!externallyBlocked.has(r.url())) failedRequests.push(`${r.url()} → ${r.failure()?.errorText}`);
});
page.on("response", (r) => {
  if (r.status() >= 400 && !externallyBlocked.has(r.url()))
    failedRequests.push(`${r.url()} → HTTP ${r.status()}`);
});

const checks = [];
const expect = (name, ok) => checks.push({ name, ok: Boolean(ok) });

await page.goto("http://localhost:4173/", { waitUntil: "load", timeout: 20000 });
await page.waitForTimeout(1200);

// Report boot errors first so early crashes are never swallowed by
// assertion-timeout exceptions.
await page.screenshot({ path: "scripts/last-state.png" });

expect("hero name rendered", await page.getByRole("heading", { level: 1 }).first().textContent().catch(() => false));
expect("6 project cards", (await page.locator("article").count()) >= 6);
expect("live buttons on all 6", (await page.locator('a:has-text("Visit live app")').count()) === 6);

// no localStorage set → dark must be the default venture on boot
expect("dark default on boot", (await page.locator("html").getAttribute("data-theme")) === "dark");

// Language switch to French persists + updates <html lang>
await page.getByRole("button", { name: /Switch language|Changer de langue/i }).click();
await page.waitForTimeout(300);
expect('French CTA "Voir mes projets"', (await page.locator('a:has-text("Voir mes projets")').count()) === 1);
expect("html lang=fr", (await page.locator("html").getAttribute("lang")) === "fr");

// Theme toggle → light attribute (and back to dark when toggled again)
await page.getByRole("button", { name: /Switch theme|Changer de thème/i }).click();
await page.waitForTimeout(250);
expect("toggle → data-theme=light", (await page.locator("html").getAttribute("data-theme")) === "light");
await page.getByRole("button", { name: /Switch theme|Changer de thème/i }).click();
await page.waitForTimeout(250);
expect("toggle back → data-theme=dark", (await page.locator("html").getAttribute("data-theme")) === "dark");

// Mobile viewport: hamburger opens the menu
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: /menu/i }).first().click();
await page.waitForTimeout(250);
expect("mobile menu visible", await page.locator("#mobile-menu a").first().isVisible());

// Back to desktop, reload, and let the hero's IntersectionObserver fire →
// the lazily imported WebGL scene should create a canvas inside the hero.
await page.setViewportSize({ width: 1280, height: 860 });
await page.goto("http://localhost:4173/", { waitUntil: "load", timeout: 20000 });
await page.waitForTimeout(2500);
expect("3D hero canvas mounted", (await page.locator("#top canvas").count()) === 1);

await page.screenshot({ path: "scripts/last-state.png" });

const allure = consoleErrors.concat(pageErrors, failedRequests);
for (const c of checks) console.log(`${c.ok ? "PASS" : "FAIL"} — ${c.name}`);
console.log(`\nreal console/page/HTTP errors: ${allure.length}`);
allure.forEach((e) => console.log("  !", e.slice(0, 300)));

await browser.close();
server.close();
process.exit(checks.every((c) => c.ok) && allure.length === 0 ? 0 : 1);
