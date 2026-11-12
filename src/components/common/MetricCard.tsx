import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositiveChange?: boolean;
  icon: LucideIcon;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'blue';
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositiveChange,
  icon: Icon,
  variant = 'blue',
  badge,
}) => {
  const iconColors = {
    blue: 'bg-blue-50 text-blue-600',
    cyan: 'bg-sky-50 text-sky-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    purple: 'bg-purple-50 text-purple-600',
  }[variant];

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold font-sans tracking-wider text-slate-500 uppercase truncate">
          {title}
        </span>
        <div className={`p-2 rounded-xl ${iconColors}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2 mt-1">
        <div className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-slate-900">
          {value}
        </div>
        {change && (
          <span
            className={`text-xs font-mono font-bold ${
              isPositiveChange ? 'text-rose-600' : 'text-emerald-600'
            }`}
          >
            {change}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
        <span className="truncate">{subtitle}</span>
        {badge && (
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold uppercase">
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
};
