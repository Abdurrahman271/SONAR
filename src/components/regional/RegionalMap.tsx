import React, { useState } from 'react';
import { INDONESIA_REGIONS } from '../../data/regionsData';
import { INDONESIA_38_PROVINCES } from '../../data/indonesiaProvinceSvgData';
import type { ProvinceSvgData } from '../../data/indonesiaProvinceSvgData';
import type { RegionData } from '../../types';
import {
  Map,
  Flame,
  Navigation,
  Layers,
  ShieldAlert,
  TrendingUp,
  Share2,
} from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { tacticalAudio } from '../../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

export const RegionalMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(INDONESIA_REGIONS[0]);
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceSvgData | null>(null);
  const [activeIslandFilter, setActiveIslandFilter] = useState<string>('ALL');
  const [colorMode, setColorMode] = useState<'PROVINCE' | 'HEATMAP'>('PROVINCE');

  // Handle region pin click
  const handleSelectRegion = (region: RegionData) => {
    tacticalAudio.playSonarPing();
    setSelectedRegion(region);
  };

  // Handle clicking a province path
  const handleProvinceClick = (prov: ProvinceSvgData) => {
    tacticalAudio.playTechClick();
    // Try to find matching region in INDONESIA_REGIONS or update selected
    const matching = INDONESIA_REGIONS.find((r) =>
      r.name.toLowerCase().includes(prov.name.toLowerCase()) ||
      prov.name.toLowerCase().includes(r.name.toLowerCase())
    );
    if (matching) {
      setSelectedRegion(matching);
    } else {
      // Create a virtual region entry for clicked province
      setSelectedRegion({
        id: prov.id,
        name: prov.name,
        code: prov.code,
        volume: Math.floor(Math.random() * 25000) + 8000,
        threatIndex: Math.floor(Math.random() * 45) + 30,
        botPercentage: Math.floor(Math.random() * 40) + 15,
        dominantSentiment: 'netral',
        topIssues: [`#${prov.name.replace(/\s+/g, '')}`, '#InfoDaerah', '#StabilitasLokal'],
        coordinates: prov.center,
      });
    }
  };

  // Threat badge color helper
  const getThreatColor = (index: number) => {
    if (index >= 70) return { fill: '#ef4444', ring: '#f87171', bg: 'bg-red-500', text: 'text-red-700', label: 'KRITIS' };
    if (index >= 45) return { fill: '#f59e0b', ring: '#fbbf24', bg: 'bg-amber-500', text: 'text-amber-700', label: 'WASPADA' };
    return { fill: '#10b981', ring: '#34d399', bg: 'bg-emerald-500', text: 'text-emerald-700', label: 'NORMAL' };
  };

  // Province fill color based on selected mode
  const getProvinceFill = (prov: ProvinceSvgData) => {
    const isFilteredOut = activeIslandFilter !== 'ALL' && prov.islandGroup !== activeIslandFilter;
    if (isFilteredOut) return '#f1f5f9';

    if (colorMode === 'PROVINCE') {
      return prov.color;
    } else {
      // Heatmap choropleth
      const matching = INDONESIA_REGIONS.find((r) =>
        r.name.toLowerCase().includes(prov.name.toLowerCase()) ||
        prov.name.toLowerCase().includes(r.name.toLowerCase())
      );
      const threat = matching ? matching.threatIndex : 35;
      if (threat >= 75) return '#fca5a5'; // Red
      if (threat >= 50) return '#fed7aa'; // Orange
      return '#bbf7d0'; // Green
    }
  };

  const threatStyle = getThreatColor(selectedRegion.threatIndex);

  return (
    <div className="space-y-5 font-sans">
      {/* 1. Top Control Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1a56db]">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Peta Geospasial Kognitif &amp; Hotspot Ancaman Wilayah (38 Provinsi RI)
              </h3>
              <p className="text-xs text-slate-500">
                Observasi presisi tinggi: batas geografis otentik 38 provinsi, sentimen kedaerahan, dan sebaran sindikat botnet.
              </p>
            </div>
          </div>
        </div>

        {/* View Mode & Island Group Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                tacticalAudio.playTechClick();
                setColorMode('PROVINCE');
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                colorMode === 'PROVINCE'
                  ? 'bg-white text-[#1a56db] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Batas 38 Provinsi</span>
            </button>
            <button
              onClick={() => {
                tacticalAudio.playTechClick();
                setColorMode('HEATMAP');
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                colorMode === 'HEATMAP'
                  ? 'bg-white text-[#1a56db] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Heatmap Ancaman EWS</span>
            </button>
          </div>

          {/* Island Filter Pills */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {[
              { id: 'ALL', label: 'Semua' },
              { id: 'Sumatera', label: 'Sumatera' },
              { id: 'Jawa', label: 'Jawa' },
              { id: 'Bali-Nusa', label: 'Bali-Nusa' },
              { id: 'Kalimantan', label: 'Kalimantan' },
              { id: 'Sulawesi', label: 'Sulawesi' },
              { id: 'Maluku', label: 'Maluku' },
              { id: 'Papua', label: 'Papua' },
            ].map((isl) => (
              <button
                key={isl.id}
                onClick={() => {
                  tacticalAudio.playTechClick();
                  setActiveIslandFilter(isl.id);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                  activeIslandFilter === isl.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isl.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Main Map Graphic (Left 2 cols) & Telemetry Inspector (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Authentic SVG Map Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[500px]">
          {/* Map Top Metadata Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-blue-700 font-bold">
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>RADAR GEOSPASIAL 38 PROVINSI INDONESIA (EPSG:4326)</span>
            </span>
            <span className="text-slate-500">TITIK OBSERVASI: 10 HUB UTAMA</span>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full aspect-[2.38/1] min-h-[340px] sm:min-h-[400px] bg-[#f0f7ff] rounded-xl border border-blue-100 p-2 flex items-center justify-center overflow-hidden shadow-inner">
            <svg
              viewBox="0 0 1000 420"
              className="w-full h-full select-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Subtle Coordinate Grid Pattern */}
                <pattern id="oceanGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#dbeafe" strokeWidth="0.8" />
                </pattern>

                {/* Drop shadow for pins */}
                <filter id="beaconShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Ocean Background with Subtle Latitude Grids */}
              <rect width="1000" height="420" fill="url(#oceanGrid)" />

              {/* Equator & Java Sea Lines */}
              <line x1="10" y1="147" x2="990" y2="147" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 4" />
              <text x="18" y="142" fill="#64748b" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                0° KHATULISTIWA (EQUATOR)
              </text>

              <line x1="10" y1="295" x2="990" y2="295" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="4 4" />
              <text x="18" y="290" fill="#64748b" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                6°S LAUT JAWA
              </text>

              {/* 38 REAL PROVINCE SVG PATHS */}
              <g className="transition-all duration-200">
                {INDONESIA_38_PROVINCES.map((prov) => {
                  const isHovered = hoveredProvince?.id === prov.id;
                  const isSelected = selectedRegion.name.toLowerCase().includes(prov.name.toLowerCase());
                  const fill = getProvinceFill(prov);

                  return (
                    <path
                      key={prov.id + '-path'}
                      d={prov.path}
                      fill={isHovered || isSelected ? '#93c5fd' : fill}
                      stroke={isHovered || isSelected ? '#1d4ed8' : '#4b5563'}
                      strokeWidth={isHovered || isSelected ? '1.5' : '0.6'}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      onMouseEnter={() => setHoveredProvince(prov)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(prov)}
                      className="cursor-pointer transition-colors duration-150"
                    />
                  );
                })}
              </g>

              {/* 10 STRATEGIC MONITORING PINS — GPS-calibrated province centroids */}
              {INDONESIA_REGIONS.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                const pColor = getThreatColor(region.threatIndex);

                return (
                  <g
                    key={region.id}
                    transform={`translate(${region.coordinates.x}, ${region.coordinates.y})`}
                    onClick={() => handleSelectRegion(region)}
                    className="cursor-pointer"
                  >
                    {/* Outer ring halo — pointerEvents none so it doesn't trigger jitter */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 14 : 10}
                      fill={pColor.fill}
                      fillOpacity={isSelected ? 0.18 : 0.12}
                      stroke={pColor.fill}
                      strokeWidth="1"
                      strokeDasharray={isSelected ? '2 2' : undefined}
                      opacity={isSelected ? 1 : 0.7}
                      pointerEvents="none"
                    />

                    {/* Core dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 5.5 : 4}
                      fill={pColor.fill}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      filter="url(#beaconShadow)"
                    />

                    {/* Code label pill — rendered above the pin */}
                    <g transform="translate(0, -18)" pointerEvents="none">
                      <rect
                        x="-18"
                        y="-8"
                        width="36"
                        height="15"
                        rx="4"
                        fill={isSelected ? pColor.fill : 'rgba(255,255,255,0.95)'}
                        stroke={pColor.fill}
                        strokeWidth="1.2"
                        filter="url(#beaconShadow)"
                      />
                      <text
                        x="0"
                        y="4"
                        fill={isSelected ? '#ffffff' : '#0f172a'}
                        fontSize="8.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {region.code}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Hover Tooltip Overlay in SVG */}
              {hoveredProvince && (
                <g
                  transform={`translate(${hoveredProvince.center.x}, ${hoveredProvince.center.y - 18})`}
                  pointerEvents="none"
                >
                  <rect
                    x="-60"
                    y="-18"
                    width="120"
                    height="22"
                    rx="5"
                    fill="rgba(15, 23, 42, 0.92)"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    filter="url(#beaconShadow)"
                  />
                  <text
                    x="0"
                    y="-3"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                  >
                    {hoveredProvince.name}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Map Legend Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100 text-[11px] font-sans text-slate-500">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-semibold text-slate-700">Tingkat Ancaman:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Kritis (&gt;70)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Waspada (45 - 70)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Normal / Aman (&lt;45)</span>
              </div>
            </div>

            <div className="text-slate-400 font-mono text-[10px]">
              Klik provinsi atau pin pulau untuk telemetri lengkap
            </div>
          </div>
        </div>

        {/* 3. Right Column: Regional Intelligence Telemetry Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRegion.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Region Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-600 block">
                    TELEMETRI GEOSPASIAL
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                    {selectedRegion.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">Kode Wilayah: {selectedRegion.code}</p>
                </div>

                <span
                  className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg border ${
                    selectedRegion.threatIndex >= 70
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : selectedRegion.threatIndex >= 45
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {threatStyle.label}
                </span>
              </div>

              {/* Threat Index Score Meter */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Indeks Ancaman Kognitif Wilayah</span>
                  <span className={`font-mono text-base font-bold ${threatStyle.text}`}>
                    {selectedRegion.threatIndex} / 100
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${threatStyle.bg}`}
                    style={{ width: `${selectedRegion.threatIndex}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Status: <strong className="text-slate-800">{threatStyle.label}</strong></span>
                  <span>Kerapatan Bot: <strong className="text-slate-800">{selectedRegion.botPercentage}%</strong></span>
                </div>
              </div>

              {/* Regional Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-mono block">VOLUME NARASI</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {formatNumber(selectedRegion.volume)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">percakapan lokal</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-mono block">SENTIMEN DOMINAN</span>
                  <span className="font-bold text-slate-800 text-sm capitalize">
                    {selectedRegion.dominantSentiment}
                  </span>
                  <span className="text-[10px] text-slate-500 block">mayoritas respons</span>
                </div>
              </div>

              {/* Local Trending Issues / Hashtags */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                <span className="text-[10px] font-bold font-mono text-slate-500 block uppercase">
                  ISU &amp; TAGAR MENONJOL DAERAH:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRegion.topIssues.map((issue, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-700 font-mono text-[11px] font-medium shadow-2xs"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Mitigation Directive */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold font-mono text-[10px]">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>DIREKTIF SATGAS REGIONAL:</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {selectedRegion.threatIndex >= 70
                    ? 'Tingkatkan pengawasan unit siber Polda setempat, lakukan klarifikasi cepat bersama perwakilan daerah, dan lacak akun bot amplifikasi regional.'
                    : selectedRegion.threatIndex >= 45
                    ? 'Monitor pergerakan sentimen harian, verifikasi narasi viral di grup obrolan warga, dan siapkan narasi penyejuk.'
                    : 'Pertahankan situasi kondusif melalui literasi digital rutin dan komunikasi publik yang transparan.'}
                </p>
              </div>
            </div>

            {/* Tactical Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  tacticalAudio.playTechClick();
                  alert(`Peringatan Geospasial untuk wilayah ${selectedRegion.name} telah dikirim ke komando daerah.`);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Terbitkan Flash Warning Wilayah</span>
              </button>

              <button
                onClick={() => {
                  tacticalAudio.playTechClick();
                  alert(`Paket konten penyejuk kedaerahan untuk ${selectedRegion.name} siap didistribusikan.`);
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Distribusi Konten Penyejuk Lokal</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
