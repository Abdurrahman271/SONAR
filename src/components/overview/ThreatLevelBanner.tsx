import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import type { ThreatLevel } from '../../types';
import { motion } from 'framer-motion';

interface ThreatLevelBannerProps {
  threatLevel: ThreatLevel;
  threatIndex: number;
  anomalyCount: number;
  simulatedTime: string;
  onMitigateClick: () => void;
}

export const ThreatLevelBanner: React.FC<ThreatLevelBannerProps> = ({
  threatLevel,
  threatIndex,
  onMitigateClick,
}) => {
  const isHighOrCritical = threatLevel === 'CRITICAL' || threatLevel === 'HIGH';
  const isElevated = threatLevel === 'ELEVATED';

  // Dynamic theme colors matching high contrast specifications
  let bannerBg = 'bg-[#e02424] text-white'; // Bold Red as in reference photo
  let iconComponent = <AlertTriangle className="w-6 h-6 text-white" />;
  let headline = 'DARURAT KOGNITIF: Operasi Disinformasi Terkoordinasi Aktif';
  let scoreColor = 'text-[#e02424]';

  if (threatLevel === 'HIGH') {
    bannerBg = 'bg-orange-600 text-white';
    iconComponent = <ShieldAlert className="w-6 h-6 text-white" />;
    headline = 'SIAGA SATGAS: Peningkatan Anomali Narasi & Botnet Terdeteksi';
    scoreColor = 'text-orange-600';
  } else if (isElevated) {
    bannerBg = 'bg-amber-500 text-white';
    iconComponent = <AlertTriangle className="w-6 h-6 text-white" />;
    headline = 'WASPADA: Lonjakan Polaritas Percakapan di Kanal Sosial';
    scoreColor = 'text-amber-600';
  } else if (threatLevel === 'LOW') {
    bannerBg = 'bg-emerald-600 text-white';
    iconComponent = <CheckCircle2 className="w-6 h-6 text-white" />;
    headline = 'SITUASI KONDUSIF: Aktivitas Narasi Ruang Siber Normal';
    scoreColor = 'text-emerald-600';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 25 }}
      className={`relative overflow-hidden rounded-2xl ${bannerBg} p-5 sm:p-6 shadow-md transition-all`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Alert Icon + Headline */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 shrink-0 shadow-xs">
            {iconComponent}
            {isHighOrCritical && (
              <span className="absolute -inset-1 rounded-xl border border-white/40 animate-ping pointer-events-none" />
            )}
          </div>

          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/80">
              SISTEM PERINGATAN DINI (EWS KOGNITIF)
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight font-sans text-white">
              {headline}
            </h2>
          </div>
        </div>

        {/* Right Side: Score Box & Mitigasi Button */}
        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          {/* White Card Box for Threat Index (Exact match to reference photo) */}
          <div className="bg-white rounded-xl px-4 py-2.5 text-center shadow-xs border border-white/40 min-w-[100px]">
            <div className={`text-2xl sm:text-3xl font-black font-sans leading-none ${scoreColor}`}>
              {threatIndex}
            </div>
            <div className="text-[10px] font-bold font-sans text-slate-500 uppercase tracking-tight mt-0.5">
              Indeks Ancaman
            </div>
          </div>

          {/* Mitigasi AI Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onMitigateClick}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-[#e02424] hover:bg-slate-100 font-bold text-xs sm:text-sm font-sans shadow-sm transition-colors cursor-pointer"
          >
            <span>Mitigasi AI</span>
            <ArrowRight className="w-4 h-4 text-[#e02424]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
