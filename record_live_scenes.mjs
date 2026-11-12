import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173/SONAR/';
const OUT_DIR = 'demo_build/recordings';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function recordLiveScenes() {
  console.log('Starting Playwright for Live Screencast Recording (1920x1080)...');
  const browser = await chromium.launch({ headless: true });

  // -------------------------------------------------------------
  // RECORD SCENE 4: Dasbor Utama & Pemantauan Narasi (~39 sec)
  // -------------------------------------------------------------
  console.log('Recording Scene 4: Dasbor Utama & Pemantauan Narasi...');
  const ctx4 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } },
  });
  const page4 = await ctx4.newPage();
  await page4.goto(BASE_URL, { waitUntil: 'networkidle' });
  await sleep(2000);

  // Smooth scroll down to show charts and metrics
  for (let i = 0; i < 6; i++) {
    await page4.mouse.wheel(0, 100);
    await sleep(600);
  }
  await sleep(3000);

  // Scroll back up
  for (let i = 0; i < 6; i++) {
    await page4.mouse.wheel(0, -100);
    await sleep(400);
  }
  await sleep(2000);

  // Navigate to Pemantauan Narasi
  const btnMonitor = page4.locator('button:has-text("Pemantauan Narasi")').first();
  await btnMonitor.click();
  await sleep(3000);

  // Filter channels
  const btnTelegram = page4.locator('button:has-text("Telegram")').first();
  if (await btnTelegram.isVisible()) {
    await btnTelegram.click();
    await sleep(2500);
  }
  const btnAll = page4.locator('button:has-text("Semua")').first();
  if (await btnAll.isVisible()) {
    await btnAll.click();
    await sleep(2000);
  }

  // Scroll feed
  for (let i = 0; i < 5; i++) {
    await page4.mouse.wheel(0, 120);
    await sleep(800);
  }
  await sleep(4000);

  await page4.close();
  const video4 = await page4.video();
  const vidPath4 = await video4.path();
  await ctx4.close();
  fs.renameSync(vidPath4, path.join(OUT_DIR, 'raw_scene_04.webm'));
  console.log('✓ Scene 4 recorded.');

  // -------------------------------------------------------------
  // RECORD SCENE 5: Inspektor Deep NLP & Radar Botnet (~39 sec)
  // -------------------------------------------------------------
  console.log('Recording Scene 5: Inspektor Deep NLP & Radar Botnet...');
  const ctx5 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } },
  });
  const page5 = await ctx5.newPage();
  await page5.goto(BASE_URL, { waitUntil: 'networkidle' });
  await sleep(1500);

  // Click Provokatif & Hoaks
  const btnInspector = page5.locator('button:has-text("Provokatif & Hoaks")').first();
  await btnInspector.click();
  await sleep(3000);

  // Scroll through Deep Text Analyzer
  for (let i = 0; i < 5; i++) {
    await page5.mouse.wheel(0, 110);
    await sleep(700);
  }
  await sleep(4000);

  // Scroll back
  for (let i = 0; i < 5; i++) {
    await page5.mouse.wheel(0, -110);
    await sleep(400);
  }
  await sleep(2000);

  // Click Klaster & Bot Radar
  const btnRadar = page5.locator('button:has-text("Klaster & Bot Radar")').first();
  await btnRadar.click();
  await sleep(3000);

  // Scroll down to see network table
  for (let i = 0; i < 5; i++) {
    await page5.mouse.wheel(0, 100);
    await sleep(800);
  }
  await sleep(5000);

  await page5.close();
  const video5 = await page5.video();
  const vidPath5 = await video5.path();
  await ctx5.close();
  fs.renameSync(vidPath5, path.join(OUT_DIR, 'raw_scene_05.webm'));
  console.log('✓ Scene 5 recorded.');

  // -------------------------------------------------------------
  // RECORD SCENE 6: Peta Nusantara 38 Provinsi (~30 sec)
  // -------------------------------------------------------------
  console.log('Recording Scene 6: Peta Nusantara 38 Provinsi...');
  const ctx6 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } },
  });
  const page6 = await ctx6.newPage();
  await page6.goto(BASE_URL, { waitUntil: 'networkidle' });
  await sleep(1500);

  // Click Anatomi & Peta Wilayah
  const btnRegional = page6.locator('button:has-text("Anatomi & Peta Wilayah")').first();
  await btnRegional.click();
  await sleep(4000);

  // Click IKN pin
  const pinIKN = page6.locator('button:has-text("IKN")').first();
  if (await pinIKN.isVisible()) {
    await pinIKN.click();
    await sleep(3500);
  }

  // Click Jawa Timur pin
  const pinJTM = page6.locator('button:has-text("JTM")').first();
  if (await pinJTM.isVisible()) {
    await pinJTM.click();
    await sleep(3500);
  }

  // Click Papua pin
  const pinPAP = page6.locator('button:has-text("PAP")').first();
  if (await pinPAP.isVisible()) {
    await pinPAP.click();
    await sleep(4000);
  }

  await page6.close();
  const video6 = await page6.video();
  const vidPath6 = await video6.path();
  await ctx6.close();
  fs.renameSync(vidPath6, path.join(OUT_DIR, 'raw_scene_06.webm'));
  console.log('✓ Scene 6 recorded.');

  // -------------------------------------------------------------
  // RECORD SCENE 7: Simulasi Skenario & Ekspor SitRep A4 (~40 sec)
  // -------------------------------------------------------------
  console.log('Recording Scene 7: Simulasi Skenario & Ekspor SitRep A4...');
  const ctx7 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } },
  });
  const page7 = await ctx7.newPage();
  await page7.goto(BASE_URL, { waitUntil: 'networkidle' });
  await sleep(2000);

  // Select SIAGA SARA scenario
  const scenarioSelect = page7.locator('select').first();
  if (await scenarioSelect.isVisible()) {
    await scenarioSelect.selectOption({ label: 'SIAGA SARA - Provokasi Sara & Disinformasi Tempat Ibadah Menjelang Hari Raya' });
    await sleep(3000);
  }

  // Click Mitigasi Taktis AI
  const btnMitigasi = page7.locator('button:has-text("Mitigasi Taktis AI")').first();
  if (await btnMitigasi.isVisible()) {
    await btnMitigasi.click();
    await sleep(3500);
  }

  // Open SitRep Export Modal
  const btnEkspor = page7.locator('button:has-text("Ekspor")').first();
  await btnEkspor.click();
  await sleep(3000);

  // Scroll inside modal to show Kop Surat and 6 sections
  const scrollWrapper = page7.locator('.sitrep-scroll-wrapper').first();
  if (await scrollWrapper.isVisible()) {
    await scrollWrapper.evaluate((el) => {
      el.scrollBy({ top: 350, behavior: 'smooth' });
    });
    await sleep(2500);
    await scrollWrapper.evaluate((el) => {
      el.scrollBy({ top: 400, behavior: 'smooth' });
    });
    await sleep(2500);
    await scrollWrapper.evaluate((el) => {
      el.scrollBy({ top: 500, behavior: 'smooth' });
    });
    await sleep(4000);
  } else {
    await sleep(5000);
  }

  await page7.close();
  const video7 = await page7.video();
  const vidPath7 = await video7.path();
  await ctx7.close();
  fs.renameSync(vidPath7, path.join(OUT_DIR, 'raw_scene_07.webm'));
  console.log('✓ Scene 7 recorded.');

  await browser.close();
  console.log('\nAll 4 live scenes successfully recorded!');
}

recordLiveScenes().catch(console.error);
