# PANDUAN TEKNIS PRODUKSI & REKAMAN VIDEO DEMO (OBS / GAME BAR)
## KARYA: SONAR v2.5 AI — KARTIKA CYBER HACTOWN 2026

Panduan ini disusun untuk memudahkan perekaman video demonstrasi karya hingga siap diunggah ke YouTube dengan kualitas profesional berstandar perlombaan tingkat nasional.

---

## 1. SPESIFIKASI VIDEO & PENGATURAN REKAMAN

| Parameter | Nilai Rekomendasi | Keterangan |
|---|---|---|
| **Resolusi Output** | **1920 × 1080 (Full HD)** | Wajib rasio 16:9 |
| **Frame Rate** | **60 FPS** (atau 30 FPS stabil) | 60 FPS membuat animasi radar & grafik tampak sangat halus |
| **Format Kontainer** | **MP4** (H.264 / AAC) | Format paling kompatibel untuk YouTube |
| **Bitrate Video** | **8.000 – 12.000 Kbps** | Menjamin ketajaman teks huruf kecil pada dashboard |
| **Bitrate Audio** | **192 – 320 Kbps (Stereo)** | Suara narasi jernih dan terdengar berwibawa |
| **Durasi Maksimal** | **10 Menit 00 Detik** | Batas maksimal regulasi Kartika Cyber Hactown 2026 |

---

## 2. PILIHAN METODE PEREKAMAN DI WINDOWS

### METODE A: Menggunakan OBS Studio (Paling Direkomendasikan)
1. **Download & Buka OBS Studio**: (Aplikasi gratis resmi dari `obsproject.com`).
2. **Pengaturan Sumber (Sources)**:
   * Tambahkan `Display Capture` atau `Window Capture` (pilih jendela Google Chrome/Edge yang membuka `http://localhost:5173/`).
   * Tambahkan `Audio Input Capture` (Microphone Anda).
3. **Filter Audio Microphone (Penting untuk Suara Juri)**:
   * Klik ikon gear pada Microphone -> pilih `Filters`.
   * Tambahkan **Noise Suppression** (pilih mode RNNoise) agar suara kipas laptop/ruangan hilang total.
   * Tambahkan **Compressor** agar volume suara Anda konsisten dan tidak pecah saat berbicara lantang.
4. **Hotkeys**:
   * Set hotkey `F9` untuk *Start Recording* dan `F10` untuk *Stop Recording*.

### METODE B: Menggunakan Windows Game Bar (Bawaan Windows - Tanpa Install Tambahan)
1. Buka browser Google Chrome dengan tab SONAR aktif.
2. Tekan kombinasi tombol **`Windows + Alt + R`** untuk langsung memulai rekaman layar.
3. Pastikan ikon mikrofon dalam keadaan **ON** (Aktifkan mikrofon).
4. Setelah selesai, tekan kembali **`Windows + Alt + R`**.
5. File video rekaman otomatis tersimpan di folder: `C:\Users\<NamaUser>\Videos\Captures\`.

---

## 3. CHECKLIST PERSIAPAN SEBELUM MEMULAI REKAMAN

- [ ] **1. Jalankan Local Server:**
  Pastikan Vite server aktif di `http://localhost:5173/` (status HTTP 200 OK).
- [ ] **2. Tampilan Browser Bersih:**
  * Tekan tombol **`F11`** pada browser untuk mode Full Screen (menyembunyikan bookmark bar, address bar, dan taskbar Windows).
  * Pastikan zoom level browser berada di **100%** (`Ctrl + 0`).
- [ ] **3. Suara Aplikasi Aktif:**
  Pastikan tombol audio di header SONAR dalam posisi aktif (ikon speaker menyala) agar efek taktis sonar radar terdengar saat modul dibuka.
- [ ] **4. Suasana Ruangan Tenang:**
  Gunakan headset atau mikrofon kondensor yang didekatkan ke mulut (jarak ~10 cm) untuk artikulasi kata yang jelas.
- [ ] **5. Cetak / Buka Naskah di Ponsel:**
  Buka file `01_NASKAH_DAN_RUNDOWN_VIDEO_DEMO_10_MENIT.md` di layar sekunder atau smartphone untuk membaca rundown tanpa memindahkan jendela rekaman.

---

## 4. TIPS GERAKAN KURSOR & PRESENTASI (PRO-TIPS)

1. **Gerakan Mouse Tenang & Terarah (Deliberate Cursor Movement):**
   * Hindari menggerak-gerakkan mouse secara acak saat sedang berbicara.
   * Tempatkan kursor tepat di atas elemen yang sedang Anda sebutkan (misal: saat menyebut "Kerapatan Bot 68.5%", arahkan kursor ke kartu tersebut, lalu biarkan diam selama 2 detik).
2. **Jeda Antar-Tab (Smooth Transitions):**
   * Saat berpindah menu sidebar (Dasbor -> Pemantauan -> Inspektor -> Radar -> Peta), berikan jeda 1 detik sebelum berbicara agar penonton dan juri sempat mengamati transformasi visual antarmuka.
3. **Intonasi Berwibawa:**
   * Bayangkan Anda sedang melakukan briefing resmi kepada Perwira Tinggi / Jajaran Komando Intelijen Nasional. Gunakan artikulasi jelas, tempo stabil (~130-140 kata per menit), dan antusiasme tinggi terhadap keunggulan karya.

---

## 5. RANGKAIAN SLIDE / INTRO & OUTRO

Dalam folder `d:\SONAR\demo\visual_assets\`, kami telah menyediakan:
1. `01_Intro_Title_Card.png` — Tampilkan di 10 detik pertama sebagai pembuka video.
2. `02_Latar_Belakang_Ancaman_Kognitif.png` — Tampilkan saat menjelaskan urgensi perang kognitif.
3. `03_Arsitektur_Teknologi_AI.png` — Tampilkan saat menguraikan pipeline teknis Ingestion & AI.
4. `04_Tabel_Manfaat_Komparatif.png` — Tampilkan untuk menonjolkan perbandingan efisiensi penanganan krisis.
5. `05_Outro_Closing_Card.png` — Tampilkan di 15 detik terakhir untuk ucapan penutup dan salam hormat.

