'use client'

import { forwardRef } from 'react'
import type { XposedResult } from '@/lib/types'

interface ShareCardProps {
  data: XposedResult
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ data }, ref) => {
  const accent = data.aura.hex
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent('https://xposed.mabdullah.top')}&bgcolor=0f172a&color=ffffff&margin=0`

  return (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1920,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: `linear-gradient(160deg, #0b1120 0%, #0f172a 40%, #131b2e 70%, #0f172a 100%)`,
        borderRadius: 32,
      }}
      className="relative text-white p-14 flex flex-col overflow-hidden select-none shadow-2xl"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accent}18 0%, transparent 70%)` }}
      />

      {/* ===== HEADER ===== */}
      <div className="relative z-10 flex flex-col items-center text-center pt-4">
        <span
          className="text-2xl font-black tracking-[0.35em] uppercase px-8 py-3 rounded-full border-2"
          style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}12` }}
        >
          X P O S E D
        </span>

        <div className="mt-10 relative">
          <div
            className="rounded-full"
            style={{
              width: 150,
              height: 150,
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
        <h2 className="text-[38px] font-bold text-slate-100 mt-6">@{data.username}</h2>
      </div>

      {/* ===== SPACER ===== */}
      <div className="flex-1" />

      {/* ===== SCORE ===== */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span
          className="font-black leading-none tracking-tight"
          style={{ fontSize: 180, color: accent }}
        >
          {data.overallScore}
        </span>
        <span
          className="text-[32px] font-bold tracking-[0.3em] uppercase mt-5"
          style={{ color: `${accent}cc` }}
        >
          OVERALL SCORE
        </span>
      </div>

      {/* ===== SPACER ===== */}
      <div className="flex-1" />

      {/* ===== STATS GRID ===== */}
      <div className="relative z-10 grid grid-cols-2 gap-6">
        <div className="rounded-2xl py-7 px-6 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-2xl font-bold tracking-wider flex items-center gap-2 mb-3" style={{ color: `${accent}bb` }}>
            <span style={{ color: accent }}>✦</span> AURA
          </span>
          <span className="text-[36px] font-black leading-tight" style={{ color: accent }}>{data.aura.vibe}</span>
        </div>
        <div className="rounded-2xl py-7 px-6 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-2xl font-bold text-slate-400 tracking-wider mb-3">🚫 BAN RISK</span>
          <span className="text-[44px] font-black leading-tight text-red-400">{data.banClock.score}%</span>
        </div>
        <div className="rounded-2xl py-7 px-6 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-2xl font-bold text-slate-400 tracking-wider mb-3">✦ BEAUTY</span>
          <span className="text-[44px] font-black leading-tight text-emerald-400">{data.beautyRanking.score}</span>
        </div>
        <div className="rounded-2xl py-7 px-6 flex flex-col justify-center border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
          <span className="text-2xl font-bold text-slate-400 tracking-wider mb-3">📉 FLOP RATE</span>
          <span className="text-[44px] font-black leading-tight text-amber-400">{data.flopRate.percentage}%</span>
        </div>
      </div>

      {/* ===== SPACER ===== */}
      <div className="flex-1" />

      {/* ===== AI VERDICT ===== */}
      <div className="relative z-10 rounded-2xl py-8 px-8 border" style={{ backgroundColor: '#111827e0', borderColor: `${accent}20` }}>
        <span className="text-2xl font-bold tracking-wider flex items-center gap-2 mb-4" style={{ color: accent }}>
          <span>✨</span> AI VERDICT
        </span>
        <p className="text-[30px] font-medium text-slate-200 italic leading-relaxed">
          &ldquo;{data.toast}&rdquo;
        </p>
      </div>

      {/* ===== SPACER ===== */}
      <div className="flex-1" />

      {/* ===== SPIRIT ANIMAL ===== */}
      <div className="relative z-10 rounded-2xl py-8 px-8 flex items-start gap-6 border" style={{ backgroundColor: '#111827cc', borderColor: '#1e293bcc' }}>
        <span className="text-7xl leading-none mt-1">{data.spiritAnimal.emoji}</span>
        <div className="flex-1">
          <span className="text-2xl font-bold text-slate-400 uppercase tracking-wider block mb-1">SPIRIT ANIMAL</span>
          <span className="text-[40px] font-extrabold text-white leading-tight block">{data.spiritAnimal.animal}</span>
          <p className="text-2xl text-slate-300 mt-2 leading-snug">{data.spiritAnimal.description}</p>
        </div>
      </div>

      {/* ===== SPACER ===== */}
      <div className="flex-1" />

      {/* ===== FOOTER ===== */}
      <div className="relative z-10 flex items-center justify-between pt-8 border-t border-slate-800/80">
        <div />
        <span className="text-2xl font-semibold text-slate-300 tracking-wide">xposed.mabdullah.top</span>
        <img
          src={qrUrl}
          alt="QR"
          className="w-[80px] h-[80px] rounded-xl"
          style={{ border: `2px solid ${accent}30` }}
          crossOrigin="anonymous"
        />
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
