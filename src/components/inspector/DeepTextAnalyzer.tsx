import React, { useState } from 'react';
import { analyzeIndonesianText } from '../../utils/nlpEngine';
import type { AnalysisInputResult } from '../../types';
import {
  Search,
  Sparkles,
  Bot,
  AlertTriangle,
  Copy,
  Check,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';

export const DeepTextAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    'VIRALKAN SEBELUM DIHAPUS!! Bank BUMN xxxx dikabarkan mengalami likuiditas parah dan rekening nasabah terancam dibekukan! Tarik uang kalian sekarang sebelum terlambat!! #RushMoney #PerbankanKolaps #Krisis2026'
  );
  const [result, setResult] = useState<AnalysisInputResult>(() =>
    analyzeIndonesianText(
      'VIRALKAN SEBELUM DIHAPUS!! Bank BUMN xxxx dikabarkan mengalami likuiditas parah dan rekening nasabah terancam dibekukan! Tarik uang kalian sekarang sebelum terlambat!! #RushMoney #PerbankanKolaps #Krisis2026'
    )
  );
  const [copied, setCopied] = useState<boolean>(false);

  const samplePresets = [
    {
      label: 'Hoaks Rush Money (Ekstrem)',
      text: 'VIRALKAN SEBELUM DIHAPUS!! Bank BUMN xxxx dikabarkan mengalami likuiditas parah dan rekening nasabah terancam dibekukan! Tarik uang kalian sekarang sebelum terlambat!! #RushMoney #PerbankanKolaps #Krisis2026',
    },
    {
      label: 'Provokasi Pemilu (Buzzer)',
      text: 'Copas dari grup sebelah: Bongkar skandal server hitung suara pemilu! Algoritma curang terbukti sengaja diatur 55-45! Sebarkan ke semua grup WA sebelum aparat membungkam! #PemiluCurang #RevolusiRakyat',
    },
    {
      label: 'Aspirasi Warga (Organik Kritis)',
      text: 'Bahan pokok makin mahal, sekarang subsidi BBM dikurangi lagi. Semoga pemerintah segera menyalurkan BLT tepat sasaran biar pedagang kecil kayak kami ga gulung tikar.',
    },
    {
      label: 'Klarifikasi Resmi (Positif Valid)',
      text: 'OJK & Bank Indonesia tegaskan sistem perbankan nasional sangat sehat dengan rasio CAR di atas 26% dan likuiditas kuat. Isu rush money adalah hoaks jahat yang tidak berdasar. #PerbankanSehat',
    },
  ];

  const handleAnalyze = (textToAnalyze = inputText) => {
    tacticalAudio.playScanBeep();
    const res = analyzeIndonesianText(textToAnalyze);
    setResult(res);
  };

  const handleSelectPreset = (text: string) => {
    tacticalAudio.playTechClick();
    setInputText(text);
    handleAnalyze(text);
  };

  const handleCopyCounterNarrative = () => {
    tacticalAudio.playTechClick();
    navigator.clipboard.writeText(result.counterNarrativeTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Console */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4"
      >
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Inspektor Narasi Tunggal (Single-Text Deep NLP &amp; Bot Engine)
            </h3>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              COGNITIVE SCANNER READY
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
            Uji coba pemrosesan teks publik secara langsung: identifikasi probabilitas bot, teknik manipulasi, polarisasi emosi, dan otomatisasi mitigasi taktis.
          </p>
        </div>

        {/* Preset Sample Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-sans font-bold text-slate-400 uppercase">
            Uji Sampel Cepat:
          </span>
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset.text)}
              className="text-xs font-sans font-medium px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik atau tempel teks postingan narasi di sini..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-sans focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            {inputText.length} Karakter &bull; {inputText.split(/\s+/).filter(Boolean).length} Kata
          </span>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnalyze()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a56db] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm cursor-pointer transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Jalankan Analisis Kognitif</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Analysis Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sentiment & Emotion spectrum */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
            <h4 className="text-xs font-sans font-bold uppercase text-slate-400 mb-3 flex items-center justify-between">
              <span>Klasifikasi Sentimen</span>
              <span className="text-blue-600 font-mono capitalize">{result.sentiment}</span>
            </h4>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div
                className={`text-2xl font-black font-sans capitalize ${
                  result.sentiment === 'provokatif'
                    ? 'text-red-600'
                    : result.sentiment === 'negatif'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {result.sentiment}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono">
                Skor Polaritas: {(result.sentimentScore * 100).toFixed(0)}%
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600 font-sans leading-relaxed">
              {result.sentimentExplanation}
            </p>
          </div>

          {/* Emotion Spectrum */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <h4 className="text-xs font-sans font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              Spektrum Emosi Kognitif
            </h4>

            <div className="space-y-2.5 text-xs font-sans">
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Kemarahan (Anger)</span>
                  <span className="font-mono text-red-600 font-bold">{result.emotions.anger}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${result.emotions.anger}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Ketakutan (Fear)</span>
                  <span className="font-mono text-amber-600 font-bold">{result.emotions.fear}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${result.emotions.fear}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Harapan / Kegembiraan (Joy)</span>
                  <span className="font-mono text-emerald-600 font-bold">{result.emotions.joy}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${result.emotions.joy}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Keterkejutan (Surprise)</span>
                  <span className="font-mono text-sky-600 font-bold">{result.emotions.surprise}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: `${result.emotions.surprise}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Bot Probability & Manipulation Techniques */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
            <h4 className="text-xs font-sans font-bold uppercase text-slate-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-blue-600" />
                Probabilitas Bot &amp; Buzzer
              </span>
              <span
                className={`font-mono font-bold ${
                  result.botProbability >= 65
                    ? 'text-red-600'
                    : result.botProbability >= 35
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {result.botProbability >= 65
                  ? 'TINGGI'
                  : result.botProbability >= 35
                  ? 'SEDANG'
                  : 'ORGANIK'}
              </span>
            </h4>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-[10px] font-sans text-slate-500 uppercase font-bold">Skor Kepalsuan Akun</div>
                <div
                  className={`text-3xl font-black font-sans mt-0.5 ${
                    result.botProbability >= 65 ? 'text-red-600' : 'text-emerald-600'
                  }`}
                >
                  {result.botProbability}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-sans text-slate-500 uppercase font-bold">Risiko Disinformasi</div>
                <div className="text-2xl font-black font-sans text-amber-600 mt-0.5">
                  {result.disinformationRiskScore}/100
                </div>
              </div>
            </div>

            {/* Factor breakdown */}
            <div className="mt-3 space-y-2">
              <span className="text-[10px] font-sans font-bold uppercase text-slate-400">Faktor Pembobot Anomali:</span>
              {result.botAnalysisFactors.map((f, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{f.factor}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                        f.impact === 'TINGGI'
                          ? 'bg-red-100 text-red-700'
                          : f.impact === 'SEDANG'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {f.impact}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Propaganda Techniques */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
            <h4 className="text-xs font-sans font-bold uppercase text-slate-400 mb-2.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Teknik Manipulasi Kognitif Terdeteksi
            </h4>

            {result.propagandaDetected.length > 0 ? (
              <div className="space-y-2">
                {result.propagandaDetected.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-900">{p.name}</span>
                      <span className="font-mono font-bold text-amber-700">{p.confidence}%</span>
                    </div>
                    <p className="text-[11px] text-slate-700 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tidak terindikasi manipulasi kognitif sistematis.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Satgas Mitigation & Counter-Narrative Generator */}
        <div className="space-y-4">
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-sans uppercase text-blue-900 flex items-center gap-2 font-bold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Rekomendasi Tindakan Satgas (AI Agent)
            </h4>

            <div className="p-4 rounded-xl bg-white border border-blue-200 text-xs text-slate-800 leading-relaxed font-sans shadow-xs">
              {result.tacticalRecommendation}
            </div>

            {/* Generated Counter Narrative */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-sans font-bold uppercase text-slate-600">
                  Draf Kontra-Narasi Siap Rilis:
                </span>
                <button
                  onClick={handleCopyCounterNarrative}
                  className="flex items-center gap-1 text-[11px] font-sans font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Draf</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white border border-blue-200 text-xs font-mono text-slate-900 whitespace-pre-wrap leading-relaxed shadow-xs">
                {result.counterNarrativeTemplate}
              </div>
            </div>

            {/* Suggested Hashtags */}
            <div>
              <span className="text-[10px] font-sans font-bold uppercase text-slate-500 block mb-1.5">
                Rekomendasi Tagar Pengimbang (Counter-Tag):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.suggestedHashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-sans font-medium px-2.5 py-1 rounded-lg bg-white text-blue-700 border border-blue-200 shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
