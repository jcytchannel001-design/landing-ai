import { chromium } from "playwright";
import { existsSync, mkdirSync } from "fs";

const dir = "./screenshots";
if (!existsSync(dir)) mkdirSync(dir);

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

console.log("Navigating to http://localhost:3001 ...");
await page.goto("http://localhost:3001", { waitUntil: "networkidle" });

// Full-page screenshot
await page.screenshot({ path: `${dir}/full.png`, fullPage: true });
console.log("Full-page screenshot saved.");

// Section screenshots
const sections = [
  { name: "hero",         selector: "section:first-of-type" },
  { name: "stats",        selector: "#servicios" },
  { name: "portfolio",    selector: "#portfolio" },
  { name: "proceso",      selector: "#proceso" },
  { name: "testimonios",  selector: "#testimonios" },
  { name: "contacto",     selector: "#contacto" },
];

for (const { name, selector } of sections) {
  try {
    const el = await page.$(selector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await el.screenshot({ path: `${dir}/${name}.png` });
      console.log(`Screenshot: ${name}`);
    } else {
      console.log(`Selector not found: ${selector}`);
    }
  } catch (e) {
    console.error(`Error on ${name}:`, e.message);
  }
}

// Check for console errors
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

// Scroll test
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);
await page.evaluate(() => window.scrollTo(0, 0));

console.log("\nConsole errors:", errors.length === 0 ? "None" : errors);
console.log("\nDone. Check ./screenshots/");

await browser.close();
