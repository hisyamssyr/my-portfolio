#!/usr/bin/env node
// Renders public/og/og-default.png (1200x630) and public/apple-touch-icon.png (180x180)
// from scripts/og-template.html and public/favicon.svg. Needs a Chromium binary.
import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

const shell =
  process.env.CHROME_PATH ||
  "/tmp/opencode/browsers/chrome-headless-shell/linux-155.0.8059.84/chrome-headless-shell-linux64/chrome-headless-shell";

if (!existsSync(shell)) {
  console.error(`Chromium not found at ${shell}. Set CHROME_PATH.`);
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: shell, args: ["--no-sandbox"] });
const cwd = new URL("../", import.meta.url).pathname;

// OG image
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(`${cwd}scripts/og-template.html`).href, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${cwd}public/og/og-default.png` });
  await page.close();
}

// Apple touch icon
{
  const page = await browser.newPage();
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(`${cwd}public/favicon.svg`).href);
  await page.screenshot({ path: `${cwd}public/apple-touch-icon.png` });
  await page.close();
}

await browser.close();
console.log("Wrote public/og/og-default.png and public/apple-touch-icon.png");
