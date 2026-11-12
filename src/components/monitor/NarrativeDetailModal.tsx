import React from 'react';
import type { NarrativePost } from '../../types';
import { X, Bot, User, AlertOctagon, CheckCircle2, ShieldAlert, Share2, Heart, MessageSquare } from 'lucide-react';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatNumber, formatDateTime } from '../../utils/formatters';
import { tacticalAudio } from '../../utils/sound';
import { motion } from 'framer-motion';

interface NarrativeDetailModalProps {
  post: NarrativePost | null;
  onClose: () => void;
}

export const NarrativeDetailModal: React.FC<NarrativeDetailModalProps> = ({
  post,
  onClose,
}) => {
  if (!post) return null;

  const isBot = post.botMetrics.botProbability >= 65;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm sm:text-base font-bold font-sans text-slate-900 uppercase tracking-wide">
              Telemetri Forensik Narasi Publik
            </h3>
          </div>
          <button
            onClick={() => {
              tacticalAudio.playTechClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          {/* Author Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  isBot ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                }`}
              >
                {isBot ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-base">{post.author}</div>
                <div className="text-xs font-mono text-slate-500">
                  {post.authorHandle} &bull; {post.region}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <PlatformBadge platform={post.platform} />
              <span className="text-xs font-sans text-slate-500">
                {formatDateTime(post.timestamp)}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans text-sm sm:text-base leading-relaxed text-slate-900">
            &ldquo;{post.content}&rdquo;
          </div>

          {/* Bot Metrics Grid */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-blue-600" />
              Indikator Forensik Akun ({post.botMetrics.classification})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] font-sans text-slate-500 uppercase font-bold">Probabilitas Bot</div>
                <div className={`text-xl font-bold font-sans mt-1 ${isBot ? 'text-red-600' : 'text-emerald-600'}`}>
                  {post.botMetrics.botProbability}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] font-sans text-slate-500 uppercase font-bold">Umur Akun</div>
                <div className="text-xl font-bold font-sans text-slate-900 mt-1">
                  {post.botMetrics.accountAgeDays} Hari
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] font-sans text-slate-500 uppercase font-bold">Frekuensi Burst</div>
                <div className="text-xl font-bold font-sans text-amber-600 mt-1">
                  {post.botMetrics.burstFrequencyPerHour}/jam
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] font-sans text-slate-500 uppercase font-bold">Koordinasi Jaringan</div>
                <div className="text-xl font-bold font-sans text-red-600 mt-1">
                  {post.botMetrics.networkCoordinationScore}%
                </div>
              </div>
            </div>
          </div>

          {/* Propaganda Techniques */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase text-slate-500 mb-2 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-amber-600" />
              Teknik Manipulasi &amp; Propaganda Terdeteksi
            </h4>
            {post.propagandaDetected.length > 0 ? (
              <div className="space-y-2">
                {post.propagandaDetected.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900 text-xs sm:text-sm">{p.name}</span>
                      <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Akurasi: {p.confidence}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tidak terdeteksi teknik propaganda terencana dalam pesan ini.</span>
              </div>
            )}
          </div>

          {/* Engagement Strip */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-4 text-slate-600">
              <span className="flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-blue-600" /> {formatNumber(post.engagement.shares)} Shares
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-600" /> {formatNumber(post.engagement.likes)} Likes
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" /> {formatNumber(post.engagement.comments)} Komen
              </span>
            </div>
            <div className="text-blue-700 font-semibold font-mono">
              Est. Jangkauan: {formatNumber(post.reachEstimate)}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={() => {
              tacticalAudio.playTechClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
};
