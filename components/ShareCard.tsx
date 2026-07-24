'use client'

import { forwardRef } from 'react'
import type { XposedResult } from '@/lib/types'
import { Sparkles } from 'lucide-react'

interface ShareCardProps {
  data: XposedResult
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ data }, ref) => {
  const gradient = `linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 30%, #0a0515 60%, #0d0a1a 100%)`
  const auraGlow = `0 0 40px ${data.aura.hex}40, 0 0 80px ${data.aura.hex}20`

  return (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1350,
        background: gradient,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="rounded-[32px] overflow-hidden shadow-2xl border border-gray-800/60"
    >
      {/* Top section — flex-grow to push footer down */}
      <div className="flex flex-col items-center justify-center flex-1 px-12 pt-12 pb-4">
        <span style={{ fontSize: 20, letterSpacing: '0.4em' }} className="font-black text-gray-600 mb-8">
          X P O S E D
        </span>

        {data.avatarUrl && (
          <div className="relative mb-5">
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                boxShadow: auraGlow,
                backgroundImage: `url(${data.avatarUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: `3px solid ${data.aura.hex}60`,
              }}
            />
          </div>
        )}

        <p style={{ fontSize: 24, lineHeight: '28px' }} className="font-semibold text-gray-300">
          @{data.username}
        </p>

        <div className="flex flex-col items-center mt-6 mb-4">
          <span
            style={{ fontSize: 140, lineHeight: '140px', color: data.aura.hex }}
            className="font-black tracking-tight"
          >
            {data.overallScore}
          </span>
          <span style={{ fontSize: 16, letterSpacing: '0.25em', marginTop: 8 }} className="font-bold text-gray-600">
            OVERALL SCORE
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-12 pb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-2xl py-4 px-3 text-center">
            <p style={{ fontSize: 13 }} className="text-gray-600 font-bold uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" style={{ color: data.aura.hex }} />
              Aura
            </p>
            <p style={{ fontSize: 16, color: data.aura.hex, lineHeight: '20px' }} className="font-bold leading-tight">
              {data.aura.vibe}
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl py-4 px-3 text-center">
            <p className="text-gray-600 font-bold uppercase tracking-wider mb-2" style={{ fontSize: 13 }}>
              🚫 Ban
            </p>
            <p className="font-bold text-red-400" style={{ fontSize: 28, lineHeight: '32px' }}>
              {data.banClock.score}%
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl py-4 px-3 text-center">
            <p className="text-gray-600 font-bold uppercase tracking-wider mb-2" style={{ fontSize: 13 }}>
              ✦ Beauty
            </p>
            <p className="font-bold text-emerald-400" style={{ fontSize: 28, lineHeight: '32px' }}>
              {data.beautyRanking.score}
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl py-4 px-3 text-center">
            <p className="text-gray-600 font-bold uppercase tracking-wider mb-2" style={{ fontSize: 13 }}>
              📉 Flop
            </p>
            <p className="font-bold text-orange-400" style={{ fontSize: 28, lineHeight: '32px' }}>
              {data.flopRate.percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* AI Verdict */}
      <div className="px-12 pb-5">
        <div className="bg-white/[0.03] rounded-2xl border border-white/5 p-6">
          <p className="text-gray-600 font-bold mb-3 flex items-center gap-2" style={{ fontSize: 13, letterSpacing: '0.15em' }}>
            <Sparkles className="w-4 h-4 text-purple-400" />
            AI VERDICT
          </p>
          <p className="text-gray-300 italic" style={{ fontSize: 20, lineHeight: '30px' }}>
            &ldquo;{data.toast}&rdquo;
          </p>
        </div>
      </div>

      {/* Spirit Animal */}
      <div className="px-12 pb-8 flex items-start gap-5">
        <span style={{ fontSize: 48, lineHeight: '56px' }}>{data.spiritAnimal.emoji}</span>
        <div className="pt-1">
          <p className="text-gray-600 font-bold" style={{ fontSize: 13, letterSpacing: '0.12em', marginBottom: 4 }}>SPIRIT ANIMAL</p>
          <p className="text-white font-bold" style={{ fontSize: 22, lineHeight: '26px' }}>{data.spiritAnimal.animal}</p>
          <p className="text-gray-500" style={{ fontSize: 16, lineHeight: '22px', marginTop: 6 }}>{data.spiritAnimal.description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 px-12 py-5 flex items-center justify-between">
        <p className="text-gray-700 font-semibold" style={{ fontSize: 16, letterSpacing: '0.05em' }}>
          xposed.mabdullah.top
        </p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=${encodeURIComponent('https://xposed.mabdullah.top')}&bgcolor=0a0a0f&color=ffffff&margin=0`}
          alt="QR"
          style={{ width: 60, height: 60, borderRadius: 10 }}
          crossOrigin="anonymous"
        />
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
