import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

interface SentimentPolarityChartProps {
  sentimentBreakdown: {
    positif: number;
    netral: number;
    negatif: number;
    provokatif: number;
  };
}

export const SentimentPolarityChart: React.FC<SentimentPolarityChartProps> = ({
  sentimentBreakdown,
}) => {
  // 3 Primary color slices matching the reference image (Merah, Orange, Hijau)
  const data = [
    { name: 'Merah (Provokatif)', value: sentimentBreakdown.provokatif, color: '#e02424' },
    { name: 'Orange (Negatif/Kritis)', value: sentimentBreakdown.negatif + Math.floor(sentimentBreakdown.netral / 2), color: '#f97316' },
    { name: 'Hijau (Positif/Aman)', value: sentimentBreakdown.positif + Math.ceil(sentimentBreakdown.netral / 2), color: '#10b981' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 25, delay: 0.15 }}
      className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold font-sans text-slate-900 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          Distribusi Sentimen &amp; Polarisasi Kognitif
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 py-2">
        {/* Donut Chart */}
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: '#0f172a',
                }}
                formatter={(val) => [`${val}%`, 'Proporsi']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-sans uppercase font-bold text-slate-400">Dominan</span>
            <span className="text-sm font-black font-sans text-slate-900">
              {sentimentBreakdown.provokatif > 30 ? 'Merah' : 'Hijau'}
            </span>
          </div>
        </div>

        {/* Legend Box matching reference photo (Merah, Orange, Hijau) */}
        <div className="space-y-3 font-sans">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#e02424] shrink-0"></span>
            <span className="text-slate-700 font-medium">Merah (Provokatif)</span>
            <span className="ml-auto font-mono font-bold text-[#e02424]">
              {sentimentBreakdown.provokatif}%
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#f97316] shrink-0"></span>
            <span className="text-slate-700 font-medium">Orange (Kritis)</span>
            <span className="ml-auto font-mono font-bold text-[#f97316]">
              {data[1].value}%
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#10b981] shrink-0"></span>
            <span className="text-slate-700 font-medium">Hijau (Aman/Positif)</span>
            <span className="ml-auto font-mono font-bold text-[#10b981]">
              {data[2].value}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Tingkat Polarisasi:</span>
        <span className="font-bold text-slate-800">
          {sentimentBreakdown.provokatif > 30 ? 'Tinggi (Ekstrem)' : 'Normal Moderat'}
        </span>
      </div>
    </motion.div>
  );
};
