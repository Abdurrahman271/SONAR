import React, { useState } from 'react';
import type { Scenario } from '../../types';
import { X, Printer, Download, Check, FileText } from 'lucide-react';
import { formatDateTime, formatNumber } from '../../utils/formatters';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';

interface BriefingExportModalProps {
  scenario: Scenario;
  isOpen: boolean;
  onClose: () => void;
}

export const BriefingExportModal: React.FC<BriefingExportModalProps> = ({
  scenario,
  isOpen,
  onClose,
}) => {
  const [downloaded, setDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    tacticalAudio.playTechClick();
    window.print();
  };

  const handleDownloadMarkdown = () => {
    tacticalAudio.playTechClick();
    const markdownContent = `# LAPORAN INTELIJEN RUANG SIBER SOSIAL (COGNITIVE SITREP)
**SISTEM:** SONAR (Sistem Observasi Narasi & Analisis Reaksi)  
**KLASIFIKASI:** TERBATAS / TINGKAT STRATEGIS  
**TANGGAL & WAKTU:** ${formatDateTime()}  
**STATUS ANCAMAN:** ${scenario.threatLevel} (Indeks: ${scenario.summary.threatIndex}/100)  
**SKENARIO AKTIF:** ${scenario.name}  

---

## 1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)
${scenario.agentBriefing.analysisParagraph}

- **Total Volume Narasi:** ${formatNumber(scenario.summary.totalPosts)} unggahan
- **Rata-rata Probabilitas Bot:** ${scenario.summary.avgBotProbability}%
- **Jumlah Postingan Disinformasi Terdeteksi:** ${formatNumber(scenario.summary.disinfoDetectedCount)}
- **Distribusi Sentimen:**
  - Positif: ${scenario.summary.sentimentBreakdown.positif}%
  - Netral: ${scenario.summary.sentimentBreakdown.netral}%
  - Negatif: ${scenario.summary.sentimentBreakdown.negatif}%
  - Provokatif: ${scenario.summary.sentimentBreakdown.provokatif}%

---

## 2. ANOMALI KOGNITIF & REKAYASA SOSIAL TERIDENTIFIKASI
${scenario.agentBriefing.anomalyDetected.map((a, i) => `${i + 1}. ${a}`).join('\n')}

---

## 3. TOPOLOGI KLASTER BOTNET & AKUN PENGGERAK UTAMA
${scenario.clusters
  .map(
    (c) => `### Klaster: ${c.name}
- Tagar Utama: ${c.hashtag}
- Estimasi Bot: ${c.botPercentage}%
- Volume: ${formatNumber(c.totalVolume)}
- Modus: ${c.coreNarrative}
- Akun Amplifikasi: ${c.keyAmplifiers.join(', ')}
- Mitigasi Khusus: ${c.recommendedMitigation}
`
  )
  .join('\n')}

---

## 4. MATRIKS DIREKTIF TINDAKAN SATGAS (ACTION PLAN)
${scenario.agentBriefing.tacticalActions.map((act, i) => `[LANGKAH 0${i + 1}] ${act}`).join('\n')}

### Draf Kontra-Narasi Satgas:
\`\`\`
${scenario.agentBriefing.counterNarrativeDraft}
\`\`\`

---
*Dokumen ini dibuat otomatis oleh Sistem AI SONAR untuk mempercepat respon taktis ruang siber pertahanan kognitif.*
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SONAR_SITREP_${scenario.id}_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150 print:p-0 print:bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[92vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:w-full"
      >
        {/* Modal Topbar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm sm:text-base font-bold font-sans text-slate-900 uppercase tracking-wide">
              Ekspor Dokumen Intelijen SitRep (Executive Briefing)
            </h3>
          </div>
          <button
            onClick={() => {
              tacticalAudio.playTechClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Document Sheet Preview */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-sm print:text-black print:p-0">
          {/* Document Header */}
          <div className="border-b-2 border-blue-600 pb-4 text-center sm:text-left print:border-black">
            <div className="text-[11px] font-mono tracking-widest text-blue-600 uppercase font-bold print:text-black">
              PUSAT OPERASI PERTAHANAN KOGNITIF &bull; SATGAS SIBER
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-1 print:text-black">
              SONAR: EXECUTIVE COGNITIVE SITUATION REPORT
            </h1>
            <div className="flex flex-wrap items-center justify-between text-xs font-sans text-slate-500 mt-2 print:text-gray-700">
              <span>WAKTU DIBUAT: {formatDateTime()}</span>
              <span>SKENARIO: {scenario.badge} - {scenario.name}</span>
            </div>
          </div>

          {/* Threat Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-gray-300 print:bg-gray-100">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Status Ancaman</span>
              <strong className="text-base text-red-600 font-extrabold print:text-black">
                {scenario.threatLevel}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-gray-300 print:bg-gray-100">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Indeks Ancaman</span>
              <strong className="text-base text-amber-600 font-extrabold print:text-black">
                {scenario.summary.threatIndex} / 100
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-gray-300 print:bg-gray-100">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Kerapatan Botnet</span>
              <strong className="text-base text-blue-600 font-extrabold print:text-black">
                {scenario.summary.avgBotProbability}%
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-gray-300 print:bg-gray-100">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Unggahan Terpantau</span>
              <strong className="text-base text-slate-900 font-extrabold print:text-black">
                {formatNumber(scenario.summary.totalPosts)}
              </strong>
            </div>
          </div>

          {/* Section 1: Executive Briefing */}
          <div>
            <h4 className="text-xs font-sans uppercase text-blue-700 font-bold tracking-wider mb-2 print:text-black">
              1. IKHTISAR SITUASI EKSEKUTIF
            </h4>
            <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans print:border-gray-300 print:bg-gray-50 print:text-black">
              {scenario.agentBriefing.analysisParagraph}
            </p>
          </div>

          {/* Section 2: Anomalies */}
          <div>
            <h4 className="text-xs font-sans uppercase text-amber-700 font-bold tracking-wider mb-2 print:text-black">
              2. ANOMALI TERKONFIRMASI
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 font-sans print:text-black">
              {scenario.agentBriefing.anomalyDetected.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 font-bold print:text-black">&bull;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Recommended Actions */}
          <div>
            <h4 className="text-xs font-sans uppercase text-emerald-700 font-bold tracking-wider mb-2 print:text-black">
              3. REKOMENDASI TINDAKAN TAKTIS SEGERA
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 font-sans print:text-black">
              {scenario.agentBriefing.tacticalActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-emerald-600 font-bold print:text-black">[0{idx + 1}]</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Counter Narrative Draft */}
          <div>
            <h4 className="text-xs font-sans uppercase text-slate-500 font-bold tracking-wider mb-2 print:text-black">
              4. DRAF KONTRA-NARASI SATGAS
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed print:border-gray-300 print:bg-gray-50 print:text-black">
              {scenario.agentBriefing.counterNarrativeDraft}
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <span className="text-xs text-slate-500 font-sans hidden sm:inline">
            Standar Laporan Intelijen Pertahanan Kognitif
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4 text-blue-600" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Unduh Markdown (.md)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
