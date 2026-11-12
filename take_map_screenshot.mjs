import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'd:/SONAR/Kartika Cyber Hactown 2026';
const BASE_URL = 'http://localhost:5173/';
const VIEWPORT = { width: 1536, height: 864 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('Launching Chromium...');
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1.25,
  });

  const page = await context.newPage();
  console.log('Navigating to', BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await sleep(3000);

  // Navigate to Anatomi & Peta Wilayah tab
  console.log('Opening Anatomi & Peta Wilayah tab...');
  const btnRegional = page.locator('button').filter({ hasText: 'Anatomi & Peta Wilayah' }).first();
  await btnRegional.click();
  await sleep(3000); // extra wait for animations to settle

  const buf = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT_DIR, 'Screenshot_05_Peta_Nusantara.PNG'), buf);
  console.log('Saved Screenshot_05_Peta_Nusantara.PNG');

  await browser.close();
  console.log('Done!');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

