import asyncio
import os
import edge_tts
import subprocess
import imageio_ffmpeg

VOICE = "id-ID-ArdiNeural"
FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

SCENES_NARRATION = [
    {
        "id": "scene_01_intro",
        "title": "BABAK 1: Pembukaan & Latar Belakang Ancaman",
        "text": (
            "Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, Syalom, Om Swastiastu, Namo Buddhaya, Salam Kebajikan. "
            "Yang terhormat Dewan Juri Kartika Cyber Hactown 2026, para perwira, dan pemerhati keamanan siber nasional. "
            "Perkenankan kami mempersembahkan solusi pertahanan kognitif terdepan: SONAR versi 2.5 AI, Sistem Observasi Narasi dan Analisis Reaksi Kognitif. "
            "Lanskap perang modern telah bergeser dari domain kinetik ke domain kognitif. "
            "Ancaman paling berbahaya saat ini bukan lagi semata malware atau serangan D-DoS, melainkan operasi disinformasi terkoordinasi dan sindikat botnet yang merekayasa kepanikan massal serta memicu polarisasi publik. "
            "Untuk menjawab tantangan asimetris inilah, SONAR diciptakan."
        )
    },
    {
        "id": "scene_02_benefits",
        "title": "BABAK 2: Pengenalan Karya & 4 Manfaat Utama",
        "text": (
            "Apa itu SONAR versi 2.5 AI? "
            "SONAR adalah platform analitik intelijen sosial dan Early Warning System kognitif generasi baru yang dirancang khusus untuk satuan siber TNI, BSSN, Polri, dan kementerian strategis. "
            "SONAR menghadirkan empat pilar manfaat utama: "
            "Pertama, Proactive Early Warning System: mendeteksi anomali pada fase pembibitan sebelum isu viral secara nasional. "
            "Kedua, Atribusi Pelaku dan Pemetaan Topologi Botnet secara presisi. "
            "Ketiga, Formulasi Kontra-Narasi Taktis berbasis AI dalam waktu kurang dari 15 detik. "
            "Dan keempat, Geointelligence 38 Provinsi Nusantara dengan kalibrasi koordinat terverifikasi."
        )
    },
    {
        "id": "scene_03_architecture",
        "title": "BABAK 3: Arsitektur Sistem & Cara Kerja AI",
        "text": (
            "Bagaimana cara kerja SONAR di balik layar? "
            "Arsitektur SONAR dibangun di atas tiga lapisan teknologi mutakhir: "
            "Pertama, Multi-Source Omnichannel Ingestion: menyerap arus data real-time dari platform X, komentar TikTok, grup Telegram, hingga portal berita daring. "
            "Kedua, Cognitive Intelligence Engine: memadukan model Indo-BERT Multi-Task NLP untuk deteksi polaritas sentimen dan spektrum emosi, dengan Heuristic Bot Engine yang menganalisis entropi sintaksis serta burst rate. "
            "Dan ketiga, Graph Topology and Early Warning Calculator: memetakan jejaring akun untuk menghitung Indeks Ancaman Kognitif dari skala 0 hingga 100 secara otomatis."
        )
    },
    {
        "id": "scene_04_live_overview",
        "title": "BABAK 4A: Live Demo Dasbor Utama & Pemantauan Narasi",
        "text": (
            "Mari kita masuk ke demonstrasi langsung aplikasi SONAR. "
            "Pada Dasbor Utama, komandan operasi langsung disuguhkan Threat Level Banner merah menyala yang mengindikasikan status ancaman kritis, lengkap dengan Indeks Ancaman 92 dari 100 dan estimasi waktu peredaan krisis. "
            "Di bawahnya, empat kartu metrik utama menampilkan total volume narasi, kerapatan botnet inotentik 68 koma 5 persen, donat polarisasi sentimen, serta anomali kecepatan narasi organik versus rekayasa bot. "
            "Beralih ke tab Pemantauan Narasi, analis intelijen dapat memfilter percakapan lintas kanal seperti X, TikTok, Telegram, dan portal berita, lengkap dengan indikator kerapatan bot per postingan."
        )
    },
    {
        "id": "scene_05_live_inspector_radar",
        "title": "BABAK 4B: Live Demo Inspektor Deep NLP & Radar Botnet",
        "text": (
            "Kekuatan utama analisis teks SONAR berada pada tab Provokatif dan Hoaks. "
            "Melalui Inspektor Deep NLP berbasis Indo-BERT, analis dapat menguji narasi provokatif. Sistem secara instan membedah tingkat probabilitas hoaks, mengukur spektrum emosi kemarahan dan ketakutan publik, mendeteksi gaya bahasa manipulatif, serta memberikan rekomendasi tindakan taktis mitigasi. "
            "Selanjutnya pada tab Klaster dan Bot Radar, radar kognitif 360 derajat memetakan topologi jaringan sindikat siber. Terlihat jelas titik pusat akun inisiator, jejaring bot amplifikasi, serta jembatan penyebaran antar-platform, memudahkan penegak hukum melakukan atribusi digital secara akurat."
        )
    },
    {
        "id": "scene_06_live_map",
        "title": "BABAK 4C: Live Demo Peta Nusantara 38 Provinsi",
        "text": (
            "Untuk visibilitas komando kewilayahan, SONAR menghadirkan tab Anatomi dan Peta Wilayah. "
            "Peta interaktif ini memuat batas wilayah otentik 38 provinsi di Indonesia dengan proyeksi koordinat WGS-84. "
            "Terdapat sepuluh pin titik pantau terkalibrasi dari Sabang sampai Merauke, termasuk Ibu Kota Nusantara. Analis dapat mengklik tiap provinsi atau pin untuk memeriksa telemetri indeks ancaman lokal, kerapatan botnet kedaerahan, serta menerbitkan peringatan dini khusus bagi satuan tugas daerah seperti Kodam dan Polda."
        )
    },
    {
        "id": "scene_07_live_scenarios_sitrep",
        "title": "BABAK 5: Simulasi 14 Skenario & Ekspor Dokumen SitRep A4",
        "text": (
            "SONAR dilengkapi dengan 14 skenario simulasi ancaman multisektoral, mulai dari darurat perbankan, provokasi SARA, krisis pangan, ancaman separatisme, hingga deepfake pejabat negara. "
            "Saat skenario dipilih, seluruh sistem beradaptasi seketika. "
            "Pada modul Mitigasi Taktis, AI Agent otomatis merumuskan tiga langkah kontinjensi dan draf rilis kontra-narasi resmi. "
            "Lebih hebat lagi, dengan sekali klik tombol Ekspor SitRep, sistem menerbitkan Laporan Intelijen Eksekutif resmi format A4 berstandar dinas militer, lengkap dengan Kop Surat Mabes TNI, klasifikasi RAHASIA STRATEGIS, 4 KPI, dan blok tanda tangan digital berotentikasi SHA-256 siap serah pimpinan."
        )
    },
    {
        "id": "scene_08_conclusion",
        "title": "BABAK 6: Kesimpulan & Penutup",
        "text": (
            "Bapak dan Ibu Dewan Juri yang kami banggakan, "
            "SONAR versi 2.5 AI bukan sekadar prototipe konsep, melainkan platform yang telah teruji, siap diintegrasikan, dan operasional penuh. "
            "Dengan menggabungkan kecerdasan buatan, deteksi dini proaktif, dan respon taktis terukur, SONAR hadir sebagai benteng pertahanan kognitif terdepan demi menjaga stabilitas, persatuan, dan kedaulatan Negara Kesatuan Republik Indonesia. "
            "Terima kasih atas perhatian Dewan Juri. "
            "Wabillahi taufiq wal hidayah, Wassalamu’alaikum Warahmatullahi Wabarakatuh."
        )
    }
]

def get_audio_duration(file_path):
    cmd = [
        FFMPEG_EXE, "-i", file_path
    ]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            # Duration: 00:00:34.56, start: ...
            parts = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = parts.split(":")
            return float(h) * 3600 + float(m) * 60 + float(s)
    return 0.0

async def generate_all():
    os.makedirs("demo_build/audio", exist_ok=True)
    total_sec = 0.0
    print("Generating speech audio with edge-tts (id-ID-ArdiNeural)...")
    for i, s in enumerate(SCENES_NARRATION):
        out_mp3 = f"demo_build/audio/{s['id']}.mp3"
        print(f"[{i+1}/{len(SCENES_NARRATION)}] {s['title']}...")
        comm = edge_tts.Communicate(s['text'], VOICE, rate="+3%")
        await comm.save(out_mp3)
        dur = get_audio_duration(out_mp3)
        s['duration'] = dur
        total_sec += dur
        print(f"  -> Saved: {dur:.2f}s")
    
    print(f"\nTotal Narration Duration: {total_sec:.2f} seconds ({total_sec/60:.2f} minutes)")

if __name__ == "__main__":
    asyncio.run(generate_all())
