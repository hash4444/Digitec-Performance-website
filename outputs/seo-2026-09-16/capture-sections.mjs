import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(path.resolve(process.argv[2], 'package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:5190' ? route.continue() : route.abort());
  const page = await context.newPage();
  for (const [route, id, file] of [
    ['/services/paint-protection-film', 'ppf-care', 'ppf-mobile-section-settled'],
    ['/brands/bentley-service-dubai/electrical-repair', 'reverse-camera', 'bentley-camera-mobile-section-settled'],
  ]) {
    await page.goto(`http://127.0.0.1:5190${route}`);
    await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch') !== null);
    await page.locator(`#${id}`).evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.screenshot({ path: `outputs/seo-2026-09-16/browser/${file}.png`, animations: 'disabled' });
  }
} finally { await browser.close(); }
