import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'd:/SONAR/Kartika Cyber Hactown 2026';
const BASE_URL = 'http://localhost:5173/';
const VIEWPORT = { width: 1536, height: 864 };

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('Launching Chromium...');
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1.25, // crisp high DPI
  });

  const page = await context.newPage();

  console.log('Navigating to', BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await sleep(2500); // Wait for Framer Motion and fonts to settle

  // -------------------------------------------------------------
  // 1. DASBOR UTAMA
  // -------------------------------------------------------------
  console.log('Capturing 1: Dasbor Utama...');
  const btnOverview = page.locator('button').filter({ hasText: 'Dasbor Utama' }).first();
  if (await btnOverview.isVisible()) {
    await btnOverview.click();
    await sleep(2000);
  }
  const buf1 = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT_DIR, 'Screenshot_01_Dasbor_Utama.PNG'), buf1);
  console.log('✓ Saved Screenshot_01_Dasbor_Utama.PNG');

  // -------------------------------------------------------------
  // 2. PEMANTAUAN NARASI (LIVE FEED)
  // -------------------------------------------------------------
  console.log('Capturing 2: Pemantauan Narasi...');
  const btnMonitor = page.locator('button').filter({ hasText: 'Pemantauan Narasi' }).first();
  await btnMonitor.click();
  await sleep(2000);
  const buf2 = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT_DIR, 'Screenshot_02_Pemantauan_Narasi.PNG'), buf2);
  console.log('✓ Saved Screenshot_02_Pemantauan_Narasi.PNG');

  // -------------------------------------------------------------
  // 3. PROVOKATIF & HOAKS (INSPEKTOR NLP)
  // -------------------------------------------------------------
  console.log('Capturing 3: Provokatif & Hoaks...');
  const btnInspector = page.locator('button').filter({ hasText: 'Provokatif & Hoaks' }).first();
  await btnInspector.click();
  await sleep(2000);
  const buf3 = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT_DIR, 'Screenshot_03_Inspektor_NLP.PNG'), buf3);
  console.log('✓ Saved Screenshot_03_Inspektor_NLP.PNG');

  // -------------------------------------------------------------
  // 4. KLASTER & BOT RADAR
  // -------------------------------------------------------------
  console.log('Capturing 4: Klaster & Bot Radar...');
  const btnRadar = page.locator('button').filter({ hasText: 'Klaster & Bot Radar' }).first();
  await btnRadar.click();
  await sleep(2000);
  const buf4 = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT_DIR, 'Screenshot_04_Radar_Botnet.PNG'), buf4);
  console.log('✓ Saved Screenshot_04_Radar_Botnet.PNG');

  // -------------------------------------------------------------
  // 5. ANATOMI & PETA WILAYAH
  // -------------------------------------------------------------
  console.log('Capturing 5: Anatomi & Peta Wilayah...');
  const btnRegional = page.locator('button').filter({ hasText: 'Anatomi & Peta Wilayah' }).first();
  await btnRegional.click();
  await sleep(2000);
  const buf5 = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT_DIR, 'Screenshot_05_Peta_Nusantara.PNG'), buf5);
  console.log('✓ Saved Screenshot_05_Peta_Nusantara.PNG');

  await browser.close();
  console.log('\nAll 5 real screenshots successfully captured!');
}

run().catch((err) => {
  console.error('Execution error:', err);
  process.exit(1);
});

