# LEMBAR RINGKASAN EKSEKUTIF KARYA UNTUK DEWAN JURI
## KARTIKA CYBER HACTOWN 2026

---

### IDENTITAS KARYA
* **Nama Sistem:** SONAR (Sistem Observasi Narasi & Analisis Reaksi Kognitif) v2.5 AI
* **Kategori Kompetisi:** Cyber Defense, Artificial Intelligence & Social Cyber Intelligence
* **Format Penyerahan:** Presentasi (.pptx), Thumbnail 1200x630 (.PNG), 5 Screenshot Antarmuka (Folder `Kartika Cyber Hactown 2026`), dan Demo Video YouTube (Folder `demo`).

---

### 1. APA KARYA YANG DIBUAT? (WHAT IS SONAR?)
**SONAR v2.5 AI** adalah platform analitik intelijen sosial dan sistem peringatan dini (Early Warning System / EWS) pertahanan kognitif generasi baru. Sistem ini dirancang untuk mendeteksi, membedah, memetakan, dan memitigasi operasi disinformasi terkoordinasi, kampanye manipulasi opini publik (astroturfing), dan amplifikasi sindikat botnet di ruang siber Indonesia secara real-time.

Laksana radar sonar kapal selam yang mendeteksi gelombang akustik bawah air, SONAR memindai lautan percakapan multi-kanal digital, mengisolasi anomali percakapan pada fase pembibitan (*seed phase*), dan menyajikan visualisasi situasi taktis bagi jajaran komando intelijen.

---

### 2. APA MANFAATNYA? (STRATEGIC & TACTICAL BENEFITS)

| Aspek | Tanpa SONAR (Konvensional) | Dengan SONAR v2.5 AI |
|---|---|---|
| **Waktu Deteksi Krisis** | 4 – 12 jam setelah narasi viral dan menimbulkan kepanikan | **< 3 menit** sejak lonjakan anomali akun bot terdeteksi (*Proactive EWS*) |
| **Identifikasi Aktor & Bot** | Analisis manual acak, sulit membedakan warga organik vs buzzer | **Heuristic Bot Scorer (Akurasi >91%)** memetakan akun Seed, Amplifier, dan Bridge |
| **Formulasi Kontra-Narasi** | Rapat koordinasi berjam-jam, rilis pers sering terlambat | **< 15 detik**, AI Agent otomatis menghasilkan draf klarifikasi resmi faktual |
| **Visibilitas Geospasial** | Laporan teks statis tanpa korelasi teritorial | **Peta 38 Provinsi Presisi WGS84** dengan Flash Warning kedaerahan instan |
| **Penyusunan Laporan (SitRep)** | Pengetikan manual dokumen intelijen memakan waktu berjam-jam | **Ekspor 1-Klik SitRep** berstandar Mabes TNI/BSSN siap distribusi |

#### Manfaat Bagi Stakeholder Terkait:
1. **TNI AD & Satuan Siber:** Memperkuat doktrin pertahanan perang hibrida dan menjaga stabilitas keamanan kedaulatan negara di ruang informasi.
2. **BSSN & Tim Tanggap Insiden Siber (CSIRT):** Memberikan instrumen peringatan dini terintegrasi untuk menangkal serangan rekayasa sosial berskala nasional.
3. **Kepolisian (Dittipidsiber Polri):** Menyediakan bukti forensik digital (.json) terstruktur mengenai relasi sindikat botnet untuk proses penegakan hukum.
4. **Pemerintah & Kementerian Terkait:** Menjaga kepercayaan publik terhadap stabilitas moneter, kesehatan, dan program strategis nasional.

---

### 3. BAGAIMANA CARA KERJANYA? (SYSTEM ARCHITECTURE & METHODOLOGY)

Arsitektur SONAR v2.5 AI terbagi ke dalam 3 lapisan kerja utama:

