import React, { useState } from 'react';
import type { Scenario } from '../../types';
import { X, Printer, Download, Check, FileText, Shield, ShieldAlert, Award } from 'lucide-react';
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
    const markdownContent = `# MARKAS BESAR TENTARA NASIONAL INDONESIA
## SATUAN TUGAS OPERASI PERTAHANAN KOGNITIF & INFORMASI SIBER
### LAPORAN SITUASI INTELIJEN KOGNITIF (EXECUTIVE SITREP)

**KLASIFIKASI:** RAHASIA / TINGKAT STRATEGIS  
**NO. DOKUMEN:** SITREP/SONAR-KOGNITIF/2026/XI/${scenario.id.toUpperCase()}  
**WAKTU DIBUAT:** ${formatDateTime()}  
**STATUS ANCAMAN:** ${scenario.threatLevel} (Indeks: ${scenario.summary.threatIndex}/100)  
**SKENARIO AKTIF:** ${scenario.badge} - ${scenario.name}  
**DISTRIBUSI:** PANGLIMA TNI, KEPALA BSSN, ASINTEL KASAD, DITTIPIDSIBER POLRI  

---

## 1. IKHTISAR SITUASI & ANALISIS KOGNITIF EKSEKUTIF
${scenario.agentBriefing.analysisParagraph}

- **Total Volume Narasi:** ${formatNumber(scenario.summary.totalPosts)} unggahan
- **Rata-rata Kerapatan Botnet:** ${scenario.summary.avgBotProbability}%
- **Jumlah Postingan Disinformasi Terdeteksi:** ${formatNumber(scenario.summary.disinfoDetectedCount)}
- **Distribusi Sentimen Publik:**
  - Positif: ${scenario.summary.sentimentBreakdown.positif}%
  - Netral: ${scenario.summary.sentimentBreakdown.netral}%
  - Negatif: ${scenario.summary.sentimentBreakdown.negatif}%
  - Provokatif: ${scenario.summary.sentimentBreakdown.provokatif}%

---

## 2. ANOMALI KOGNITIF & REKAYASA SOSIAL TERKONFIRMASI
${scenario.agentBriefing.anomalyDetected.map((a, i) => `[A-0${i + 1}] ${a}`).join('\n')}

---

## 3. TOPOLOGI KLASTER BOTNET & SEBARAN SIBER
${scenario.clusters
  .map(
    (c, i) => `### [KLASTER 0${i + 1}] ${c.name}
