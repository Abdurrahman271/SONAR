import React from 'react';
import type { PlatformType } from '../../types';
import { MessageSquare, Video, Send, Globe, Share2 } from 'lucide-react';

interface PlatformBadgeProps {
  platform: PlatformType;
  showLabel?: boolean;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  showLabel = true,
}) => {
  const configs: Record<
    PlatformType,
    { label: string; icon: React.FC<{ className?: string }>; bg: string; text: string; border: string }
  > = {
    x: {
      label: 'X (Twitter)',
      icon: MessageSquare,
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200',
    },
    tiktok: {
      label: 'TikTok',
      icon: Video,
      bg: 'bg-pink-50',
      text: 'text-pink-700',
      border: 'border-pink-200',
    },
    telegram: {
      label: 'Telegram',
      icon: Send,
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    facebook: {
      label: 'Facebook',
      icon: Share2,
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
    },
    news: {
      label: 'Media Berita',
      icon: Globe,
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
  };

  const c = configs[platform] || configs.x;
  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-sans font-medium border ${c.bg} ${c.text} ${c.border}`}
    >
      <Icon className="w-3 h-3" />
      {showLabel && <span>{c.label}</span>}
    </span>
  );
};
