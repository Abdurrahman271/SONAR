import React from 'react';
import {
  Home,
  LayoutDashboard,
  Radio,
  HeartHandshake,
  AlertTriangle,
  Network,
  MapPin,
  Bot,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';

export type TabType =
  | 'home'
  | 'overview'
  | 'monitor'
  | 'sentiment'
  | 'inspector'
  | 'radar'
  | 'regional'
  | 'agent';

interface NavigationProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  collapsed: boolean;
  onOpenExportModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onChangeTab,
  mobileMenuOpen,
  onCloseMobileMenu,
  collapsed,
  onOpenExportModal,
}) => {
  const navItems = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Home,
      badge: '',
    },
    {
      id: 'overview' as TabType,
      label: 'Dasbor Utama',
      icon: LayoutDashboard,
      badge: 'LIVE',
    },
    {
      id: 'monitor' as TabType,
      label: 'Pemantauan Narasi',
      icon: Radio,
      badge: 'STREAM',
    },
    {
      id: 'sentiment' as TabType,
      label: 'Sentimen Publik',
      icon: HeartHandshake,
      badge: 'NLP',
    },
    {
      id: 'inspector' as TabType,
      label: 'Provokatif & Hoaks',
      icon: AlertTriangle,
      badge: 'DETEKTOR',
    },
    {
      id: 'radar' as TabType,
      label: 'Klaster & Bot Radar',
      icon: Network,
      badge: 'NODES',
    },
    {
      id: 'regional' as TabType,
      label: 'Anatomi & Peta Wilayah',
      icon: MapPin,
      badge: 'PETA RI',
    },
    {
      id: 'agent' as TabType,
      label: 'Mitigasi Taktis AI',
      icon: Bot,
      badge: 'SATGAS',
    },
  ];

  const handleTabClick = (tabId: TabType) => {
    tacticalAudio.playTechClick();
    onChangeTab(tabId);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between shrink-0 bg-white border-r border-slate-200 transition-all duration-300 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            {!collapsed && 'MENU INTELIJEN'}
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer group ${
                    isActive
                      ? 'text-blue-700 font-semibold bg-blue-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {/* Active highlight pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      className="absolute inset-0 bg-blue-50 rounded-xl border border-blue-200/60 shadow-xs pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <Icon
                    className={`relative z-10 w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />

                  {!collapsed && (
                    <span className="relative z-10 truncate font-sans text-left flex-1">
                      {item.label}
                    </span>
                  )}

                  {!collapsed && item.badge && (
                    <span
                      className={`relative z-10 text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 space-y-2">
          {!collapsed && (
            <button
              onClick={() => {
                tacticalAudio.playTechClick();
                onOpenExportModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-sans text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Ekspor Laporan SitRep</span>
            </button>
          )}

          <div
            className={`flex items-center ${
              collapsed ? 'justify-center' : 'justify-between px-2'
            } text-xs text-slate-400 font-sans`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              {!collapsed && <span>Basis Pengetahuan</span>}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (When hamburger menu is open) */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-16 z-50 bg-white md:hidden p-4 overflow-y-auto space-y-2 shadow-2xl"
        >
          <div className="px-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            MODUL OPERASI COGNITIVE SIBER
          </div>
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Mobile Bottom Quick Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 md:hidden py-1.5 px-3 flex justify-around items-center shadow-lg">
        {navItems.slice(1, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
        <button
          onClick={() => handleTabClick('inspector')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            activeTab === 'inspector' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <AlertTriangle className="w-5 h-5 mb-0.5" />
          <span>Detektor</span>
        </button>
        <button
          onClick={() => handleTabClick('agent')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            activeTab === 'agent' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5" />
          <span>Mitigasi</span>
        </button>
      </div>
    </>
  );
};
