import { useState } from 'react';
import { SCENARIOS } from './data/scenarios';
import type { Scenario, NarrativePost } from './types';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import type { TabType } from './components/common/Navigation';
import { MetricCard } from './components/common/MetricCard';
import { ThreatLevelBanner } from './components/overview/ThreatLevelBanner';
import { NarrativeVelocityChart } from './components/overview/NarrativeVelocityChart';
import { SentimentPolarityChart } from './components/overview/SentimentPolarityChart';
import { TopNarrativesStream } from './components/overview/TopNarrativesStream';
import { LiveFeedView } from './components/monitor/LiveFeedView';
import { DeepTextAnalyzer } from './components/inspector/DeepTextAnalyzer';
import { BotNetworkRadar } from './components/radar/BotNetworkRadar';
import { RegionalMap } from './components/regional/RegionalMap';
import { AIBriefingAgent } from './components/agent/AIBriefingAgent';
import { NarrativeDetailModal } from './components/monitor/NarrativeDetailModal';
import { BriefingExportModal } from './components/export/BriefingExportModal';
import { formatCompactNumber, formatNumber } from './utils/formatters';
import {
  Activity,
  Bot,
  Flame,
  Network,
} from 'lucide-react';
import { tacticalAudio } from './utils/sound';
import { AnimatePresence, motion } from 'framer-motion';

