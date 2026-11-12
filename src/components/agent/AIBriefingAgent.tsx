import React, { useState } from 'react';
import type { Scenario } from '../../types';
import {
  Bot,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Zap,
  SlidersHorizontal,
} from 'lucide-react';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';

interface AIBriefingAgentProps {
  scenario: Scenario;
}

export const AIBriefingAgent: React.FC<AIBriefingAgentProps> = ({ scenario }) => {
  const [tone, setTone] = useState<'authoritative' | 'educational' | 'calming'>('authoritative');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const getCustomizedCounterNarrative = () => {
    const base = scenario.agentBriefing.counterNarrativeDraft;
    if (tone === 'educational') {
      return base.replace(
        '[PERINGATAN SIBER RESMI - SATGAS KOGNITIF]',
        '[EDUKASI LITERASI DIGITAL SIBER - MARI CERDAS BERMEDSOS]'
      ) + '\n\nTips Verifikasi Cepat:\n1. Cek portal resmi ojk.go.id & bi.go.id\n2. Jangan teruskan pesan yang memakai kata "viralkan sebelum dihapus"\n3. Laporkan konten mencurigakan ke aduankonten.id';
    }
    if (tone === 'calming') {
      return base.replace(
        '[PERINGATAN SIBER RESMI - SATGAS KOGNITIF]',
        '[PESAN PENYEJUK & KLARIFIKASI DAMAI KEBANGSAAN]'
      ) + '\n\nMasyarakat diimbau tetap tenang dan menjalankan aktivitas harian seperti biasa. Kondisi stabilitas nasional sepenuhnya terjaga.';
    }
    return base;
  };

  const handleCopy = () => {
    tacticalAudio.playTechClick();
    navigator.clipboard.writeText(getCustomizedCounterNarrative());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    tacticalAudio.playScanBeep();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      tacticalAudio.playSonarPing();
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner (Enterprise High-Contrast Style) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-md">
              <Bot className="w-7 h-7" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 tracking-tight">
                  AGEN INTELIJEN SATGAS KOGNITIF (AI SENTINEL)
                </h3>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  AUTONOMOUS ANALYST
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                Agen AI mandiri yang secara kontinu mengekstrak anomali bahasa, mendeteksi pola manipulasi kognitif, dan merumuskan langkah kontramediasi untuk pengambil keputusan.
              </p>
            </div>
          </div>

          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-sans font-bold transition-all cursor-pointer shadow-2xs self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Menganalisis...' : 'Refresh Analisis'}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Grid: SitRep vs Tactical Mitigations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Executive SitRep & Detected Anomalies */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase">
              <Zap className="w-4 h-4" />
              <span>LAPORAN SITUASI NARASI (SITREP EKSEKUTIF)</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-sans">
              {scenario.agentBriefing.headline}
            </h4>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
            {scenario.agentBriefing.analysisParagraph}
          </div>

          {/* Anomaly Detection Bullet Points */}
          <div>
            <h5 className="text-xs font-sans font-bold uppercase text-slate-500 mb-2.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Indikator Anomali Kognitif Terkonfirmasi:
            </h5>
            <div className="space-y-2">
              {scenario.agentBriefing.anomalyDetected.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5"
                >
                  <span className="font-mono font-bold text-amber-700 mt-0.5">0{idx + 1}.</span>
                  <span className="leading-relaxed font-sans">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Tactical Actions & Counter-Narrative Composer */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
          <div>
            <h5 className="text-xs font-sans font-bold uppercase text-blue-700 mb-2.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              Direktif Tindakan Taktis Segera (Satgas Response):
            </h5>
            <div className="space-y-2">
              {scenario.agentBriefing.tacticalActions.map((action, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-sans">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Counter Narrative Composer */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-sans font-bold text-slate-600 uppercase">
                  Tone Kontra-Narasi:
                </span>
              </div>

              {/* Tone Switcher Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => {
                    tacticalAudio.playTechClick();
                    setTone('authoritative');
                  }}
                  className={`text-[11px] font-sans px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                    tone === 'authoritative'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tegas / Otoritatif
                </button>
                <button
                  onClick={() => {
                    tacticalAudio.playTechClick();
                    setTone('educational');
                  }}
                  className={`text-[11px] font-sans px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                    tone === 'educational'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Edukatif Literasi
                </button>
                <button
                  onClick={() => {
                    tacticalAudio.playTechClick();
                    setTone('calming');
                  }}
                  className={`text-[11px] font-sans px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                    tone === 'calming'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Menenangkan
                </button>
              </div>
            </div>

            {/* Generated Narrative Box */}
            <div className="relative">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 whitespace-pre-wrap leading-relaxed shadow-inner">
                {getCustomizedCounterNarrative()}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCopy}
                className="mt-3 w-full py-2.5 rounded-xl bg-[#1a56db] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Kontra-Narasi Berhasil Disalin ke Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Pesan untuk Rilis Humas / Media Sosial</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