```
+-------------------------------------------------------------------------------+
|                      LAPISAN 1: MULTI-SOURCE INGESTION                        |
|  X (Twitter) | TikTok Comments | Telegram Public | Media Berita | Facebook   |
+---------------------------------------+---------------------------------------+
                                        | (Encrypted Stream Pipeline)
                                        v
+-------------------------------------------------------------------------------+
|                  LAPISAN 2: COGNITIVE INTELLIGENCE ENGINE                     |
|  1. Deep NLP IndoBERT: Polaritas Sentimen Leksikal & Spektrum 4 Emosi        |
|  2. Heuristic Bot Scorer: Analisis Entropi Sintaksis, Burst Rate, Repetisi   |
|  3. Graph Topology Network: Directed Network (Betweenness & Centrality)      |
|  4. EWS Composite Calculator: Rumus Indeks Ancaman (0 - 100)                  |
+---------------------------------------+---------------------------------------+
                                        | (Actionable Intelligence)
                                        v
+-------------------------------------------------------------------------------+
|                    LAPISAN 3: TACTICAL DEFENSE & ACTIONS                      |
|  Executive Dashboard | Radar Scope 360° | Peta 38 Provinsi | AI Counter-Text |
|  Pusat Notifikasi Taktis | Ekspor Dokumen Intelijen SitRep Berstandar Militer |
+-------------------------------------------------------------------------------+
```

#### Rumus Kalkulasi Indeks Ancaman Kognitif ($I_{threat}$):
$$I_{threat} = w_1 \cdot V_{anomali} + w_2 \cdot D_{bot} + w_3 \cdot P_{sentimen} + w_4 \cdot C_{graf}$$
* Di mana $w_1 = 0.25$ (Velositas), $w_2 = 0.35$ (Kerapatan Bot), $w_3 = 0.25$ (Polaritas Provokatif), $w_4 = 0.15$ (Konektivitas Graf).
* Rentang Nilai:
  * **0 – 44:** Normal / Aman (Kondusif)
  * **45 – 69:** Waspada (Pemantauan Berkala)
  * **70 – 100:** Kritis / Darurat Kognitif (Aktivasi Kontingensi & Alarm Otomatis)

---

### 4. MATRIKS 14 SKENARIO MULTISEKTORAL YANG DIDUKUNG

SONAR telah divalidasi mampu menangani 14 skenario krisis nyata:
1. **Darurat Finansial:** Operasi disinformasi hoaks penarikan dana massal (*Rush Money*) perbankan.
2. **Darurat Kesehatan:** Kampanye disinformasi penolakan vaksin dan epidemi buatan.
3. **Serangan AI Deepfake:** Rekayasa video skandal pimpinan lembaga negara untuk menjatuhkan kredibilitas.
4. **Waspada Logistik Pangan:** Isu kelangkaan beras dan bahan pokok memicu *panic buying*.
5. **Darurat Infrastruktur:** Ancaman sabotase blackout jaringan listrik dan telekomunikasi vital.
6. **Siaga Geopolitik:** Narasi provokatif sengketa perbatasan wilayah laut teritorial.
7. **Siaga Kamtibmas:** Pembajakan aksi demonstrasi mahasiswa oleh sindikat provokator digital.
8. **Darurat Bencana:** Hoaks peringatan tsunami fiktif yang memicu evakuasi liar dan kepanikan warga.
9. **Serangan Siber:** Kebocoran data palsu dan rekayasa kepanikan *ransomware* instansi vital.
10. **Waspada Transportasi:** Operasi *astroturfing* mogok massal transportasi umum perkotaan.
11. **Siaga SARA:** Polarisasi gesekan antar-umat beragama menjelang agenda nasional.
12. **Pemilu & Demokrasi:** Kampanye manipulasi hasil pemilu dan delegitimasi penyelenggara.
13. **Kebijakan Ekonomi:** Disinformasi pencabutan subsidi BBM yang direkayasa memicu demonstrasi.
14. **Stabilitas Nasional:** Skenario normal / kondusif sebagai kalibrasi baseline operasional.

---

### 5. KESIAPAN IMPLEMENTASI & KUALITAS KODE
* **Zero Jitter Radar & Map:** Desain grafis SVG murni tanpa bug CSS scale, menjamin kenyamanan navigasi operator.
* **Standar Aksesibilitas & UI/UX:** Kontras tinggi, tipografi profesional, palet kartografi resmi, dan efek audio taktis yang dapat diaktifkan/dinonaktifkan.
* **Code Quality:** 100% lulus kompilasi TypeScript (`tsc -b`), arsitektur komponen React 19 terisolasi, dan build produksi Vite ultra-ringan.

