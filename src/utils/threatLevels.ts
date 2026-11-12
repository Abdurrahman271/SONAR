import type { ThreatInfo, ThreatLevel } from '../types';

export const THREAT_LEVEL_MAP: Record<ThreatLevel, ThreatInfo> = {
  LOW: {
    level: 'LOW',
    code: 1,
    label: 'LEVEL 1: NORMAL',
    color: '#10b981', // emerald-500
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/30',
    textColor: 'text-emerald-400',
    description: 'Ruang siber sosial dalam ambang batas normal. Tidak ada operasi kognitif terorganisir yang terdeteksi.',
  },
  GUARDED: {
    level: 'GUARDED',
    code: 2,
    label: 'LEVEL 2: MONITORING',
    color: '#06b6d4', // cyan-500
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-950/30',
    textColor: 'text-cyan-400',
    description: 'Aktivitas percakapan meningkat moderat. Pola percakapan masih didominasi akun organik.',
  },
  ELEVATED: {
    level: 'ELEVATED',
    code: 2,
    label: 'LEVEL 3: WASPADA',
    color: '#eab308', // yellow-500
    borderColor: 'border-yellow-500/40',
    bgColor: 'bg-yellow-950/30',
    textColor: 'text-yellow-400',
    description: 'Terdeteksi anomali kecepatan (velocity spike) dan penggunaan hashtag repetitif oleh klaster akun baru.',
  },
  HIGH: {
    level: 'HIGH',
    code: 3,
    label: 'LEVEL 4: SIAGA',
    color: '#f97316', // orange-500
    borderColor: 'border-orange-500/40',
    bgColor: 'bg-orange-950/30',
    textColor: 'text-orange-400',
    description: 'Operasi amplifikasi terkoordinasi aktif. Sentimen negatif/provokatif meningkat tajam disertai narasi manipulatif.',
  },
  CRITICAL: {
    level: 'CRITICAL',
    code: 4,
    label: 'LEVEL 5: KRITIS / DARURAT',
    color: '#ef4444', // red-500
    borderColor: 'border-red-500/50',
    bgColor: 'bg-red-950/40',
    textColor: 'text-red-400',
    description: 'SERANGAN KOGNITIF MASIF TERKOORDINASI. Tingkat bot > 60%, penyebaran hoaks berbahaya berpotensi menimbulkan disrupsi nyata.',
  },
};

export const getThreatInfo = (level: ThreatLevel): ThreatInfo => {
  return THREAT_LEVEL_MAP[level] || THREAT_LEVEL_MAP.LOW;
};
