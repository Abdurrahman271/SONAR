import type { AnalysisInputResult, SentimentType, ThreatLevel, PropagandaTechnique } from '../types';

// Lexicon for Cognitive Domain Social Cyber Analysis (Indonesian)
const POSITIVE_WORDS = [
  'transparan', 'terpercaya', 'apresiasi', 'sukses', 'berkualitas', 'solutif', 'stabil', 'kondusif',
  'kerjasama', 'kemajuan', 'dukung', 'prestasi', 'amanah', 'integritas', 'tuntas', 'bijak', 'terbukti',
  'damai', 'hebat', 'akurasi', 'keberhasilan', 'pulih', 'membaik', 'pertumbuhan', 'positif'
];

const NEGATIVE_WORDS = [
  'kecewa', 'gagal', 'amburadul', 'korupsi', 'merugikan', 'kebohongan', 'lambat', 'ancaman', 'krisis',
  'rusak', 'bangkrut', 'penipuan', 'manipulasi', 'terpuruk', 'miskin', 'cacat', 'bobrok', 'mengecewakan',
  'kemunduran', 'buruk', 'rugi', 'parah', 'tertindas', 'kacau'
];

const PROVOCATIVE_WORDS = [
  'hancurkan', 'viralkan sebelum dihapus', 'revolusi', 'tumbangkan', 'rezim zolim', 'antek', 'penghianat',
  'rush money', 'tarik uang sekarang', 'boikot total', 'bakar', 'darurat nasional', 'rakyat dibantai',
  'konspirasi elit', 'jangan percaya', 'serbu', 'laknat', 'bunuh', 'makar', 'darah', 'perang'
];

const ASTROTURF_TRIGGERS = [
  'copas dari grup sebelah', 'sebarkan ke semua grup', 'forward info ini', 'wajib share', 'viralkan!!',
  'tag semua teman', 'bantu rt', 'bantu up', 'retweet sebanyak banyaknya'
];

