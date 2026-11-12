import React, { useState, useMemo } from 'react';
import type { NarrativePost } from '../../types';
import { Search, Filter, Bot, User, ArrowRight } from 'lucide-react';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatRelativeTime } from '../../utils/formatters';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';

interface LiveFeedViewProps {
  narratives: NarrativePost[];
  onSelectNarrative: (post: NarrativePost) => void;
}

export const LiveFeedView: React.FC<LiveFeedViewProps> = ({
  narratives,
  onSelectNarrative,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [botFilter, setBotFilter] = useState<string>('all');

  const filteredNarratives = useMemo(() => {
    return narratives.filter((post) => {
      if (
        searchTerm &&
        !post.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !post.author.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !post.authorHandle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !post.topic.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (platformFilter !== 'all' && post.platform !== platformFilter) {
        return false;
      }

      if (sentimentFilter !== 'all' && post.sentiment !== sentimentFilter) {
        return false;
      }

      if (botFilter === 'bot' && post.botMetrics.botProbability < 65) {
        return false;
      }
      if (botFilter === 'organic' && post.botMetrics.botProbability >= 35) {
        return false;
      }

      return true;
    });
  }, [narratives, searchTerm, platformFilter, sentimentFilter, botFilter]);

  return (
    <div className="space-y-5">
      {/* Search and Filter Panel */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kata kunci narasi, akun, tagar (#RushMoney, perbankan)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="text-xs font-sans text-slate-500 flex items-center justify-end gap-2">
            <span>Ditemukan:</span>
            <span className="font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {filteredNarratives.length} Narasi
            </span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-sans font-medium mr-2">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>FILTER KANAL:</span>
          </div>

          {/* Platform Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Semua Kanal' },
              { id: 'x', label: 'X / Twitter' },
              { id: 'tiktok', label: 'TikTok' },
              { id: 'telegram', label: 'Telegram' },
              { id: 'facebook', label: 'Facebook' },
              { id: 'news', label: 'Media Berita' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  tacticalAudio.playTechClick();
                  setPlatformFilter(p.id);
                }}
                className={`px-3 py-1 rounded-lg font-sans text-xs transition-all cursor-pointer ${
                  platformFilter === p.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 hidden lg:block" />

          {/* Sentiment Filter */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Semua Sentimen' },
              { id: 'provokatif', label: 'Provokatif' },
              { id: 'negatif', label: 'Negatif' },
              { id: 'positif', label: 'Positif' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  tacticalAudio.playTechClick();
                  setSentimentFilter(s.id);
                }}
                className={`px-3 py-1 rounded-lg font-sans text-xs transition-all cursor-pointer ${
                  sentimentFilter === s.id
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 hidden lg:block" />

          {/* Bot filter */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Semua Akun' },
              { id: 'bot', label: 'Suspek Bot (>65%)' },
              { id: 'organic', label: 'Organik (<35%)' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  tacticalAudio.playTechClick();
                  setBotFilter(b.id);
                }}
                className={`px-3 py-1 rounded-lg font-sans text-xs transition-all cursor-pointer ${
                  botFilter === b.id
                    ? 'bg-red-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNarratives.map((post) => {
          const isBot = post.botMetrics.botProbability >= 65;

          return (
            <motion.div
              key={post.id}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              onClick={() => {
                tacticalAudio.playScanBeep();
                onSelectNarrative(post);
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isBot
                  ? 'bg-red-50/30 border-red-200 hover:border-red-300 shadow-xs'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl text-xs ${
                        isBot ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                      }`}
                    >
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {post.author}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {post.authorHandle}
                      </div>
                    </div>
                  </div>

                  <PlatformBadge platform={post.platform} />
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans mb-4">
                  {post.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-sans">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg font-bold font-mono ${
                      isBot ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>{post.botMetrics.botProbability}% Bot</span>
                  </span>
                  <span className="text-slate-400">
                    {formatRelativeTime(post.timestamp)}
                  </span>
                </div>

                <span className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
