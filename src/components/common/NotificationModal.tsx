import React from 'react';
import {
  Bell,
  X,
  AlertTriangle,
  Bot,
  FileText,
  MapPin,
  CheckCheck,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tacticalAudio } from '../../utils/sound';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'CRITICAL' | 'BOT' | 'SITREP' | 'GEO';
  read: boolean;
  actionTab?: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotification[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: SystemNotification) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const [filter, setFilter] = React.useState<'ALL' | 'UNREAD' | 'CRITICAL'>('ALL');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filter === 'UNREAD') return !n.read;
    if (filter === 'CRITICAL') return n.category === 'CRITICAL';
    return true;
  });

  const getCategoryBadge = (cat: SystemNotification['category']) => {
    switch (cat) {
      case 'CRITICAL':
        return {
          icon: AlertTriangle,
          bg: 'bg-red-50 text-red-700 border-red-200',
          dot: 'bg-red-500',
          label: 'DARURAT',
        };
      case 'BOT':
        return {
          icon: Bot,
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-500',
          label: 'ANOMALI BOT',
        };
      case 'SITREP':
        return {
          icon: FileText,
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: 'AI SITREP',
        };
      case 'GEO':
        return {
          icon: MapPin,
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'GEOSPASIAL',
        };
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-6 bg-slate-900/30 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] mt-12 sm:mt-14 mr-0 sm:mr-4 font-sans text-slate-800"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#1a56db] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight">Pemberitahuan Sistem</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold font-mono">
                      {unreadCount} Baru
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-blue-100 font-sans">
                  Pusat telemetri ancaman siber &amp; notifikasi taktis
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                tacticalAudio.playTechClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-blue-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Bar & Filter Pills */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {(['ALL', 'UNREAD', 'CRITICAL'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    tacticalAudio.playTechClick();
                    setFilter(mode);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    filter === mode
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mode === 'ALL' ? 'Semua' : mode === 'UNREAD' ? 'Belum Dibaca' : 'Darurat'}
                </button>
              ))}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={() => {
                  tacticalAudio.playTechClick();
                  onMarkAllAsRead();
                }}
                className="flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Tandai Dibaca</span>
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-medium">Tidak ada notifikasi aktif</p>
              </div>
            ) : (
              filtered.map((item) => {
                const badge = getCategoryBadge(item.category);
                const IconComponent = badge.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      tacticalAudio.playTechClick();
                      onNotificationClick(item);
                    }}
                    className={`p-3 rounded-xl transition-all cursor-pointer flex gap-3 ${
                      item.read
                        ? 'bg-white hover:bg-slate-50 opacity-80'
                        : 'bg-blue-50/50 hover:bg-blue-50/80 border border-blue-200/60 shadow-xs'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${badge.bg}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.timestamp}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                        {item.message}
                      </p>

                      {item.actionTab && (
                        <div className="flex items-center gap-1 mt-2 text-[10px] font-semibold text-blue-600 hover:underline">
                          <span>Buka Detail Solusi</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 self-center" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Status */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>SONAR Telemetry v2.5</span>
            <span className="text-emerald-600 font-semibold">● Live Engine Feed</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