export function analyzeIndonesianText(text: string): AnalysisInputResult {
  const normalized = text.toLowerCase();
  const words = normalized.split(/\s+/).filter(w => w.length > 0);
  const totalWords = Math.max(1, words.length);

  // 1. Sentiment Score calculation
  let posCount = 0;
  let negCount = 0;
  let provCount = 0;

  POSITIVE_WORDS.forEach(w => {
    if (normalized.includes(w)) posCount++;
  });

  NEGATIVE_WORDS.forEach(w => {
    if (normalized.includes(w)) negCount++;
  });

  PROVOCATIVE_WORDS.forEach(w => {
    if (normalized.includes(w)) provCount += 2;
  });

  // Calculate sentiment type
  let sentiment: SentimentType = 'netral';
  let sentimentScore = 0;

  if (provCount >= 1 || (negCount >= 2 && normalized.includes('!'))) {
    sentiment = 'provokatif';
    sentimentScore = -0.75 - Math.min(0.25, provCount * 0.1);
  } else if (negCount > posCount) {
    sentiment = 'negatif';
    sentimentScore = -Math.min(0.85, (negCount - posCount) * 0.2 + 0.2);
  } else if (posCount > negCount) {
    sentiment = 'positif';
    sentimentScore = Math.min(0.9, (posCount - negCount) * 0.25 + 0.15);
  } else {
    sentiment = 'netral';
    sentimentScore = 0.05;
  }

  // 2. Emotion Metrics
  let anger = 10;
  let fear = 10;
  let joy = 15;
  let sadness = 10;
  let surprise = 15;

  if (sentiment === 'provokatif') {
    anger = Math.min(96, 65 + provCount * 8);
    fear = Math.min(92, 50 + negCount * 7);
    joy = 4;
    sadness = 45;
    surprise = 75;
  } else if (sentiment === 'negatif') {
    anger = Math.min(80, 40 + negCount * 8);
    fear = Math.min(85, 35 + negCount * 9);
    joy = 8;
    sadness = 60;
    surprise = 40;
  } else if (sentiment === 'positif') {
    anger = 5;
    fear = 6;
    joy = Math.min(95, 55 + posCount * 10);
    sadness = 5;
    surprise = 35;
  }

  // 3. Propaganda Detection
  const propagandaDetected: PropagandaTechnique[] = [];

  if (provCount > 0 || /viralkan|sebelum dihapus|rahasia besar/i.test(text)) {
    propagandaDetected.push({
      name: 'Fear-Mongering & Urgensi Palsu',
      confidence: Math.min(95, 60 + provCount * 12),
      description: 'Menciptakan histeria atau kepanikan instan untuk mencegah pembaca memverifikasi data secara rasional.'
    });
  }

  let hasAstroturf = false;
  ASTROTURF_TRIGGERS.forEach(t => {
    if (normalized.includes(t)) hasAstroturf = true;
  });
  if (hasAstroturf || /(#\w+\s*){3,}/i.test(text)) {
    propagandaDetected.push({
      name: 'Astroturfing & Amplifikasi Terkoordinasi',
      confidence: 88,
      description: 'Menggunakan template pesan berulang dan penumpukan hashtag untuk memanipulasi algoritma tren media sosial.'
    });
  }

  if (/rezim|antek|aseng|antek asing|bobrok|cukong|cebong|kadrun/i.test(text)) {
    propagandaDetected.push({
      name: 'Name-Calling & Demonization (Pelabelan Buruk)',
      confidence: 90,
      description: 'Mengalihkan substansi kebijakan dengan menyerang identitas lawan melalui label provokatif.'
    });
  }

  if (/pasti bohong|semua ditutup-tutupi|fakta dibungkam/i.test(text)) {
    propagandaDetected.push({
      name: 'Teori Konspirasi & Delegitimasi Institusi',
      confidence: 84,
      description: 'Menyerang kepercayaan publik terhadap institusi resmi tanpa menyertakan bukti audit terverifikasi.'
    });
  }

  // 4. Bot Probability Calculation
  let botScore = 15; // baseline organic
  const botFactors: { factor: string; impact: 'RENDAH' | 'SEDANG' | 'TINGGI'; detail: string }[] = [];

  // Factor A: Uppercase ratio
  const uppercaseLetters = (text.match(/[A-Z]/g) || []).length;
  const totalLetters = (text.match(/[a-zA-Z]/g) || []).length;
  const capsRatio = totalLetters > 0 ? uppercaseLetters / totalLetters : 0;
  if (capsRatio > 0.45 && text.length > 30) {
    botScore += 25;
    botFactors.push({
      factor: 'Excessive Capitalization (CAPS LOCK)',
      impact: 'TINGGI',
      detail: `Rasio huruf kapital mencapai ${(capsRatio * 100).toFixed(0)}%, karakteristik umum akun bot pemancing emosi.`
    });
  }

  // Factor B: Hashtag spamming
  const hashtags = (text.match(/#[\w_]+/g) || []);
  if (hashtags.length >= 3) {
    botScore += 20;
    botFactors.push({
      factor: 'Hashtag Stuffing / Algorithmic Hijack',
      impact: 'TINGGI',
      detail: `Mengandung ${hashtags.length} hashtag teragregasi untuk manipulasi trending topic.`
    });
  }

  // Factor C: Punctuation exclamation repetition
  if (/!{2,}|\?{2,}/.test(text)) {
    botScore += 12;
    botFactors.push({
      factor: 'Syntactic Punctuation Flooding',
      impact: 'SEDANG',
      detail: 'Tanda seru/tanya beruntun tinggi khas skrip kampanye automated buzzer.'
    });
  }

  // Factor D: CTA Sharing phrases
  if (hasAstroturf) {
    botScore += 25;
    botFactors.push({
      factor: 'Scripted Viral Call-to-Action',
      impact: 'TINGGI',
      detail: 'Menggunakan frasa perintah sebar serentak khas instruksi jaringan akun bot.'
    });
  }

  // Factor E: Length vs Lexical Density
  if (totalWords < 8 && hashtags.length >= 2) {
    botScore += 18;
    botFactors.push({
      factor: 'Low Lexical Density / Pure Amplifier',
      impact: 'SEDANG',
      detail: 'Konten teks minimal dengan fokus utama amplifikasi tagar.'
    });
  }

  const finalBotProb = Math.min(98, Math.max(8, botScore));

  // 5. Threat Level determination
  let threatLevel: ThreatLevel = 'LOW';
  let disinfoRisk = 20;

  if (sentiment === 'provokatif' && finalBotProb > 65) {
    threatLevel = 'CRITICAL';
    disinfoRisk = 94;
  } else if (sentiment === 'provokatif' || (sentiment === 'negatif' && finalBotProb > 55)) {
    threatLevel = 'HIGH';
    disinfoRisk = 78;
  } else if (sentiment === 'negatif' || finalBotProb > 45) {
    threatLevel = 'ELEVATED';
    disinfoRisk = 52;
  } else if (finalBotProb > 30) {
    threatLevel = 'GUARDED';
    disinfoRisk = 35;
  }

  // 6. Tactical Recommendation & Counter-Narrative Template
  let recommendation = '';
  let counterTemplate = '';
  const suggestedHashtags = ['#IndonesiaCerdasBermedsos', '#SaringSebelumSharing', '#JagaRuangSiber'];

  if (threatLevel === 'CRITICAL' || threatLevel === 'HIGH') {
    recommendation = 'PRIORITAS UTAMA: Aktifkan Protokol Satgas Komunikasi Krisis. Lakukan fact-checking instan, infokan rilis data resmi ke media tier-1, dan lakukan de-amplifikasi akun penyebar utama melalui platform cyber complaint.';
    counterTemplate = `[KLARIFIKASI RESMI SATGAS]\nMenanggapi narasi yang beredar mengenai "${words.slice(0, 5).join(' ')}...", kami tegaskan informasi tersebut TIDAK BENAR / DISTORSI FAKTA. Data resmi menunjukkan situasi terkendali dan masyarakat diimbau tidak terprovokasi ajakan melanggar hukum. Rujukan lengkap: satgasciber.go.id/klarifikasi`;
    suggestedHashtags.push('#FaktaBukanHoaks', '#StopDisinformasi');
  } else if (threatLevel === 'ELEVATED') {
    recommendation = 'Lakukan observasi berkala 60 menit ke depan. Siapkan materi edukasi publik dan pantau jika ada bridging ke kanal broadcast WhatsApp/Telegram.';
    counterTemplate = `Mari jaga ruang percakapan publik tetap sejuk dan berbasis fakta objektif. Jangan mudah menyebarkan narasi tanpa memeriksa sumber data primer.`;
    suggestedHashtags.push('#BijakBermedsos', '#VerifikasiFakta');
  } else {
    recommendation = 'Lanjutkan monitoring pasif (Green State). Tidak diperlukan intervensi khusus.';
    counterTemplate = `Diskusi publik berjalan konstruktif dan berada dalam koridor demokrasi sehat.`;
  }

  return {
    text,
    sentiment,
    sentimentScore,
    sentimentExplanation: `Analisis leksikal mendeteksi ${posCount} token positif, ${negCount} token negatif, dan ${provCount} indikator provokasi kognitif.`,
    emotions: {
      anger,
      fear,
      joy,
      sadness,
      surprise
    },
    botProbability: finalBotProb,
    botAnalysisFactors: botFactors.length > 0 ? botFactors : [
      { factor: 'Pola Bahasa Alami', impact: 'RENDAH', detail: 'Struktur kalimat memiliki variasi sintaksis wajar khas penutur manusia organik.' }
    ],
    propagandaDetected,
    disinformationRiskScore: disinfoRisk,
    threatLevel,
    tacticalRecommendation: recommendation,
    counterNarrativeTemplate: counterTemplate,
    suggestedHashtags
  };
}
