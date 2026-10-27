import { createRequire } from 'node:module';
const require = createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 950 } });
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:5190' ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => console.log('ERROR', error.message));
  page.on('response', response => { if (response.url().startsWith('http://127.0.0.1:5190') && response.status() >= 400) console.log('HTTP', response.status(), response.url()); });
  if (process.argv[3]) await context.addInitScript(theme => localStorage.setItem('digitec-color-theme', theme), process.argv[3]);
  await page.goto('http://127.0.0.1:5190' + (process.argv[2] ?? '/services/paint-protection-dubai'));
  await page.locator('h1').waitFor();
  await page.waitForTimeout(1000);
  console.log(await page.evaluate(() => ({ storage: localStorage.getItem('digitec-color-theme'), class: document.documentElement.className, scripts: [...document.scripts].map(script => script.src), h1: document.querySelector('h1').textContent })));
  await page.screenshot({ path: 'outputs/paint-seo-2026-10-12/browser/en-hub-390-hero.png' });
} finally { await browser.close(); }
