import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface NarrativeVelocityChartProps {
  threatLevel: string;
}

export const NarrativeVelocityChart: React.FC<NarrativeVelocityChartProps> = ({
  threatLevel,
}) => {
  const isHigh = threatLevel === 'CRITICAL' || threatLevel === 'HIGH';

  // Smooth monthly / hourly curve matching the photo
  const chartData = [
    { name: 'Jan', organik: 35, bot: isHigh ? 20 : 10 },
    { name: 'Feb', organik: 48, bot: isHigh ? 38 : 12 },
    { name: 'Mar', organik: 42, bot: isHigh ? 50 : 15 },
    { name: 'Mei', organik: 55, bot: isHigh ? 65 : 20 },
    { name: 'Jul', organik: 68, bot: isHigh ? 88 : 25 },
    { name: 'Aep', organik: 52, bot: isHigh ? 72 : 18 },
    { name: 'Okt', organik: 60, bot: isHigh ? 82 : 22 },
    { name: 'Des', organik: 45, bot: isHigh ? 60 : 16 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 25, delay: 0.1 }}
      className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold font-sans text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Pemantauan Narasi &amp; Velositas
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Laju percakapan wajar (organik) vs anomali bot amplifikasi
          </p>
        </div>

        {/* Legend pill matching reference photo */}
        <div className="flex items-center gap-3 text-xs font-mono font-medium">
          <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Organik
          </span>
          <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200/60">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Bot
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLightOrganik" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorLightBot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '12px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                color: '#0f172a',
              }}
            />
            <Area
              type="monotone"
              dataKey="organik"
              name="Volume Organik"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorLightOrganik)"
            />
            <Area
              type="monotone"
              dataKey="bot"
              name="Amplifikasi Bot"
              stroke="#ef4444"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorLightBot)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Ambang Batas Aman: &le; 30% Bot</span>
        <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
          Status: {isHigh ? 'Anomali Terdeteksi' : 'Normal'}
        </span>
      </div>
    </motion.div>
  );
};
