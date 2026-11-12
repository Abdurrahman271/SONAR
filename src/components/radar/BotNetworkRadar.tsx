import React, { useState } from 'react';
import {
  Network,
  Search,
  Crosshair,
  AlertOctagon,
  Download,
} from 'lucide-react';
import { tacticalAudio } from '../../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

export interface RadarNode {
  id: string;
  label: string;
  handle: string;
  type: 'SEED_DISINFO' | 'BOT_AMPLIFIER' | 'BRIDGE_NODE' | 'ORGANIC';
  x: number; // coordinate in SVG (0 - 800)
  y: number; // coordinate in SVG (0 - 600)
  botProbability: number;
  burstFreq: number; // msg/hour
  connections: number;
  cluster: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'CRITICAL';
  platform: string;
  firstDetected: string;
  roleDescription: string;
}

export interface RadarEdge {
  from: string;
  to: string;
  type: 'BOT_PROPAGATION' | 'BRIDGE_TRANSFER' | 'ORGANIC_DIFFUSION';
}

export const BotNetworkRadar: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-seed-1');
  const [isSweepActive, setIsSweepActive] = useState<boolean>(true);

  // Center coordinate of circular scope in 800x600 viewBox
  const CX = 400;
  const CY = 300;
  const MAX_R = 260;

  // 14 Strategic Nodes arranged topologically around epicenter (CX=400, CY=300)
  const nodes: RadarNode[] = [
    // 1. Epicenter: Seed Disinfo Nodes
    {
      id: 'node-seed-1',
      label: 'Hub Disinfo Alpha (Inisiator)',
      handle: '@arif_patriot99_id',
      type: 'SEED_DISINFO',
      x: 390,
      y: 280,
      botProbability: 94,
      burstFreq: 142,
      connections: 840,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'X (Twitter)',
      firstDetected: '08:14 WIB (34 mnt lalu)',
      roleDescription: 'Inisiator utama pembuat naskah distorsi likuiditas bank dan narasi kepanikan massal.',
    },
    {
      id: 'node-seed-2',
      label: 'Hub Disinfo Beta (Relay Primer)',
      handle: '@waspada_ekonomi_33',
      type: 'SEED_DISINFO',
      x: 350,
      y: 330,
      botProbability: 89,
      burstFreq: 96,
      connections: 520,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'Telegram Channel',
      firstDetected: '08:19 WIB (29 mnt lalu)',
      roleDescription: 'Node penyebar pesan broadcast templat ke puluhan grup obrolan tertutup.',
    },

    // 2. Bot Amplifiers (Zone 1 - radius ~110 to 180)
    {
      id: 'bot-amp-1',
      label: 'Bot Amplifier #1',
      handle: '@infokritis_node41',
      type: 'BOT_AMPLIFIER',
      x: 480,
      y: 230,
      botProbability: 86,
      burstFreq: 110,
      connections: 230,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'X (Twitter)',
      firstDetected: '08:22 WIB',
      roleDescription: 'Akun otomatis yang memprogramkan reply terkoordinasi pada cuitan tokoh publik.',
    },
    {
      id: 'bot-amp-2',
      label: 'Bot Amplifier #2',
      handle: '@cyber_amplif_88',
      type: 'BOT_AMPLIFIER',
      x: 520,
      y: 310,
      botProbability: 91,
      burstFreq: 128,
      connections: 310,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'TikTok Botnet',
      firstDetected: '08:23 WIB',
      roleDescription: 'Menaikkan sound dan template video potongan gambar antrean ATM lama.',
    },
    {
      id: 'bot-amp-3',
      label: 'Bot Amplifier #3',
      handle: '@auto_retweet_09',
      type: 'BOT_AMPLIFIER',
      x: 270,
      y: 260,
      botProbability: 98,
      burstFreq: 240,
      connections: 410,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'X (Twitter)',
      firstDetected: '08:20 WIB',
      roleDescription: 'Botnet script murni dengan frekuensi retwit 4 kali per detik saat jam puncak.',
    },
    {
      id: 'bot-amp-4',
      label: 'Bot Amplifier #4',
      handle: '@buzzer_relay_77',
      type: 'BOT_AMPLIFIER',
      x: 360,
      y: 190,
      botProbability: 82,
      burstFreq: 85,
      connections: 180,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'Facebook Page',
      firstDetected: '08:25 WIB',
      roleDescription: 'Menginjeksi narasi kepanikan di kolom komentar forum jual beli lokal.',
    },
    {
      id: 'bot-amp-5',
      label: 'Bot Amplifier #5 (Hashtag)',
      handle: '@trending_pusher_id',
      type: 'BOT_AMPLIFIER',
      x: 440,
      y: 370,
      botProbability: 93,
      burstFreq: 165,
      connections: 290,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'X (Twitter)',
      firstDetected: '08:26 WIB',
      roleDescription: 'Hashtag stuffing massal untuk mendorong tagar #RushMoney ke trending topik.',
    },
    {
      id: 'bot-amp-6',
      label: 'Bot Amplifier #6 (Generator)',
      handle: '@fakta_bocor_vip',
      type: 'BOT_AMPLIFIER',
      x: 290,
      y: 360,
      botProbability: 88,
      burstFreq: 92,
      connections: 210,
      cluster: 'Sindikat-RushMoney',
      threatLevel: 'CRITICAL',
      platform: 'Telegram Public',
      firstDetected: '08:27 WIB',
      roleDescription: 'Membuat dokumen PDF palsu mengatasnamakan instruksi pembatasan tunai.',
    },

    // 3. Bridge Nodes (Zone 2 - radius ~180 to 220)
    {
      id: 'bridge-1',
      label: 'Kanal Bridge Telegram-X',
      handle: '@broadcast_warga_id',
      type: 'BRIDGE_NODE',
      x: 580,
      y: 390,
      botProbability: 64,
      burstFreq: 45,
      connections: 1240,
      cluster: 'Cross-Platform-Bridge',
      threatLevel: 'MEDIUM',
      platform: 'Multi-Platform',
      firstDetected: '08:28 WIB',
      roleDescription: 'Node jembatan yang menyalurkan screenshot dari WA grup ke linimasa publik.',
    },
    {
      id: 'bridge-2',
      label: 'Agregator Isu Viral',
      handle: '@sekilas_info_viral',
      type: 'BRIDGE_NODE',
      x: 210,
      y: 380,
      botProbability: 58,
      burstFreq: 38,
      connections: 920,
      cluster: 'Cross-Platform-Bridge',
      threatLevel: 'MEDIUM',
      platform: 'Instagram / Threads',
      firstDetected: '08:29 WIB',
      roleDescription: 'Mereshare konten tanpa verifikasi demi mendapatkan interaksi engagement.',
    },
    {
      id: 'bridge-3',
      label: 'Kanal Berita Komunitas',
      handle: '@kabar_nusantara_live',
      type: 'BRIDGE_NODE',
      x: 430,
      y: 110,
      botProbability: 52,
      burstFreq: 32,
      connections: 780,
      cluster: 'Cross-Platform-Bridge',
      threatLevel: 'MEDIUM',
      platform: 'TikTok Live Feed',
      firstDetected: '08:31 WIB',
      roleDescription: 'Menayangkan cuplikan video editan dengan judul umpan klik sensasional.',
    },

    // 4. Organic Public & Fact Checkers (Outer Zone - radius ~230 to 260)
    {
      id: 'org-1',
      label: 'Akun Warga Terdampak',
      handle: '@dewisinta_sby',
      type: 'ORGANIC',
      x: 640,
      y: 200,
      botProbability: 14,
      burstFreq: 4,
      connections: 45,
      cluster: 'Masyarakat-Organik',
      threatLevel: 'LOW',
      platform: 'X (Twitter)',
      firstDetected: '08:35 WIB',
      roleDescription: 'Warga umum yang menanyakan kebenaran rumor karena cemas saldo tabungan.',
    },
    {
      id: 'org-2',
      label: 'Pakar Analis Pasar',
      handle: '@analis_pasar_ri',
      type: 'ORGANIC',
      x: 160,
      y: 180,
      botProbability: 6,
      burstFreq: 2,
      connections: 120,
      cluster: 'Masyarakat-Organik',
      threatLevel: 'LOW',
      platform: 'LinkedIn / X',
      firstDetected: '08:38 WIB',
      roleDescription: 'Praktisi pasar modal yang memberikan ulasan objektif kondisi likuiditas perbankan.',
    },
    {
      id: 'org-3',
      label: 'Satgas Cek Fakta Keuangan',
      handle: '@cekfaktakeuangan',
      type: 'ORGANIC',
      x: 400,
      y: 530,
      botProbability: 2,
      burstFreq: 8,
      connections: 380,
      cluster: 'Pemeriksa-Fakta-Resmi',
      threatLevel: 'LOW',
      platform: 'Kanal Edukasi CekFakta',
      firstDetected: '08:40 WIB',
      roleDescription: 'Lembaga verifikasi independen yang menerbitkan rujukan klarifikasi data resmi.',
    },
  ];

  // Tactical network edges connecting nodes
  const edges: RadarEdge[] = [
    // Seed 1 connections to amplifiers
    { from: 'node-seed-1', to: 'bot-amp-1', type: 'BOT_PROPAGATION' },
    { from: 'node-seed-1', to: 'bot-amp-2', type: 'BOT_PROPAGATION' },
    { from: 'node-seed-1', to: 'bot-amp-3', type: 'BOT_PROPAGATION' },
    { from: 'node-seed-1', to: 'bot-amp-4', type: 'BOT_PROPAGATION' },
    { from: 'node-seed-1', to: 'node-seed-2', type: 'BOT_PROPAGATION' },

    // Seed 2 connections to amplifiers
    { from: 'node-seed-2', to: 'bot-amp-3', type: 'BOT_PROPAGATION' },
    { from: 'node-seed-2', to: 'bot-amp-5', type: 'BOT_PROPAGATION' },
    { from: 'node-seed-2', to: 'bot-amp-6', type: 'BOT_PROPAGATION' },

    // Amplifiers to Bridge nodes
    { from: 'bot-amp-2', to: 'bridge-1', type: 'BRIDGE_TRANSFER' },
    { from: 'bot-amp-5', to: 'bridge-1', type: 'BRIDGE_TRANSFER' },
    { from: 'bot-amp-6', to: 'bridge-2', type: 'BRIDGE_TRANSFER' },
    { from: 'bot-amp-3', to: 'bridge-2', type: 'BRIDGE_TRANSFER' },
    { from: 'bot-amp-4', to: 'bridge-3', type: 'BRIDGE_TRANSFER' },
    { from: 'bot-amp-1', to: 'bridge-3', type: 'BRIDGE_TRANSFER' },

    // Bridge nodes to Organics (diffusion)
    { from: 'bridge-1', to: 'org-1', type: 'ORGANIC_DIFFUSION' },
    { from: 'bridge-2', to: 'org-2', type: 'ORGANIC_DIFFUSION' },
    { from: 'bridge-1', to: 'org-3', type: 'ORGANIC_DIFFUSION' },
    { from: 'bridge-3', to: 'org-1', type: 'ORGANIC_DIFFUSION' },
  ];

  const filteredNodes = nodes.filter((n) => {
    const matchesSearch =
      n.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.cluster.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'all') return true;
    if (filterType === 'bots') return n.type === 'SEED_DISINFO' || n.type === 'BOT_AMPLIFIER';
    if (filterType === 'bridge') return n.type === 'BRIDGE_NODE';
    if (filterType === 'organic') return n.type === 'ORGANIC';
    return true;
  });

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const handleNodeClick = (node: RadarNode) => {
    tacticalAudio.playSonarPing();
    setSelectedNodeId(node.id);
  };

  const getNodeColor = (type: RadarNode['type']) => {
    switch (type) {
      case 'SEED_DISINFO':
        return {
          fill: '#ef4444',
          ring: '#f87171',
          bg: 'bg-red-500',
          text: 'text-red-400',
          badge: 'bg-red-500/20 text-red-400 border-red-500/40',
        };
      case 'BOT_AMPLIFIER':
        return {
          fill: '#f43f5e',
          ring: '#fb7185',
          bg: 'bg-rose-500',
          text: 'text-rose-400',
          badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
        };
      case 'BRIDGE_NODE':
        return {
          fill: '#f59e0b',
          ring: '#fbbf24',
          bg: 'bg-amber-500',
          text: 'text-amber-400',
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        };
      case 'ORGANIC':
        return {
          fill: '#10b981',
          ring: '#34d399',
          bg: 'bg-emerald-500',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        };
    }
  };

  return (
    <div className="space-y-5 font-sans">
      {/* 1. Header Toolbar Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1a56db]">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Radar Topologi Jaringan Botnet (Graph Topology)
              </h3>
              <p className="text-xs text-slate-500">
                Pemetaan hubungan akun inisiator (*Seed*), pengganda (*Amplifiers*), jembatan lintas kanal (*Bridge*), dan warga organik.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari handle akun..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs w-36 sm:w-44 text-slate-800"
            />
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'all', label: 'Semua Node (14)' },
              { id: 'bots', label: 'Sindikat Bot (8)' },
              { id: 'bridge', label: 'Bridge (3)' },
              { id: 'organic', label: 'Organik (3)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  tacticalAudio.playTechClick();
                  setFilterType(f.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  filterType === f.id
                    ? 'bg-white text-[#1a56db] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Toggle Sweep Animation */}
          <button
            onClick={() => {
              tacticalAudio.playTechClick();
              setIsSweepActive(!isSweepActive);
            }}
            className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-mono font-medium transition-colors cursor-pointer ${
              isSweepActive
                ? 'bg-blue-50 border-blue-200 text-[#1a56db]'
                : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}
          >
            {isSweepActive ? '● SWEEP AKTIF' : '○ SWEEP JEDA'}
          </button>
        </div>
      </motion.div>

      {/* 2. Main Radar Layout: Scope (Left 2 cols) + Forensic Inspector (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Radar Viewport Canvas */}
        <div className="lg:col-span-2 bg-[#060c1a] rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[540px]">
          {/* Top Status Bar Inside Radar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 z-10 px-2 pt-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-300 font-bold tracking-wider">RADAR COGNITIVE SCOPE v2.5</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">EPSG COORD: EPS-84</span>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span>ACTIVE EDGES: 17</span>
              <span>AMPLIF RATE: 420 msg/min</span>
            </div>
          </div>

          {/* Scalable SVG Scope Canvas */}
          <div className="relative w-full flex-1 flex items-center justify-center my-2">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full max-h-[500px] select-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Radial Gradient for radar background glow */}
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.18" />
                  <stop offset="60%" stopColor="#0f172a" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </radialGradient>

                {/* Sweeping Beam Gradient */}
                <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background circular radar fill */}
              <circle cx={CX} cy={CY} r={MAX_R} fill="url(#radarGlow)" />

              {/* Concentric Coordinate Distance Rings (Authentic Circles) */}
              {[
                { r: MAX_R, label: 'PERIMETER LUAR (100%)', col: 'rgba(56, 189, 248, 0.25)' },
                { r: MAX_R * 0.75, label: 'ZONA RELAY (75%)', col: 'rgba(56, 189, 248, 0.3)' },
                { r: MAX_R * 0.5, label: 'ZONA INFILTRASI BOT (50%)', col: 'rgba(239, 68, 68, 0.35)' },
                { r: MAX_R * 0.25, label: 'EPISENTRUM HOAKS (25%)', col: 'rgba(239, 68, 68, 0.55)' },
              ].map((ring, idx) => (
                <g key={idx}>
                  <circle
                    cx={CX}
                    cy={CY}
                    r={ring.r}
                    fill="none"
                    stroke={ring.col}
                    strokeWidth={idx === 3 ? '1.5' : '1'}
                    strokeDasharray={idx === 2 || idx === 1 ? '4 4' : undefined}
                  />
                  <text
                    x={CX + 6}
                    y={CY - ring.r + 14}
                    fill="rgba(148, 163, 184, 0.6)"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {ring.label}
                  </text>
                </g>
              ))}

              {/* Crosshair Axes */}
              <line
                x1={CX - MAX_R - 20}
                y1={CY}
                x2={CX + MAX_R + 20}
                y2={CY}
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
              />
              <line
                x1={CX}
                y1={CY - MAX_R - 20}
                x2={CX}
                y2={CY + MAX_R + 20}
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
              />

              {/* 45-degree diagonal guides */}
              <line
                x1={CX - MAX_R * 0.707}
                y1={CY - MAX_R * 0.707}
                x2={CX + MAX_R * 0.707}
                y2={CY + MAX_R * 0.707}
                stroke="rgba(56, 189, 248, 0.12)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <line
                x1={CX - MAX_R * 0.707}
                y1={CY + MAX_R * 0.707}
                x2={CX + MAX_R * 0.707}
                y2={CY - MAX_R * 0.707}
                stroke="rgba(56, 189, 248, 0.12)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />

              {/* Compass Cardinal Points */}
              <text x={CX} y={CY - MAX_R - 10} fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                000° UTARA
              </text>
              <text x={CX + MAX_R + 14} y={CY + 4} fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="start">
                090° TIMUR
              </text>
              <text x={CX} y={CY + MAX_R + 20} fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                180° SELATAN
              </text>
              <text x={CX - MAX_R - 14} y={CY + 4} fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                270° BARAT
              </text>

              {/* Rotating Radar Sweep Beam (SVG Animation) */}
              {isSweepActive && (
                <g pointerEvents="none">
                  <circle cx={CX} cy={CY} r="3" fill="#38bdf8" />
                  <line
                    x1={CX}
                    y1={CY}
                    x2={CX + MAX_R}
                    y2={CY}
                    stroke="rgba(56, 189, 248, 0.8)"
                    strokeWidth="1.5"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from={`0 ${CX} ${CY}`}
                      to={`360 ${CX} ${CY}`}
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </line>
                </g>
              )}

              {/* Topological Network Connection Lines (Edges) */}
              {edges.map((edge, idx) => {
                const source = nodes.find((n) => n.id === edge.from);
                const target = nodes.find((n) => n.id === edge.to);
                if (!source || !target) return null;

                const isConnectedToSelected =
                  selectedNodeId === source.id || selectedNodeId === target.id;

                let strokeColor = 'rgba(239, 68, 68, 0.35)'; // Red propagation
                let strokeWidth = '1.2';
                let strokeDash = '3 3';

                if (edge.type === 'BRIDGE_TRANSFER') {
                  strokeColor = 'rgba(245, 158, 11, 0.4)';
                  strokeDash = '4 2';
                } else if (edge.type === 'ORGANIC_DIFFUSION') {
                  strokeColor = 'rgba(16, 185, 129, 0.35)';
                  strokeDash = '2 2';
                }

                if (isConnectedToSelected) {
                  strokeWidth = '2.5';
                  strokeColor =
                    edge.type === 'BOT_PROPAGATION'
                      ? '#ef4444'
                      : edge.type === 'BRIDGE_TRANSFER'
                      ? '#f59e0b'
                      : '#10b981';
                }

                return (
                  <g key={`edge-${idx}`} pointerEvents="none">
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDash}
                    />
                    {/* Animated moving packet particle on selected edge */}
                    {isConnectedToSelected && (
                      <circle r="3" fill="#ffffff" pointerEvents="none">
                        <animateMotion
                          path={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Nodes Rendering - Stable & Static Coordinates */}
              {filteredNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const colors = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer"
                  >
                    {/* Halo aura for selected or Seed Disinfo - Fixed radius, perfectly stable */}
                    {(isSelected || node.type === 'SEED_DISINFO') && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.type === 'SEED_DISINFO' ? 18 : 15}
                        fill="none"
                        stroke={colors.ring}
                        strokeWidth="1.5"
                        strokeDasharray={isSelected ? '3 3' : undefined}
                        opacity={isSelected ? 0.9 : 0.6}
                        pointerEvents="none"
                      />
                    )}

                    {/* Node Core Body - Completely stable, zero jitter, crisp SVG rendering */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.type === 'SEED_DISINFO' ? 12 : 9}
                      fill={colors.fill}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="cursor-pointer transition-opacity hover:opacity-90"
                    />

                    {/* Node Label Pill (Handle) */}
                    <g transform={`translate(${node.x}, ${node.y + 18})`} pointerEvents="none">
                      <rect
                        x="-48"
                        y="-8"
                        width="96"
                        height="16"
                        rx="4"
                        fill="rgba(15, 23, 42, 0.9)"
                        stroke={isSelected ? colors.fill : 'rgba(51, 65, 85, 0.8)'}
                        strokeWidth={isSelected ? 1.5 : 1}
                      />
                      <text
                        x="0"
                        y="3"
                        fill={isSelected ? '#ffffff' : '#cbd5e1'}
                        fontSize="8.5"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {node.handle.length > 15 ? node.handle.slice(0, 14) + '…' : node.handle}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Legend Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span>Seed Disinfo (Hub Episentrum)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Bot Amplifier (Sindikat Pengganda)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Bridge Node (Relay Lintas Platform)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Akun Organik &amp; Cek Fakta</span>
              </div>
            </div>

            <span className="text-slate-500 text-[10px]">Klik node untuk inspeksi forensik</span>
          </div>
        </div>

        {/* 3. Right Column: Node Forensic Telemetry Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header Inspector */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Crosshair className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-blue-600">
                      INSPEKSI FORENSIK NODE
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {selectedNode.handle}
                  </h4>
                  <p className="text-xs text-slate-500">{selectedNode.label}</p>
                </div>

                <span
                  className={`text-[10px] font-bold font-mono px-2 py-1 rounded-lg border ${
                    selectedNode.type === 'SEED_DISINFO'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : selectedNode.type === 'BOT_AMPLIFIER'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : selectedNode.type === 'BRIDGE_NODE'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {selectedNode.type}
                </span>
              </div>

              {/* Bot Probability Meter */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Probabilitas Akun Inotentik (Bot Score)</span>
                  <span
                    className={`font-mono text-sm font-bold ${
                      selectedNode.botProbability > 70
                        ? 'text-red-600'
                        : selectedNode.botProbability > 40
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {selectedNode.botProbability}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedNode.botProbability > 70
                        ? 'bg-red-500'
                        : selectedNode.botProbability > 40
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${selectedNode.botProbability}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>
                    Status:{' '}
                    <strong className="text-slate-800">
                      {selectedNode.botProbability > 70
                        ? 'TERKONFIRMASI BOT'
                        : selectedNode.botProbability > 40
                        ? 'SUSPEK ANOMALI'
                        : 'ORGANIK NORMAL'}
                    </strong>
                  </span>
                  <span>Burst: {selectedNode.burstFreq} msg/jam</span>
                </div>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-mono block">PLATFORM UTAMA</span>
                  <span className="font-semibold text-slate-800">{selectedNode.platform}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-mono block">DERAJAT KONEKSI</span>
                  <span className="font-semibold text-slate-800">{selectedNode.connections} Hubungan</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-mono block">KLASTER SINDIKAT</span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {selectedNode.cluster}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-mono block">TERDETEKSI PERTAMA</span>
                  <span className="font-semibold text-slate-800">{selectedNode.firstDetected}</span>
                </div>
              </div>

              {/* Role Analysis */}
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs">
                <span className="text-[10px] font-bold font-mono text-blue-700 block mb-1">
                  PERAN TAKTIS DALAM KAMPANYE:
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {selectedNode.roleDescription}
                </p>
              </div>
            </div>

            {/* Tactical Actions Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  tacticalAudio.playTechClick();
                  alert(`Tindakan Karantina Akun ${selectedNode.handle} telah dikirim ke tim respon satgas.`);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Karantina &amp; Laporkan ke Platform</span>
              </button>

              <button
                onClick={() => {
                  tacticalAudio.playTechClick();
                  alert(`Draf laporan forensik untuk node ${selectedNode.handle} siap diunduh.`);
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Ekspor Bukti Forensik Node (.json)</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
