import { chromium } from 'file:///C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';

const outputDir = new URL('./', import.meta.url);
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/ADMIN/AppData/Local/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-win64/chrome-headless-shell.exe' });
const results = [];
try {
  for (const [locale, prefix] of [['en', ''], ['ar', '/ar']]) {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
      await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
      await page.goto(`http://127.0.0.1:5187${prefix}/brands/range-rover-service-dubai`, { waitUntil: 'networkidle' });
      const image = page.locator('img[src="/images/range-rover-vogue-service-a-workshop.webp"]');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
      const result = await image.evaluate(img => ({
        loaded: img.complete && img.naturalWidth === 941 && img.naturalHeight === 1672,
        count: document.querySelectorAll('img[src="/images/range-rover-vogue-service-a-workshop.webp"]').length,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayedWidth: img.getBoundingClientRect().width,
        displayedHeight: img.getBoundingClientRect().height,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        alt: img.alt,
      }));
      if (!result.loaded || result.count !== 1 || result.documentWidth > width || Math.abs(result.displayedWidth / result.displayedHeight - 941 / 1672) > 0.001) {
        throw new Error(`Layout failed ${locale} ${width}: ${JSON.stringify(result)}`);
      }
      await image.locator('..').screenshot({ path: new URL(`${locale}-${width}.png`, outputDir).pathname.replace(/^\/([A-Z]:)/, '$1') });
      results.push({ locale, width, ...result });
      await page.close();
    }
  }
  console.log(JSON.stringify(results, null, 2));
  await fs.writeFile(new URL('layout-results.json', outputDir), JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
