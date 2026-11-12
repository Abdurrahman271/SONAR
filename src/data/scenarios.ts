import type { Scenario } from '../types';
import { ADDITIONAL_SCENARIOS } from './additionalScenarios';

const BASE_SCENARIOS: Scenario[] = [
  {
    id: 'banking_rush_money',
    name: 'Serangan Siber Perbankan & Hoaks Rush Money',
    badge: 'DARURAT FINANSIAL',
    description: 'Kampanye terkoordinasi menyebarkan rumor kegagalan likuiditas bank nasional untuk memicu penarikan dana massal.',
    threatLevel: 'CRITICAL',
    simulatedTime: '12 Nov 2026, 08:30 WIB',
    narratives: [
      {
        id: 'post-101',
        author: 'Arif_Patriot99',
        authorHandle: '@arif_patriot99_id',
        platform: 'x',
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        content: 'VIRALKAN SEBELUM DIHAPUS!! Bank BUMN xxxx dikabarkan mengalami likuiditas parah dan rekening nasabah terancam dibekukan! Tarik uang kalian sekarang sebelum terlambat!! #RushMoney #PerbankanKolaps #Krisis2026',
        topic: 'Perbankan & Moneter',
        sentiment: 'provokatif',
        sentimentScore: -0.92,
        emotions: { anger: 88, fear: 94, joy: 2, trust: 5, anticipation: 82 },
        botMetrics: {
          botProbability: 92,
          accountAgeDays: 4,
          burstFrequencyPerHour: 142,
          textRepetitionScore: 94,
          networkCoordinationScore: 96,
          isSuspectedBot: true,
          classification: 'BOT TERKONFIRMASI'
        },
        propagandaDetected: [
          { name: 'Fear-Mongering & Urgensi Palsu', confidence: 96, description: 'Menimbulkan kepanikan finansial darurat.' },
          { name: 'Astroturfing', confidence: 91, description: 'Amplifikasi hashtag terencana serentak.' }
        ],
        reachEstimate: 420000,
        engagement: { shares: 3840, likes: 1200, comments: 890 },
        region: 'DKI Jakarta',
        threatLevel: 'CRITICAL',
        factCheckStatus: 'HOAKS_TOTAL',
        clusterId: 'cluster-rush'
      },
      {
        id: 'post-102',
        author: 'WaspadaEkonomi_Bot3',
        authorHandle: '@waspada_ekonomi_33',
        platform: 'telegram',
        timestamp: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
        content: 'Copas dari grup sebelah: Awas ada instruksi internal bank untuk membatasi tarik tunai ATM mulai besok malam! Amankan aset tunai sekarang juga saudara-saudara!',
        topic: 'Perbankan & Moneter',
        sentiment: 'provokatif',
        sentimentScore: -0.88,
        emotions: { anger: 72, fear: 90, joy: 1, trust: 8, anticipation: 75 },
        botMetrics: {
          botProbability: 87,
          accountAgeDays: 12,
          burstFrequencyPerHour: 88,
          textRepetitionScore: 89,
          networkCoordinationScore: 90,
          isSuspectedBot: true,
          classification: 'BOT TERKONFIRMASI'
        },
        propagandaDetected: [
          { name: 'Bandwagon Effect', confidence: 85, description: 'Menyebarkan efek domino kepanikan massal.' }
        ],
        reachEstimate: 195000,
        engagement: { shares: 2100, likes: 450, comments: 320 },
        region: 'Jawa Timur',
        threatLevel: 'CRITICAL',
        factCheckStatus: 'HOAKS_TOTAL',
        clusterId: 'cluster-rush'
      },
      {
        id: 'post-103',
        author: 'Dewi Sinta (Akun Warga)',
        authorHandle: '@dewisinta_sby',
        platform: 'x',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        content: 'Ini beneran gak sih berita antrean ATM panjang karena kabar likuiditas bank? Kok di grup WA keluarga rame banget pada panik mau tarik saldo?',
        topic: 'Perbankan & Moneter',
        sentiment: 'negatif',
        sentimentScore: -0.42,
        emotions: { anger: 35, fear: 78, joy: 10, trust: 22, anticipation: 60 },
        botMetrics: {
          botProbability: 18,
          accountAgeDays: 1420,
          burstFrequencyPerHour: 3,
          textRepetitionScore: 8,
          networkCoordinationScore: 12,
          isSuspectedBot: false,
          classification: 'ORGANIK'
        },
        propagandaDetected: [],
        reachEstimate: 8500,
        engagement: { shares: 45, likes: 82, comments: 124 },
        region: 'Jawa Timur',
        threatLevel: 'ELEVATED',
        factCheckStatus: 'BELUM_DIVERIFIKASI',
        clusterId: 'cluster-rush'
      },
      {
        id: 'post-104',
        author: 'MediaFinansialCek',
        authorHandle: '@cekfaktakeuangan',
        platform: 'news',
        timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
        content: 'OJK & Bank Indonesia Tegaskan Sistem Perbankan Nasional Sangat Sehat dengan CAR di atas 26% dan Likuiditas Melimpah, Isu Rush Money adalah Hoaks Jahat.',
        topic: 'Perbankan & Moneter',
        sentiment: 'positif',
        sentimentScore: 0.78,
        emotions: { anger: 8, fear: 12, joy: 65, trust: 88, anticipation: 40 },
        botMetrics: {
          botProbability: 8,
          accountAgeDays: 2800,
          burstFrequencyPerHour: 5,
          textRepetitionScore: 4,
          networkCoordinationScore: 6,
          isSuspectedBot: false,
          classification: 'ORGANIK'
        },
        propagandaDetected: [],
        reachEstimate: 620000,
        engagement: { shares: 4120, likes: 8900, comments: 640 },
        region: 'DKI Jakarta',
        threatLevel: 'LOW',
        factCheckStatus: 'BENAR',
        clusterId: 'cluster-counter'
      },
      {
        id: 'post-105',
        author: 'SiberKlaster_Node41',
        authorHandle: '@infokritis_node41',
        platform: 'tiktok',
        timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
        content: 'Bukti saldo terpotong ga jelas di aplikasi m-banking! Cepat amankan dana kalian, mumpung teller masih buka pagi ini! #RushMoney #DaruratBank',
        topic: 'Perbankan & Moneter',
        sentiment: 'provokatif',
        sentimentScore: -0.85,
        emotions: { anger: 80, fear: 89, joy: 3, trust: 10, anticipation: 78 },
        botMetrics: {
          botProbability: 84,
          accountAgeDays: 6,
          burstFrequencyPerHour: 110,
          textRepetitionScore: 82,
          networkCoordinationScore: 88,
          isSuspectedBot: true,
          classification: 'BOT TERKONFIRMASI'
        },
        propagandaDetected: [
          { name: 'Selective Contextual Distortion', confidence: 89, description: 'Mencomot tangkapan layar maintenance rutin sebagai bukti kebangkrutan.' }
        ],
        reachEstimate: 310000,
        engagement: { shares: 3200, likes: 4500, comments: 780 },
        region: 'Jawa Barat',
        threatLevel: 'CRITICAL',
        factCheckStatus: 'HOAKS_TOTAL',
        clusterId: 'cluster-rush'
      }
    ],
    clusters: [
      {
        id: 'cluster-rush',
        name: 'Sindikat Disinformasi Finansial Rush Money',
        hashtag: '#RushMoney #PerbankanKolaps',
        coreNarrative: 'Klaim palsu kebangkrutan bank nasional dan provokasi penarikan massal.',
        totalVolume: 42850,
        botPercentage: 78.4,
        growthRatePercent: 245,
        primarySentiment: 'provokatif',
        threatScore: 94,
        keyAmplifiers: ['@arif_patriot99_id', '@waspada_ekonomi_33', '@infokritis_node41', '@cyber_amplif_88'],
        recommendedMitigation: 'Rilis siaran pers darurat BI-OJK, koordinasi takedown akun bot jaringan koordinasi, serta publikasikan visual stabilitas cadangan kas likuiditas perbankan.'
      },
      {
        id: 'cluster-counter',
        name: 'Respon Cek Fakta & Otoritas Moneter',
        hashtag: '#PerbankanKuat #FaktaOJK',
        coreNarrative: 'Edukasi rasio CAR perbankan dan debunking video manipulatif antrean ATM.',
        totalVolume: 18400,
        botPercentage: 9.2,
        growthRatePercent: 45,
        primarySentiment: 'positif',
        threatScore: 12,
        keyAmplifiers: ['@cekfaktakeuangan', '@humas_ojk_id', '@bank_indonesia'],
        recommendedMitigation: 'Amplifikasi konten edukasi berformat micro-infografis di TikTok dan Instagram Reels untuk menjangkau kelompok usia muda.'
      }
    ],
    summary: {
      totalPosts: 61250,
      avgBotProbability: 68.5,
      sentimentBreakdown: {
        positif: 14,
        netral: 18,
        negatif: 26,
        provokatif: 42
      },
      disinfoDetectedCount: 38400,
      threatIndex: 92
    },
    agentBriefing: {
      headline: 'STATUS DARURAT KOGNITIF: Operasi Bot Disinformasi Rush Money Terdeteksi Aktif',
      analysisParagraph: 'AI Agent mendeteksi 78.4% aktivitas terkoordinasi (inauthentic coordinated behavior) yang berasal dari cluster bot sindikat penyebar rumor finansial. Anomali velocity meningkat 245% dalam 90 menit terakhir dengan pola penyebaran identik lintas platform (X, Telegram, TikTok). Dampak kognitif berpotensi memicu antrean fisik di cabang perbankan bila tidak segera dimitigasi.',
      anomalyDetected: [
        '92% akun penyebar hashtag #RushMoney berumur di bawah 14 hari dengan rasio tweet > 120/jam.',
        'Pola copy-paste sintaksis dengan kesamaan leksikal 89.4% (Astroturfing terorganisir).',
        'Penyebaran terpusat di wilayah sentra ekonomi (DKI Jakarta 48%, Surabaya 22%, Bandung 15%).'
      ],
      tacticalActions: [
        'Terbitkan Flash Clearance dari Otoritas Jasa Keuangan (OJK) dan Bank Indonesia dalam kurun < 30 menit.',
        'Kirimkan notifikasi mitigasi penanganan konten ke platform digital (Meta, TikTok, X) untuk melabeli hoaks.',
        'Luncurkan narasi penyejuk dengan konten visual real-time operasional bank normal.'
      ],
      counterNarrativeDraft: '[PERINGATAN SIBER RESMI - SATGAS KOGNITIF]\nBeredar narasi hoaks perbankan tidak berdasar. Data Bank Indonesia mengonfirmasi permodalan perbankan nasional sangat solid (CAR > 26%). Informasi penarikan massal adalah manipulasi bot siber. Jangan panik, verifikasi sumber terpercaya!'
    }
  },
  {
    id: 'election_disinformation',
    name: 'Operasi Bot Polarisasi & Kecurangan Pemilu',
    badge: 'POLARISASI POLITIK',
    description: 'Penyebaran video deepfake potongan dan narasi delegitimasi integritas penyelenggara pemilu.',
    threatLevel: 'HIGH',
    simulatedTime: '12 Nov 2026, 07:15 WIB',
    narratives: [
      {
        id: 'post-201',
        author: 'RadarDemokrasi_99',
        authorHandle: '@radardemokrasi_bot99',
        platform: 'tiktok',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        content: 'Bongkar skandal server hitung suara! Video ini membuktikan adanya algoritma curang 55-45 sebelum pemungutan suara selesai! #KawalSuaraRakyat #PemiluGagal',
        topic: 'Integritas Pemilu',
        sentiment: 'provokatif',
        sentimentScore: -0.89,
        emotions: { anger: 85, fear: 70, joy: 5, trust: 8, anticipation: 80 },
        botMetrics: {
          botProbability: 79,
          accountAgeDays: 9,
          burstFrequencyPerHour: 95,
          textRepetitionScore: 84,
          networkCoordinationScore: 86,
          isSuspectedBot: true,
          classification: 'BOT TERKONFIRMASI'
        },
        propagandaDetected: [
          { name: 'Teori Konspirasi & Delegitimasi', confidence: 94, description: 'Menyerang integritas sistem rekapitulasi KPU.' }
        ],
        reachEstimate: 510000,
        engagement: { shares: 4800, likes: 6200, comments: 1400 },
        region: 'Jawa Barat',
        threatLevel: 'HIGH',
        factCheckStatus: 'HOAKS_TOTAL',
        clusterId: 'cluster-pemilu'
      },
      {
        id: 'post-202',
        author: 'IndoDemokrasiSehat',
        authorHandle: '@demokrasisehat_id',
        platform: 'x',
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        content: 'Cek fakta: Video yang beredar tentang "server curang" adalah rekaman simulasi teknis 2019 yang diedit ulang. Jangan mudah terhasut potongan video editan!',
        topic: 'Integritas Pemilu',
        sentiment: 'positif',
        sentimentScore: 0.65,
        emotions: { anger: 12, fear: 15, joy: 45, trust: 75, anticipation: 30 },
        botMetrics: {
          botProbability: 14,
          accountAgeDays: 950,
          burstFrequencyPerHour: 4,
          textRepetitionScore: 6,
          networkCoordinationScore: 8,
          isSuspectedBot: false,
          classification: 'ORGANIK'
        },
        propagandaDetected: [],
        reachEstimate: 210000,
        engagement: { shares: 1950, likes: 4300, comments: 410 },
        region: 'DKI Jakarta',
        threatLevel: 'LOW',
        factCheckStatus: 'BENAR',
        clusterId: 'cluster-pemilu-counter'
      }
    ],
    clusters: [
      {
        id: 'cluster-pemilu',
        name: 'Klaster Delegitimasi Rekapitulasi Suara',
        hashtag: '#PemiluGagal #KawalSuaraRakyat',
        coreNarrative: 'Manipulasi visual hasil hitung cepat untuk memicu ketidakpercayaan terhadap lembaga pemilu.',
        totalVolume: 35600,
        botPercentage: 62.1,
        growthRatePercent: 180,
        primarySentiment: 'provokatif',
        threatScore: 82,
        keyAmplifiers: ['@radardemokrasi_bot99', '@suara_rakyat_merdeka2', '@klaster_suara_90'],
        recommendedMitigation: 'Buka audit live streaming server Sirekap dan publikasikan sertifikasi BSSN ke masyarakat.'
      }
    ],
    summary: {
      totalPosts: 48900,
      avgBotProbability: 58.2,
      sentimentBreakdown: {
        positif: 20,
        netral: 24,
        negatif: 32,
        provokatif: 24
      },
      disinfoDetectedCount: 24100,
      threatIndex: 78
    },
    agentBriefing: {
      headline: 'PERINGATAN SIAGA: Peningkatan Kampanye Disinformasi Delegitimasi Pemilu',
      analysisParagraph: 'Klaster akun buzzer terkoordinasi memanfaatkan cuplikan video simulasi usang dengan narasi manipulatif. Sentimen negatif terakumulasi di Jawa Barat dan Sumatera Utara.',
      anomalyDetected: [
        'Kemunculan 320 akun baru dalam rentang 45 menit yang menaikkan hashtag #PemiluGagal.',
        'Distribusi video potongan pendek di platform TikTok dengan pola audio yang disamarkan.'
      ],
      tacticalActions: [
        'Transparansi proses verifikasi dan live Q&A tim teknis KPU & BSSN.',
        'Distribusi debunking video side-by-side perbandingan video asli vs video editan.'
      ],
      counterNarrativeDraft: 'Jaga demokrasi kita dengan kejernihan berpikir. Hasil pemilu dapat dicek langsung secara berjenjang lewat C1 plano resmi di setiap TPS. Tolak segala bentuk narasi adu domba!'
    }
  },
  {
    id: 'subsidy_energy_discontent',
    name: 'Isu Subsidi Energi & Gejolak Harga Pangan',
    badge: 'KEBIJAKAN PUBLIK',
    description: 'Respon masyarakat terhadap penyesuaian subsidi yang mulai ditunggangi bot amplifikasi provokatif.',
    threatLevel: 'ELEVATED',
    simulatedTime: '12 Nov 2026, 06:00 WIB',
    narratives: [
      {
        id: 'post-301',
        author: 'RakyatKecilBicara',
        authorHandle: '@rakyat_kecil_ri',
        platform: 'facebook',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        content: 'Bahan pokok makin mahal, sekarang subsidi BBM dikurangi lagi. Semoga pemerintah segera menyalurkan BLT tepat sasaran biar pedagang kecil kayak kami ga gulung tikar.',
        topic: 'Kebijakan Publik',
        sentiment: 'negatif',
        sentimentScore: -0.55,
        emotions: { anger: 48, fear: 68, joy: 5, trust: 30, anticipation: 45 },
        botMetrics: {
          botProbability: 12,
          accountAgeDays: 1820,
          burstFrequencyPerHour: 1,
          textRepetitionScore: 4,
          networkCoordinationScore: 6,
          isSuspectedBot: false,
          classification: 'ORGANIK'
        },
        propagandaDetected: [],
        reachEstimate: 14500,
        engagement: { shares: 120, likes: 450, comments: 210 },
        region: 'Jawa Tengah',
        threatLevel: 'GUARDED',
        factCheckStatus: 'BELUM_DIVERIFIKASI',
        clusterId: 'cluster-subsidi-organic'
      },
      {
        id: 'post-302',
        author: 'AksiRakyatMogok_01',
        authorHandle: '@mogok_nasional_sekarang',
        platform: 'x',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        content: 'REVOLUSI TOTAL! Hancurkan kebijakan zalim subsidi dicabut! Semua supir angkot dan buruh wajib mogok serentak Senin depan! Jangan bayar pajak! #MogokTotal #BoikotPajak',
        topic: 'Kebijakan Publik',
        sentiment: 'provokatif',
        sentimentScore: -0.91,
        emotions: { anger: 92, fear: 40, joy: 1, trust: 2, anticipation: 85 },
        botMetrics: {
          botProbability: 74,
          accountAgeDays: 18,
          burstFrequencyPerHour: 75,
          textRepetitionScore: 78,
          networkCoordinationScore: 82,
          isSuspectedBot: true,
          classification: 'BOT TERKONFIRMASI'
        },
        propagandaDetected: [
          { name: 'Provokasi Anarkis & Pembangkangan Sipil', confidence: 92, description: 'Ajakan mogok paksa dan boikot kewajiban negara.' }
        ],
        reachEstimate: 85000,
        engagement: { shares: 890, likes: 620, comments: 410 },
        region: 'Sumatera Utara',
        threatLevel: 'HIGH',
        factCheckStatus: 'MENYESATKAN',
        clusterId: 'cluster-subsidi-bot'
      }
    ],
    clusters: [
      {
        id: 'cluster-subsidi-organic',
        name: 'Aspirasi Warga & Beban Biaya Hidup',
        hashtag: '#SuaraRakyat #SubsidiTepatSasaran',
        coreNarrative: 'Kekhawatiran masyarakat terhadap harga komoditas pokok dan harapan mitigasi bansos.',
        totalVolume: 22000,
        botPercentage: 14.5,
        growthRatePercent: 35,
        primarySentiment: 'negatif',
        threatScore: 42,
        keyAmplifiers: ['@rakyat_kecil_ri', '@forum_pedagang_pasar'],
        recommendedMitigation: 'Dengarkan aspirasi warga, perbanyak sosialisasi skema perlindungan sosial dan operasi pasar murah.'
      },
      {
        id: 'cluster-subsidi-bot',
        name: 'Infiltrasi Bot Provokasi Mogok Kerja',
        hashtag: '#MogokTotal #BoikotPajak',
        coreNarrative: 'Eskalasi kekecewaan warga menjadi ajakan sabotase ekonomi dan pembangkangan massal.',
        totalVolume: 8400,
        botPercentage: 74.2,
        growthRatePercent: 120,
        primarySentiment: 'provokatif',
        threatScore: 76,
        keyAmplifiers: ['@mogok_nasional_sekarang', '@gerakan_rakyat_bawah'],
        recommendedMitigation: 'Isolasi akun pemicu, tegakkan hukum atas ancaman sabotase fisik, dan rangkul asosiasi transportasi resmi.'
      }
    ],
    summary: {
      totalPosts: 30400,
      avgBotProbability: 38.6,
      sentimentBreakdown: {
        positif: 28,
        netral: 30,
        negatif: 32,
        provokatif: 10
      },
      disinfoDetectedCount: 7800,
      threatIndex: 56
    },
    agentBriefing: {
      headline: 'STATUS WASPADA: Aspirasi Riil Warga Ditunggangi Bot Agitasi',
      analysisParagraph: 'Percakapan publik sebagian besar berisi kekhawatiran alami warga terkait biaya hidup (organik). Namun, terdeteksi klaster bot sekunder yang mencoba memicu radikalisasi dengan seruan aksi anarkis.',
      anomalyDetected: [
        'Klaster bot memanipulasi topik subsidi dengan menautkan tagar anarkisme.',
        'Frekuensi tweet akun pemicu melonjak di luar jam kerja (pukul 02:00 - 05:00).'
      ],
      tacticalActions: [
        'Pisahkan respon: dengarkan kritik konstruktif warga, counter provokasi bot anarkis.',
        'Sampaikan transparansi pengalihan dana subsidi ke sektor kesehatan dan beasiswa.'
      ],
      counterNarrativeDraft: 'Pemerintah memastikan perlindungan sosial untuk masyarakat rentan tetap menjadi prioritas utama melalui bantuan langsung tunai dan stabilisasi harga pangan.'
    }
  },
  {
    id: 'normal_organic_state',
    name: 'Situasi Normal & Dinamika Siber Kondusif',
    badge: 'NORMAL / AMAN',
    description: 'Pola percakapan wajar tanpa tanda anomali terkoordinasi. Diskusi didominasi oleh warga organik.',
    threatLevel: 'LOW',
    simulatedTime: '12 Nov 2026, 05:00 WIB',
    narratives: [
      {
        id: 'post-401',
        author: 'Budi Santoso',
        authorHandle: '@budisantoso_tech',
        platform: 'x',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        content: 'Keren banget inovasi talenta muda Indonesia di bidang AI dan pertahanan siber. Semoga industri teknologi nasional makin mandiri dan maju!',
        topic: 'Inovasi & Teknologi',
        sentiment: 'positif',
        sentimentScore: 0.88,
        emotions: { anger: 2, fear: 4, joy: 85, trust: 80, anticipation: 65 },
        botMetrics: {
          botProbability: 8,
          accountAgeDays: 1400,
          burstFrequencyPerHour: 2,
          textRepetitionScore: 3,
          networkCoordinationScore: 4,
          isSuspectedBot: false,
          classification: 'ORGANIK'
        },
        propagandaDetected: [],
        reachEstimate: 32000,
        engagement: { shares: 410, likes: 1250, comments: 85 },
        region: 'DKI Jakarta',
        threatLevel: 'LOW',
        factCheckStatus: 'BENAR',
        clusterId: 'cluster-organic-normal'
      },
      {
        id: 'post-402',
        author: 'Rina Melati',
        authorHandle: '@rinamelati_daily',
        platform: 'tiktok',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        content: 'Pagi-pagi menikmati kereta cepat Whoosh menuju Bandung. Pelayanan rapi dan tepat waktu, bangga punya transportasi modern kayak gini.',
        topic: 'Infrastruktur',
        sentiment: 'positif',
        sentimentScore: 0.84,
        emotions: { anger: 1, fear: 2, joy: 88, trust: 82, anticipation: 50 },
        botMetrics: {
          botProbability: 6,
          accountAgeDays: 890,
          burstFrequencyPerHour: 1,
          textRepetitionScore: 2,
          networkCoordinationScore: 3,
          isSuspectedBot: false,
          classification: 'ORGANIK'
        },
        propagandaDetected: [],
        reachEstimate: 145000,
        engagement: { shares: 1450, likes: 7800, comments: 420 },
        region: 'Jawa Barat',
        threatLevel: 'LOW',
        factCheckStatus: 'BENAR',
        clusterId: 'cluster-organic-normal'
      }
    ],
    clusters: [
      {
        id: 'cluster-organic-normal',
        name: 'Dinamika Sosial Sehari-hari',
        hashtag: '#IndonesiaMaju #InovasiAnakBangsa',
        coreNarrative: 'Diskusi seputar teknologi, transportasi publik, gaya hidup, dan aktivitas warga.',
        totalVolume: 51200,
        botPercentage: 7.8,
        growthRatePercent: 8,
        primarySentiment: 'positif',
        threatScore: 14,
        keyAmplifiers: ['@budisantoso_tech', '@rinamelati_daily'],
        recommendedMitigation: 'Pertahankan pemantauan rutin dan perkuat literasi digital publik.'
      }
    ],
    summary: {
      totalPosts: 51200,
      avgBotProbability: 11.4,
      sentimentBreakdown: {
        positif: 58,
        netral: 32,
        negatif: 9,
        provokatif: 1
      },
      disinfoDetectedCount: 420,
      threatIndex: 12
    },
    agentBriefing: {
      headline: 'STATUS AMAN / KONDUSIF: Ekosistem Kognitif Berjalan Normal',
      analysisParagraph: 'Tidak terdeteksi adanya operasi astroturfing maupun anomali botnet. Tingkat bot berada di angka wajar (7.8%) dan sentimen publik didominasi nuansa positif dan apresiatif.',
      anomalyDetected: [
        'Distribusi percakapan merata tanpa lonjakan tajam.',
        'Tidak ada template teks berulang yang mencurigakan.'
      ],
      tacticalActions: [
        'Lanjutkan monitoring pasif (Green State Sentinel).',
        'Lakukan evaluasi kesehatan sistem sensor siber berkala.'
      ],
      counterNarrativeDraft: 'Ruang siber sosial berada dalam kondisi aman dan kondusif. Tetap pertahankan ruang diskusi yang cerdas, santun, dan saling membangun.'
    }
  }
];

export const SCENARIOS: Scenario[] = [
  ...BASE_SCENARIOS,
  ...ADDITIONAL_SCENARIOS,
];
