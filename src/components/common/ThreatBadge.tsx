import React from 'react';
import type { ThreatLevel } from '../../types';
import { getThreatInfo } from '../../utils/threatLevels';

interface ThreatBadgeProps {
  level: ThreatLevel;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const ThreatBadge: React.FC<ThreatBadgeProps> = ({
  level,
  size = 'md',
  showPulse = true,
}) => {
  const info = getThreatInfo(level);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs md:text-sm px-2.5 py-1',
    lg: 'text-sm md:text-base px-3.5 py-1.5 font-semibold',
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border ${info.borderColor} ${info.bgColor} ${info.textColor} ${sizeClasses} backdrop-blur-sm shadow-sm transition-all`}
    >
      {showPulse && (
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: info.color }}
          ></span>
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: info.color }}
          ></span>
        </span>
      )}
      <span className="tracking-wide uppercase font-mono font-bold">
        {info.label}
      </span>
    </div>
  );
};