- **Tagar Pantauan:** ${c.hashtag}
- **Estimasi Bot:** ${c.botPercentage}%
- **Volume:** ${formatNumber(c.totalVolume)} unggahan
- **Modus Operasi:** ${c.coreNarrative}
- **Akun Kunci / Amplifikasi:** ${c.keyAmplifiers.join(', ')}
- **Rekomendasi Spesifik:** ${c.recommendedMitigation}
`
  )
  .join('\n')}

---

## 4. DIREKTIF REKOMENDASI TINDAKAN TAKTIS SEGERA
${scenario.agentBriefing.tacticalActions.map((act, i) => `[LANGKAH 0${i + 1}] ${act}`).join('\n')}

---

## 5. DRAF KONTRA-NARASI RESMI SATGAS (READY-TO-RELEASE)
> "${scenario.agentBriefing.counterNarrativeDraft}"

*Instruksi Diseminasi: Rilis melalui kanal resmi juru bicara, media tier-1, serta distribusikan pesan penyejuk kedaerahan.*

---

## 6. OTENTIKASI & PENGESAHAN DOKUMEN
- **ID Verifikasi Digital:** SONAR-AI-2026-X992
- **Hash Integritas Kriptografi:** SHA256: 8f4b9c1d0e2f3a4b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b
- **Status:** TERVERIFIKASI & TERENKRIPSI OLEH ENGINE AI SONAR v2.5

*Ditetapkan di Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}*  
**a.n. Komandan Satuan Tugas Pertahanan Kognitif**  
**Perwira Analis Intelijen Siber**  
KOLONEL INF. (K) RADITYA W., M.Sc. (NRP. 11020048291081)
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

  const getThreatBadgeClass = (threat: string) => {
    switch (threat) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300 print:bg-red-50 print:text-red-900 print:border-red-500';
      case 'HIGH':
        return 'bg-amber-100 text-amber-800 border-amber-300 print:bg-amber-50 print:text-amber-900 print:border-amber-500';
      case 'ELEVATED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 print:bg-yellow-50 print:text-yellow-900 print:border-yellow-500';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 print:bg-emerald-50 print:text-emerald-900 print:border-emerald-500';
    }
  };

  return (
    <div className="sitrep-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 print:p-0 print:bg-white print:static print:block">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="sitrep-modal-content relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:w-full print:rounded-none print:static print:block"
      >
        {/* Modal Topbar (Screen only) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-sans text-slate-900 tracking-tight flex items-center gap-2">
                <span>Ekspor Dokumen Intelijen SitRep</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold">
                  STANDAR A4 RESMI
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Pratinjau Laporan Situasi Eksekutif resmi untuk pimpinan dan jajaran komando satgas.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              tacticalAudio.playTechClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Action Bar (Top Screen Actions) */}
        <div className="px-6 py-3 border-b border-slate-200/80 bg-blue-50/60 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Dokumen telah terenkripsi dan siap dicetak atau disimpan sebagai berkas PDF A4.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF (A4)</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 shadow-2xs cursor-pointer transition-colors"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Tersimpan!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Unduh (.md)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Printable Document Sheet Preview Container */}
        <div className="sitrep-scroll-wrapper p-6 sm:p-10 overflow-y-auto bg-slate-100/60 print:bg-white print:p-0 print:overflow-visible">
          {/* THE REAL PRINTABLE SHEET (Matches standard A4 paper exactly) */}
          <div
            id="sitrep-printable-document"
            className="mx-auto bg-white p-8 sm:p-12 border border-slate-300 shadow-lg rounded-xl max-w-4xl text-slate-900 font-sans print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none print:rounded-none"
          >
            {/* 1. KOP SURAT DINAS RESMI (Military / Intelligence Letterhead) */}
            <div className="border-b-[3px] border-slate-900 pb-2 mb-1 print:border-black">
              <div className="flex items-center justify-between gap-4">
                {/* Left Emblem */}
                <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-2xl bg-slate-900 text-white print:bg-black">
                  <div className="text-center">
                    <ShieldAlert className="w-9 h-9 mx-auto text-blue-400 print:text-white" />
                    <span className="text-[9px] font-mono font-bold tracking-widest block mt-0.5">SONAR</span>
                  </div>
                </div>

                {/* Center Institutional Heading */}
                <div className="text-center flex-1">
                  <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-slate-900 font-sans print:text-black">
                    MARKAS BESAR TENTARA NASIONAL INDONESIA
                  </h2>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-700 mt-0.5 print:text-black">
                    PUSAT OPERASI PERTAHANAN KOGNITIF &amp; SATUAN TUGAS SIBER
                  </h3>
                  <p className="text-[11px] font-sans text-slate-600 mt-1 print:text-gray-800">
                    Gedung B pertahanan Siber, Jl. Medan Merdeka Barat No. 2, Gambir, Jakarta Pusat 10110
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5 print:text-gray-700">
                    Telepon: (021) 345-8890 &bull; Kanal Siber: cert@kamtibnas.tni.mil.id &bull; Frekuensi Data: 442.8 MHz
                  </p>
                </div>

                {/* Right QR / Security Seal */}
                <div className="w-20 shrink-0 text-center hidden sm:block print:block">
                  <div className="w-18 h-18 border-2 border-slate-900 rounded-lg p-1.5 mx-auto flex flex-col items-center justify-center bg-slate-50 print:bg-white print:border-black">
                    <Award className="w-7 h-7 text-slate-800 print:text-black" />
                    <span className="text-[8px] font-mono font-bold text-slate-900 mt-0.5 print:text-black">RESMI</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 block mt-1 print:text-gray-700">OTENTIK</span>
                </div>
              </div>
            </div>

            {/* Inner Thin Rule for Official Letterhead */}
            <div className="border-b border-slate-900 mb-5 print:border-black" />

            {/* 2. SECURITY CLASSIFICATION STAMP & SERIAL NUMBER */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 print:border-gray-300">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono uppercase text-[10px]">Nomor Registrasi:</span>
                  <span className="font-mono font-bold text-slate-900 text-[11px]">
                    SITREP/SONAR-KOGNITIF/2026/XI/{scenario.id.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono uppercase text-[10px]">Waktu Pembuatan:</span>
                  <span className="font-semibold text-slate-800 text-[11px]">{formatDateTime()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono uppercase text-[10px]">Target Distribusi:</span>
                  <span className="font-semibold text-slate-700 text-[11px]">
                    PANGLIMA TNI, KEPALA BSSN, ASINTEL KASAD, DITTIPIDSIBER POLRI
                  </span>
                </div>
              </div>

              {/* Security Classification Box */}
              <div className="border-2 border-red-600 px-3.5 py-1.5 rounded-lg text-center bg-red-50/70 print:bg-white print:border-black">
                <span className="text-[9px] font-mono font-bold tracking-widest text-red-700 uppercase block print:text-black">
                  KLASIFIKASI KEAMANAN:
                </span>
                <span className="text-sm font-black font-sans tracking-wider text-red-600 block print:text-black">
                  RAHASIA / STRATEGIS
                </span>
              </div>
            </div>

            {/* 3. DOCUMENT TITLE */}
            <div className="text-center my-5">
              <h1 className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight text-slate-900 print:text-black">
                LAPORAN SITUASI INTELIJEN KOGNITIF (EXECUTIVE SITREP)
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-blue-700 mt-1 font-sans print:text-black">
                Observasi Dinamika Narasi Ruang Siber Sosial &amp; Rekayasa Disinformasi Terkoordinasi
              </p>
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-800 print:border-gray-400 print:bg-white print:text-black">
                SKENARIO OBSERVASI: {scenario.badge} - {scenario.name}
              </div>
            </div>

            {/* 4. TACTICAL KPI METRICS STRIP (4 Large Balanced Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 print-grid-4 gap-3 my-5 font-sans print-avoid-break">
              <div className={`p-3.5 rounded-xl border text-center ${getThreatBadgeClass(scenario.threatLevel)}`}>
                <span className="text-[10px] uppercase font-bold tracking-wider block">Status Ancaman</span>
                <span className="text-xl sm:text-2xl font-black tracking-tight mt-0.5 block">
                  {scenario.threatLevel}
                </span>
                <span className="text-[10px] font-mono block mt-0.5 opacity-80">Skala Kontinjensi</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-center print:border-gray-400 print:bg-white">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider block">Indeks Ancaman</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight mt-0.5 block print:text-black">
                  {scenario.summary.threatIndex} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Komposit EWS AI</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-center print:border-gray-400 print:bg-white">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider block">Kerapatan Botnet</span>
                <span className="text-xl sm:text-2xl font-black text-blue-700 font-mono tracking-tight mt-0.5 block print:text-black">
                  {scenario.summary.avgBotProbability}%
                </span>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Inotentik Terdeteksi</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-center print:border-gray-400 print:bg-white">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider block">Volume Unggahan</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight mt-0.5 block print:text-black">
                  {formatNumber(scenario.summary.totalPosts)}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Percakapan Terpantau</span>
              </div>
            </div>

            {/* 5. SECTION I: IKHTISAR SITUASI & ANALISIS KOGNITIF */}
            <div className="my-5 print-avoid-break">
              <div className="flex items-center gap-2 pb-1.5 mb-2 border-b-2 border-blue-600 print:border-black">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-mono text-[11px] font-bold flex items-center justify-center print:bg-black">
                  I
                </span>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-sans print:text-black">
                  IKHTISAR SITUASI &amp; ANALISIS KOGNITIF EKSEKUTIF
                </h4>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 leading-relaxed font-sans print:border-gray-400 print:bg-white print:text-black">
                <p>{scenario.agentBriefing.analysisParagraph}</p>
                <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-mono text-slate-700 print:border-gray-300 print:text-black">
                  <span><strong>Disinformasi Terkonfirmasi:</strong> {formatNumber(scenario.summary.disinfoDetectedCount)} unggahan</span>
                  <span><strong>Distribusi Sentimen:</strong> Positif {scenario.summary.sentimentBreakdown.positif}%, Netral {scenario.summary.sentimentBreakdown.netral}%, Negatif {scenario.summary.sentimentBreakdown.negatif}%, Provokatif {scenario.summary.sentimentBreakdown.provokatif}%</span>
                </div>
              </div>
            </div>

            {/* 6. SECTION II: ANOMALI KOGNITIF & INDIKASI REKAYASA SOSIAL */}
            <div className="my-5 print-avoid-break">
              <div className="flex items-center gap-2 pb-1.5 mb-2 border-b-2 border-amber-500 print:border-black">
                <span className="w-5 h-5 rounded-md bg-amber-500 text-white font-mono text-[11px] font-bold flex items-center justify-center print:bg-black">
                  II
                </span>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-sans print:text-black">
                  ANOMALI KOGNITIF &amp; BUKTI MANIPULASI LAPANGAN TERKONFIRMASI
                </h4>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-sans print:text-black">
                {scenario.agentBriefing.anomalyDetected.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/80 print:bg-white print:border-gray-300">
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-900 font-mono text-[10px] font-bold print:bg-gray-200 print:text-black">
                      A-0{idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. SECTION III: TOPOLOGI KLASTER & KORELASI GEOSPASIAL */}
            {scenario.clusters && scenario.clusters.length > 0 && (
              <div className="my-5 print-avoid-break">
                <div className="flex items-center gap-2 pb-1.5 mb-2 border-b-2 border-slate-700 print:border-black">
                  <span className="w-5 h-5 rounded-md bg-slate-700 text-white font-mono text-[11px] font-bold flex items-center justify-center print:bg-black">
                    III
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-sans print:text-black">
                    TOPOLOGI KLASTER BOTNET &amp; AKUN PENGGERAK UTAMA
                  </h4>
                </div>
                
                <div className="overflow-x-auto border border-slate-300 rounded-xl print:border-gray-400">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] print:bg-gray-200 print:text-black">
                      <tr>
                        <th className="p-2.5 border-b border-slate-300">Klaster Sindikat</th>
                        <th className="p-2.5 border-b border-slate-300">Tagar Pantauan</th>
                        <th className="p-2.5 border-b border-slate-300 text-center">Kerapatan Bot</th>
                        <th className="p-2.5 border-b border-slate-300">Akun Inisiator &amp; Amplifikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800 print:text-black">
                      {scenario.clusters.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-slate-900 print:text-black">{c.name}</td>
                          <td className="p-2.5 font-mono text-blue-700 font-semibold print:text-black">{c.hashtag}</td>
                          <td className="p-2.5 text-center font-mono font-bold text-red-600 print:text-black">{c.botPercentage}%</td>
                          <td className="p-2.5 font-mono text-[11px] text-slate-600 print:text-black">{c.keyAmplifiers.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. SECTION IV: DIREKTIF REKOMENDASI TINDAKAN TAKTIS SEGERA */}
            <div className="my-5 print-avoid-break">
              <div className="flex items-center gap-2 pb-1.5 mb-2 border-b-2 border-emerald-600 print:border-black">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-mono text-[11px] font-bold flex items-center justify-center print:bg-black">
                  IV
                </span>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-sans print:text-black">
                  DIREKTIF REKOMENDASI TINDAKAN TAKTIS SEGERA (ACTION PLAN)
                </h4>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-sans print:text-black">
                {scenario.agentBriefing.tacticalActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200/80 print:bg-white print:border-gray-300">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-bold print:bg-black print:text-white">
                      LANGKAH 0{idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. SECTION V: DRAF KONTRA-NARASI SATGAS (READY-TO-RELEASE) */}
            <div className="my-5 print-avoid-break">
              <div className="flex items-center gap-2 pb-1.5 mb-2 border-b-2 border-blue-700 print:border-black">
                <span className="w-5 h-5 rounded-md bg-blue-700 text-white font-mono text-[11px] font-bold flex items-center justify-center print:bg-black">
                  V
                </span>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-sans print:text-black">
                  DRAF KONTRA-NARASI RESMI SATGAS (SIAP RILIS MEDIA)
                </h4>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-blue-50/60 border-l-4 border-blue-600 border-y border-r border-slate-200 font-sans text-xs sm:text-sm text-slate-900 leading-relaxed print:bg-white print:border-gray-400 print:border-l-black print:text-black">
                <div className="italic font-medium">&ldquo;{scenario.agentBriefing.counterNarrativeDraft}&rdquo;</div>
                <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] font-mono text-slate-500 print:border-gray-300 print:text-gray-700">
                  <span>Target Rilis: Juru Bicara Resmi, Media Tier-1 &amp; Grup Warga Kedaerahan</span>
                  <span>Status: VALIDATED BY AI AGENT</span>
                </div>
              </div>
            </div>

            {/* 10. SECTION VI: SIGNATURE BLOCK & DIGITAL AUTHENTICATION SEAL */}
            <div className="mt-8 pt-5 border-t-2 border-slate-900 print:border-black print-avoid-break">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                {/* Left Digital Cryptographic Authentication */}
                <div className="space-y-1.5 text-[10px] font-mono text-slate-600 print:text-gray-800">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px] print:text-black">
                    <Shield className="w-3.5 h-3.5" />
                    <span>OTENTIKASI DIGITAL SISTEM (SHA-256)</span>
                  </div>
                  <div>HASH INTEGRITAS: 8f4b9c1d0e2f3a4b7c6d5e4f3a2b1c0d9e8f7a6b</div>
                  <div>VERIFIKASI SISTEM: SONAR v2.5 AI ENGINE [TERVALIDASI]</div>
                  <div className="text-slate-400 print:text-gray-600">Dokumen sah tanpa tanda tangan basah jika diterbitkan secara digital.</div>
                </div>

                {/* Right Military Command Signature */}
                <div className="text-center sm:text-right font-sans text-xs text-slate-800 print:text-black">
                  <p>Ditetapkan di: Jakarta</p>
                  <p className="font-semibold">Pada tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="mt-2 text-slate-600 font-medium print:text-black">a.n. Komandan Satuan Tugas Pertahanan Kognitif,</p>
                  <p className="text-slate-600 print:text-black">Perwira Menengah Analis Intelijen Siber</p>
                  
                  {/* Digital Signature & Stamp Box */}
                  <div className="my-3 inline-block border border-dashed border-blue-400 bg-blue-50/50 px-4 py-2 rounded-lg text-center print:border-gray-400 print:bg-white">
                    <span className="text-[10px] font-mono text-blue-800 font-bold block print:text-black">[STEMPEL RESMI SATGAS SIBER]</span>
                    <span className="text-[9px] font-mono text-slate-500 block print:text-gray-700">TANDATANGAN ELEKTRONIK TERVERIFIKASI</span>
                  </div>

                  <p className="font-bold text-slate-900 text-sm print:text-black">KOLONEL INF. (K) RADITYA W., M.Sc.</p>
                  <p className="text-[11px] font-mono text-slate-500 print:text-gray-700">NRP. 11020048291081</p>
                </div>
              </div>
            </div>

            {/* Document Footer Note */}
            <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[10px] font-mono text-slate-400 print:border-gray-300 print:text-gray-600">
              DOKUMEN INTELIJEN RUANG SIBER RESMI &bull; KARTIKA CYBER HACTOWN 2026 &bull; HAK CIPTA DILINDUNGI NEGARA
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar (Screen Only) */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <span className="text-xs text-slate-500 font-sans hidden sm:inline">
            Standar Laporan Intelijen Pertahanan Kognitif (Format A4 Resmi)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF (A4)</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 cursor-pointer transition-colors shadow-2xs"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-600" />
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
