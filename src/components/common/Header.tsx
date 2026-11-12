import React, { useState, useEffect } from 'react';
import {
  Radio,
  Volume2,
  VolumeX,
  Bell,
  Settings,
  Menu,
  X,
  Play,
  FileText,
  User,
} from 'lucide-react';
import type { Scenario } from '../../types';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';
import { NotificationModal } from './NotificationModal';
import type { SystemNotification } from './NotificationModal';

interface HeaderProps {
  currentScenario: Scenario;
  scenarios: Scenario[];
  onSelectScenario: (scenario: Scenario) => void;
  onOpenExportModal: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScenario,
  scenarios,
  onSelectScenario,
  onOpenExportModal,
  mobileMenuOpen,
  onToggleMobileMenu,
  sidebarCollapsed: _sidebarCollapsed,
  onToggleSidebar,
  onNavigateTab,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(tacticalAudio.getIsMuted());
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: 'notif-1',
      title: 'Darurat Kognitif Aktif',
      message: 'Indeks ancaman mencapai 92. Sindikat botnet terkoordinasi terdeteksi melancarkan kampanye terencana.',
      timestamp: 'Baru saja',
      category: 'CRITICAL',
      read: false,
      actionTab: 'overview',
    },
    {
      id: 'notif-2',
      title: 'Anomali Kecepatan Akun Botnet',
      message: 'Akun @arif_patriot99_id menunjukkan frekuensi semburan 142 unggahan/jam dan hashtag stuffing.',
      timestamp: '2 mnt lalu',
      category: 'BOT',
      read: false,
      actionTab: 'radar',
    },
    {
      id: 'notif-3',
      title: 'Executive SitRep Satgas Diperbarui',
      message: 'AI Cognitive Shield Agent merumuskan rekomendasi direktif respon cepat dan draf rilis klarifikasi.',
      timestamp: '6 mnt lalu',
      category: 'SITREP',
      read: false,
      actionTab: 'agent',
    },
    {
      id: 'notif-4',
      title: 'Hotspot Wilayah Strategis Terdeteksi',
      message: 'Konsentrasi narasi provokatif melonjak tajam di klaster DKI Jakarta (91) dan Jawa Barat (79).',
      timestamp: '11 mnt lalu',
      category: 'GEO',
      read: false,
      actionTab: 'regional',
    },
    {
      id: 'notif-5',
      title: 'Taktik Fear-Mongering Terkonfirmasi',
      message: 'Analisis NLP mengonfirmasi penggunaan pola sintaksis histeria kepanikan publik di 5 kanal sosial.',
      timestamp: '18 mnt lalu',
      category: 'CRITICAL',
      read: false,
      actionTab: 'inspector',
    },
    {
      id: 'notif-6',
      title: 'Infiltrasi Cross-Platform Bridge Terdeteksi',
      message: 'Akun @broadcast_warga_id menyalurkan tangkapan layar rekayasa dari grup privat ke linimasa publik.',
      timestamp: '25 mnt lalu',
      category: 'BOT',
      read: true,
      actionTab: 'radar',
    },
  ]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formatted + ' WIB');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    tacticalAudio.setMuted(next);
    if (!next) {
      tacticalAudio.playTechClick();
    }
  };

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = scenarios.find((s) => s.id === e.target.value);
    if (found) {
      tacticalAudio.playSonarPing();
      onSelectScenario(found);
    }
  };

  const handleBellClick = () => {
    tacticalAudio.playSonarPing();
    setNotifOpen(!notifOpen);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: SystemNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    if (notif.actionTab && onNavigateTab) {
      onNavigateTab(notif.actionTab);
    }
    setNotifOpen(false);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1a56db] text-white shadow-md border-b border-blue-700/50">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left Side: Brand, Logo, Version, Status Pill */}
          <div className="flex items-center gap-3">
            {/* Toggle Sidebar Button for Desktop/Tablet */}
            <button
              onClick={() => {
                tacticalAudio.playTechClick();
                onToggleSidebar();
              }}
              className="hidden md:flex p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-blue-600/60 transition-colors"
              title="Sembunyikan/Tampilkan Navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo with Sonar circular mark */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white text-[#1a56db] shadow-sm">
                <Radio className="w-5 h-5 animate-pulse" />
                <span className="absolute -inset-0.5 rounded-xl border border-white/40 animate-ping pointer-events-none" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-wide font-sans text-white">
                    SONAR
                  </span>
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-700/90 text-blue-100 border border-blue-400/30">
                    v2.5
                  </span>
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-500 text-white shadow-sm">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-blue-100/90 hidden sm:block tracking-tight font-sans -mt-0.5">
                  Sistem Observasi Narasi &amp; Analisis Reaksi
                </p>
              </div>
            </div>

            {/* Online Engine Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden xl:flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-400/30 text-xs font-mono font-medium text-emerald-300 shadow-inner"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>ENGINE ONLINE</span>
            </motion.div>
          </div>

          {/* Right Side Actions: Scenario Selector, Sound, Notifications, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Scenario Selector */}
            <div className="flex items-center gap-1.5 bg-blue-700/70 border border-blue-400/40 rounded-xl px-2.5 py-1.5 text-white shadow-sm">
              <Play className="w-3.5 h-3.5 text-blue-200 hidden sm:block" />
              <label htmlFor="scenario-select" className="text-[11px] font-mono text-blue-200 hidden lg:block">
                SKENARIO:
              </label>
              <select
                id="scenario-select"
                value={currentScenario.id}
                onChange={handleScenarioChange}
                className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer max-w-[140px] sm:max-w-[220px] truncate"
              >
                {scenarios.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                    {s.badge} - {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Audio Sound Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? 'Aktifkan Audio Taktis' : 'Mute Audio'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isMuted
                  ? 'bg-blue-700/40 text-blue-200 border-blue-400/30 hover:bg-blue-700'
                  : 'bg-white text-blue-700 border-white hover:bg-blue-50 shadow-sm'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Ekspor SitRep Button */}
            <button
              onClick={() => {
                tacticalAudio.playTechClick();
                onOpenExportModal();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white text-[#1a56db] hover:bg-blue-50 shadow-sm transition-all cursor-pointer font-sans"
            >
              <FileText className="w-3.5 h-3.5 text-[#1a56db]" />
              <span>Ekspor SitRep</span>
            </button>

            {/* Notification Bell with Badge (Interactive) */}
            <button
              onClick={handleBellClick}
              title="Buka Notifikasi Sistem"
              className={`relative cursor-pointer p-2 rounded-xl transition-all ${
                notifOpen
                  ? 'bg-white text-[#1a56db] shadow-sm'
                  : 'text-blue-100 hover:text-white hover:bg-blue-700/60'
              }`}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold font-mono shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Settings Icon */}
            <button
              onClick={() => {
                tacticalAudio.playTechClick();
                alert('Panel Konfigurasi Parameter EWS & API Ingestion Aktif');
              }}
              title="Pengaturan Parameter Sistem"
              className="hidden sm:flex p-2 rounded-xl text-blue-100 hover:text-white hover:bg-blue-700/60 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-1 border-l border-blue-400/40">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-blue-100 hidden md:inline">
                {currentTime.split(' ')[0]}
              </span>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-xl bg-blue-700/80 text-white border border-blue-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Notification Dropdown Modal */}
      <NotificationModal
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onNotificationClick={handleNotificationClick}
      />
    </>
  );
};