export function App() {
  const [currentScenario, setCurrentScenario] = useState<Scenario>(SCENARIOS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedNarrative, setSelectedNarrative] = useState<NarrativePost | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const handleScenarioChange = (scenario: Scenario) => {
    setCurrentScenario(scenario);
  };

  const handleMitigateFromBanner = () => {
    tacticalAudio.playTechClick();
    setActiveTab('agent');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white print:bg-white print:min-h-0 print:p-0 print:m-0 print:block">
      {/* Top Header Navbar (Royal Blue) */}
      <div className="print:hidden">
        <Header
          currentScenario={currentScenario}
          scenarios={SCENARIOS}
          onSelectScenario={handleScenarioChange}
          onOpenExportModal={() => setExportModalOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigateTab={(tab) => setActiveTab(tab as TabType)}
        />
      </div>

      {/* Main Container with Sidebar + Main Canvas */}
      <div className="flex-1 flex w-full print:hidden">
        {/* Left Sidebar Navigation */}
        <Navigation
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
          collapsed={sidebarCollapsed}
          onOpenExportModal={() => setExportModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 pb-20 md:pb-8 space-y-6">
          <AnimatePresence mode="wait">
            {/* VIEW 1: DASBOR UTAMA (HOME / OVERVIEW) */}
            {(activeTab === 'home' || activeTab === 'overview') && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="space-y-6"
              >
                {/* Threat Level Banner (Bold Red with White score card) */}
                <ThreatLevelBanner
                  threatLevel={currentScenario.threatLevel}
                  threatIndex={currentScenario.summary.threatIndex}
                  anomalyCount={currentScenario.agentBriefing.anomalyDetected.length}
                  simulatedTime={currentScenario.simulatedTime}
                  onMitigateClick={handleMitigateFromBanner}
                />

                {/* 4 Core Metric Cards (Exact match to reference photo) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="TOTAL VOLUME NARASI"
                    value={formatCompactNumber(currentScenario.summary.totalPosts)}
                    subtitle={`${formatNumber(currentScenario.summary.totalPosts)} unggahan`}
                    change="+18.4%"
                    isPositiveChange={true}
                    icon={Activity}
                    variant="blue"
                    badge="REAL-TIME"
                  />

                  <MetricCard
                    title="KERAPATAN AKUN BOT"
                    value={`${currentScenario.summary.avgBotProbability}%`}
                    subtitle="Estimasi koordinasi inotentik"
                    change={currentScenario.summary.avgBotProbability > 50 ? '+32.1%' : '-4.2%'}
                    isPositiveChange={currentScenario.summary.avgBotProbability > 50}
                    icon={Bot}
                    variant={currentScenario.summary.avgBotProbability > 50 ? 'rose' : 'emerald'}
                    badge="AI SCORER"
                  />

                  <MetricCard
                    title="SENTIMEN PROVOKATIF"
                    value={`${
                      currentScenario.summary.sentimentBreakdown.negatif +
                      currentScenario.summary.sentimentBreakdown.provokatif
                    }%`}
                    subtitle="Polarisasi persepsi publik"
                    change={currentScenario.summary.sentimentBreakdown.provokatif > 20 ? '+45.0%' : '-12.0%'}
                    isPositiveChange={currentScenario.summary.sentimentBreakdown.provokatif > 20}
                    icon={Flame}
                    variant={currentScenario.summary.sentimentBreakdown.provokatif > 20 ? 'amber' : 'cyan'}
                    badge="NLP RADAR"
                  />

                  <MetricCard
                    title="KLASTER ANCAMAN"
                    value={`${currentScenario.clusters.length}`}
                    subtitle="Sindikat amplifikasi terpetakan"
                    icon={Network}
                    variant="purple"
                    badge="TOPOLOGY"
                  />
                </div>

                {/* Dual Charts Row: Narrative Velocity + Sentiment Polarity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <NarrativeVelocityChart threatLevel={currentScenario.threatLevel} />
                  </div>
                  <div>
                    <SentimentPolarityChart
                      sentimentBreakdown={currentScenario.summary.sentimentBreakdown}
                    />
                  </div>
                </div>

                {/* Real-Time Ingestion Feed */}
                <TopNarrativesStream
                  narratives={currentScenario.narratives}
                  onSelectNarrative={(post) => setSelectedNarrative(post)}
                  onViewAllClick={() => setActiveTab('monitor')}
                />
              </motion.div>
            )}

            {/* VIEW 2: PEMANTAUAN NARASI LENGKAP (STREAM) */}
            {activeTab === 'monitor' && (
              <motion.div
                key="tab-monitor"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              >
                <LiveFeedView
                  narratives={currentScenario.narratives}
                  onSelectNarrative={(post) => setSelectedNarrative(post)}
                />
              </motion.div>
            )}

            {/* VIEW 3: SENTIMEN PUBLIK */}
            {activeTab === 'sentiment' && (
              <motion.div
                key="tab-sentiment"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="space-y-6"
              >
                <SentimentPolarityChart
                  sentimentBreakdown={currentScenario.summary.sentimentBreakdown}
                />
                <TopNarrativesStream
                  narratives={currentScenario.narratives}
                  onSelectNarrative={(post) => setSelectedNarrative(post)}
                  onViewAllClick={() => setActiveTab('monitor')}
                />
              </motion.div>
            )}

            {/* VIEW 4: PROVOKATIF & HOAKS (INSPEKTOR DEEP SCANNER) */}
            {activeTab === 'inspector' && (
              <motion.div
                key="tab-inspector"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              >
                <DeepTextAnalyzer />
              </motion.div>
            )}

            {/* VIEW 5: KLASTER & BOT RADAR (TOPOLOGY) */}
            {activeTab === 'radar' && (
              <motion.div
                key="tab-radar"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              >
                <BotNetworkRadar />
              </motion.div>
            )}

            {/* VIEW 6: ANATOMI & PETA WILAYAH (REGIONAL MAP) */}
            {activeTab === 'regional' && (
              <motion.div
                key="tab-regional"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              >
                <RegionalMap />
              </motion.div>
            )}

            {/* VIEW 7: MITIGASI TAKTIS AI (AGENT) */}
            {activeTab === 'agent' && (
              <motion.div
                key="tab-agent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              >
                <AIBriefingAgent scenario={currentScenario} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Narrative Detail Modal */}
      <div className="print:hidden">
        <NarrativeDetailModal
          post={selectedNarrative}
          onClose={() => setSelectedNarrative(null)}
        />
      </div>

      {/* Executive SitRep Briefing Export Modal */}
      <BriefingExportModal
        scenario={currentScenario}
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
}

export default App;
