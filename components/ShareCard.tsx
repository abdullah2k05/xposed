'use client'

import { forwardRef } from 'react'
import type { XposedResult } from '@/lib/types'

interface ShareCardProps {
  data: XposedResult
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ data }, ref) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=${encodeURIComponent('https://xposed.mabdullah.top')}&bgcolor=0a0a0f&color=ffffff&margin=0`

  return (
    <div
      ref={ref}
      style={{ width: 1080, height: 1350, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      className="relative bg-slate-950 text-white p-12 flex flex-col justify-between overflow-hidden select-none"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${data.aura.hex}25` }} />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: `${data.aura.hex}15` }} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-2xl font-black tracking-[0.3em] uppercase px-6 py-2.5 rounded-full border" style={{ color: data.aura.hex, backgroundColor: `${data.aura.hex}15`, borderColor: `${data.aura.hex}30` }}>
          X P O S E D
        </span>

        <div className="mt-8 relative">
          <div className="w-28 h-28 rounded-full p-[3px]" style={{ background: `linear-gradient(135deg, ${data.aura.hex}, #f59e0b)`, boxShadow: `0 0 40px ${data.aura.hex}40` }}>
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${data.avatarUrl})` }}
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-200 mt-4">@{data.username}</h2>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center my-4">
        <div
          className="text-[120px] font-black leading-none"
          style={{
            color: data.aura.hex,
            filter: `drop-shadow(0 10px 35px ${data.aura.hex}60)`,
          }}
        >
          {data.overallScore}
        </div>
        <span className="text-sm font-bold text-slate-400 tracking-[0.25em] uppercase mt-2">
          OVERALL SCORE
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-5 my-2">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
            <span style={{ color: data.aura.hex }}>✦</span> AURA
          </span>
          <span className="text-2xl font-black mt-1 truncate" style={{ color: data.aura.hex }}>{data.aura.vibe}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">🚫 BAN RISK</span>
          <span className="text-3xl font-black text-red-500 mt-1">{data.banClock.score}%</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">✦ BEAUTY</span>
          <span className="text-3xl font-black text-emerald-400 mt-1">{data.beautyRanking.score}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">📉 FLOP RATE</span>
          <span className="text-3xl font-black text-amber-400 mt-1">{data.flopRate.percentage}%</span>
        </div>
      </div>

      <div className="relative z-10 bg-slate-900/90 border border-slate-800/90 p-6 rounded-2xl">
        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: data.aura.hex }}>
          <span>✨</span> AI VERDICT
        </span>
        <p className="text-xl font-medium text-slate-200 italic mt-2 leading-relaxed">
          &ldquo;{data.toast}&rdquo;
        </p>
      </div>

      <div className="relative z-10 flex justify-between items-end pt-5 border-t border-slate-800/80">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{data.spiritAnimal.emoji}</span>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">SPIRIT ANIMAL</span>
            <span className="text-lg font-extrabold text-white">{data.spiritAnimal.animal}</span>
            <p className="text-xs text-slate-400 mt-0.5">{data.spiritAnimal.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 block">Xposed by</span>
            <span className="text-sm font-bold text-slate-300">xposed.mabdullah.top</span>
          </div>
          <img src={qrUrl} alt="QR" className="w-16 h-16 rounded-lg" style={{ backgroundColor: `${data.aura.hex}15`, border: `1px solid ${data.aura.hex}30` }} crossOrigin="anonymous" />
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
