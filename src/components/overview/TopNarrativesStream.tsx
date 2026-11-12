import React from 'react';
import type { NarrativePost } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { Bot, User, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';

interface TopNarrativesStreamProps {
  narratives: NarrativePost[];
  onSelectNarrative: (post: NarrativePost) => void;
  onViewAllClick: () => void;
}

export const TopNarrativesStream: React.FC<TopNarrativesStreamProps> = ({
  narratives,
  onSelectNarrative,
  onViewAllClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 25, delay: 0.2 }}
      className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold font-sans text-slate-900 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            Aliran Narasi Publik Terkini (Real-Time Ingestion)
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Klasifikasi otomatis teks percakapan dan estimasi probabilistik akun bot
          </p>
        </div>

        <button
          onClick={() => {
            tacticalAudio.playTechClick();
            onViewAllClick();
          }}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>Lihat Semua ({narratives.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {narratives.slice(0, 4).map((post) => {
          const isBot = post.botMetrics.botProbability >= 65;

          return (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.004, transition: { duration: 0.15 } }}
              onClick={() => {
                tacticalAudio.playScanBeep();
                onSelectNarrative(post);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isBot
                  ? 'bg-red-50/40 border-red-200 hover:border-red-400 hover:bg-red-50/70'
                  : 'bg-slate-50/60 border-slate-200 hover:border-blue-300 hover:bg-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-xl text-xs ${
                      isBot
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-blue-600 text-white shadow-xs'
                    }`}
                  >
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {post.author}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">
                      {post.authorHandle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PlatformBadge platform={post.platform} />
                  <span className="text-[11px] font-sans text-slate-400">
                    {formatRelativeTime(post.timestamp)}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <p className="text-xs sm:text-sm text-slate-800 line-clamp-2 font-sans mb-3 leading-relaxed">
                {post.content}
              </p>

              {/* Badges footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                <div className="flex flex-wrap items-center gap-2 font-sans">
                  {/* Bot Pill */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg font-bold ${
                      isBot
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Bot: {post.botMetrics.botProbability}%</span>
                  </span>

                  {/* Fact Check status */}
                  {post.factCheckStatus === 'HOAKS_TOTAL' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-200 font-semibold">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>Hoaks Terkonfirmasi</span>
                    </span>
                  )}
                  {post.factCheckStatus === 'BENAR' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Terverifikasi Valid</span>
                    </span>
                  )}
                </div>

                <span className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                  <span>Inspeksi Forensik</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
