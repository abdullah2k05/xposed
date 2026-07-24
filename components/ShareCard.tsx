'use client'

import { forwardRef } from 'react'
import type { XposedResult } from '@/lib/types'

interface ShareCardProps {
  data: XposedResult
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ data }, ref) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent('https://xposed.mabdullah.top')}&bgcolor=0f172a&color=ffffff&margin=0`
  const accent = data.aura.hex

  return (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1350,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: `linear-gradient(160deg, #0b1120 0%, #0f172a 40%, #131b2e 70%, #0f172a 100%)`,
        borderRadius: 32,
      }}
      className="relative text-white p-14 flex flex-col justify-between overflow-hidden select-none shadow-2xl"
    >
      {/* Subtle accent glow (solid, no CSS blur — safe for canvas) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accent}15 0%, transparent 70%)`,
        }}
      />

      {/* ===== HEADER ===== */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <span
          className="text-2xl font-black tracking-[0.35em] uppercase px-7 py-3 rounded-full border-2"
          style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}12` }}
        >
          X P O S E D
        </span>

        <div className="mt-9 relative">
          <div
            className="rounded-full"
            style={{
              width: 134,
              height: 134,
              padding: 4,
              background: `linear-gradient(135deg, ${accent}, #f59e0b)`,
              boxShadow: `0 0 0 1px ${accent}30`,
            }}
          >
            <img
              src={data.avatarUrl}
              alt=""
              className="w-full h-full rounded-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>
        <h2 className="text-[32px] font-bold text-slate-100 mt-5">@{data.username}</h2>
      </div>

      {/* ===== SCORE ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center -my-2">
        <span
          className="font-black leading-none tracking-tight"
          style={{ fontSize: 160, color: accent }}
        >
          {data.overallScore}
        </span>
        <span className="text-lg font-bold text-slate-500 tracking-[0.3em] uppercase mt-3">
          OVERALL SCORE
        </span>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="relative z-10 grid grid-cols-2 gap-5">
        <div className="rounded-2xl p-7 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2 mb-2">
            <span style={{ color: accent }}>✦</span> AURA
          </span>
          <span className="text-[28px] font-black leading-tight" style={{ color: accent }}>{data.aura.vibe}</span>
        </div>
        <div className="rounded-2xl p-7 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-2">🚫 BAN RISK</span>
          <span className="text-[36px] font-black leading-tight text-red-400">{data.banClock.score}%</span>
        </div>
        <div className="rounded-2xl p-7 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-2">✦ BEAUTY</span>
          <span className="text-[36px] font-black leading-tight text-emerald-400">{data.beautyRanking.score}</span>
        </div>
        <div className="rounded-2xl p-7 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-2">📉 FLOP RATE</span>
          <span className="text-[36px] font-black leading-tight text-amber-400">{data.flopRate.percentage}%</span>
        </div>
      </div>

      {/* ===== AI VERDICT ===== */}
      <div className="relative z-10 rounded-2xl p-7 border" style={{ backgroundColor: '#111827e0', borderColor: `${accent}20` }}>
        <span className="text-sm font-bold tracking-wider uppercase flex items-center gap-2 mb-3" style={{ color: accent }}>
          <span>✨</span> AI VERDICT
        </span>
        <p className="text-[24px] font-medium text-slate-200 italic leading-relaxed">
          &ldquo;{data.toast}&rdquo;
        </p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="relative z-10 flex justify-between items-center pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-5">
          <span className="text-5xl leading-none">{data.spiritAnimal.emoji}</span>
          <div>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-0.5">SPIRIT ANIMAL</span>
            <span className="text-[28px] font-extrabold text-white leading-tight">{data.spiritAnimal.animal}</span>
            <p className="text-base text-slate-400 mt-1 leading-snug">{data.spiritAnimal.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <span className="text-sm text-slate-500 block font-medium">xposed.mabdullah.top</span>
          </div>
          <img
            src={qrUrl}
            alt="QR"
            className="w-[72px] h-[72px] rounded-xl"
            style={{ border: `1px solid ${accent}30` }}
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
