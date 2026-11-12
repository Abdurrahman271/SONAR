/**
 * SONAR v2.5 AI - Playwright Screenshot Tool
 * Mengambil 5 screenshot asli dari program yang berjalan di localhost:5173
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT = String.raw`d:\SONAR\Kartika Cyber Hactown 2026`;
const BASE_URL = 'http://localhost:5173';
const VIEWPORT = { width: 1440, height: 900 };

mkdirSync(OUT, { recursive: true });

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1.5,       // High DPI — crisp screenshot
  });
  const page = await context.newPage();

  // ── Helper: navigate + wait for fonts & animations to settle ──
  async function goTo(url, waitMs = 2500) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await delay(waitMs);
  }

  // ── Helper: click sidebar item by partial text ──
  async function clickNav(labelFragment) {
    const el = page.locator(`text=${labelFragment}`).first();
    await el.click();
    await delay(2000);
  }

  // ══════════════════════════════════════════════════════════════
  // 1. DASBOR UTAMA  (main dashboard — default landing page)
  // ══════════════════════════════════════════════════════════════
  console.log('[1/5] Dasbor Utama...');
  await goTo(BASE_URL);
  // ensure we're on the main dashboard — click "Dasbor Utama" if visible
  try { await page.locator('text=Dasbor Utama').first().click(); await delay(1500); } catch {}
  await page.screenshot({
    path: join(OUT, 'Screenshot_01_Dasbor_Utama.PNG'),
    fullPage: false,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
  });
  console.log('  ✓ Screenshot_01_Dasbor_Utama.PNG');

  // ══════════════════════════════════════════════════════════════
  // 2. PEMANTAUAN NARASI  (live feed)
  // ══════════════════════════════════════════════════════════════
  console.log('[2/5] Pemantauan Narasi...');
  try {
    await clickNav('Pemantauan');
  } catch {
    // fallback: direct URL hash navigation
    await goTo(`${BASE_URL}/#pemantauan`);
  }
  await delay(1500);
  await page.screenshot({
    path: join(OUT, 'Screenshot_02_Pemantauan_Narasi.PNG'),
    fullPage: false,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
  });
  console.log('  ✓ Screenshot_02_Pemantauan_Narasi.PNG');

  // ══════════════════════════════════════════════════════════════
  // 3. INSPEKTOR NLP / PROVOKATIF
  // ══════════════════════════════════════════════════════════════
  console.log('[3/5] Inspektor NLP...');
  try {
    await clickNav('Provokatif');
  } catch {
    await goTo(`${BASE_URL}/#provokatif`);
  }
  await delay(1500);
  await page.screenshot({
    path: join(OUT, 'Screenshot_03_Inspektor_NLP.PNG'),
    fullPage: false,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
  });
  console.log('  ✓ Screenshot_03_Inspektor_NLP.PNG');

  // ══════════════════════════════════════════════════════════════
  // 4. KLASTER & RADAR BOTNET
  // ══════════════════════════════════════════════════════════════
  console.log('[4/5] Klaster & Radar Botnet...');
  try {
    await clickNav('Klaster');
  } catch {
    await goTo(`${BASE_URL}/#klaster`);
  }
  await delay(2000);   // radar animation needs more time
  await page.screenshot({
    path: join(OUT, 'Screenshot_04_Klaster_Botnet.PNG'),
    fullPage: false,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
  });
  console.log('  ✓ Screenshot_04_Klaster_Botnet.PNG');

  // ══════════════════════════════════════════════════════════════
  // 5. ANATOMI & PETA NUSANTARA
  // ══════════════════════════════════════════════════════════════
  console.log('[5/5] Anatomi & Peta Nusantara...');
  try {
    await clickNav('Anatomi');
  } catch {
    await goTo(`${BASE_URL}/#anatomi`);
  }
  await delay(2000);
  await page.screenshot({
    path: join(OUT, 'Screenshot_05_Peta_Nusantara.PNG'),
    fullPage: false,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
  });
  console.log('  ✓ Screenshot_05_Peta_Nusantara.PNG');

  await browser.close();
  console.log('\n✅ Semua 5 screenshot berhasil disimpan ke:');
  console.log(`   ${OUT}`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

