'use client'

import { forwardRef } from 'react'
import type { XposedResult } from '@/lib/types'
import { Shield, Sparkles, TrendingDown, PawPrint } from 'lucide-react'

interface ShareCardProps {
  data: XposedResult
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ data }, ref) => {
  const gradient = `linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 30%, #0a0515 60%, #0d0a1a 100%)`
  const auraGlow = `0 0 30px ${data.aura.hex}40, 0 0 60px ${data.aura.hex}20`

  return (
    <div
      ref={ref}
      style={{
        width: 360,
        background: gradient,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
      className="rounded-3xl overflow-hidden shadow-2xl border border-gray-800/60"
    >
      {/* Top section */}
      <div className="flex flex-col items-center pt-8 pb-5 px-6">
        <span
          style={{ fontSize: 13, letterSpacing: '0.3em' }}
          className="font-black text-gray-600 mb-5"
        >
          XPOSED
        </span>

        {data.avatarUrl && (
          <div className="relative mb-3">
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                boxShadow: auraGlow,
                backgroundImage: `url(${data.avatarUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: `2px solid ${data.aura.hex}60`,
              }}
            />
          </div>
        )}

        <p style={{ fontSize: 15, lineHeight: '18px' }} className="font-semibold text-gray-300">
          @{data.username}
        </p>

        <div className="flex flex-col items-center mt-4 mb-2">
          <span style={{ fontSize: 72, lineHeight: '72px', color: data.aura.hex }} className="font-black tracking-tight">
            {data.overallScore}
          </span>
          <span style={{ fontSize: 10, letterSpacing: '0.15em' }} className="font-bold text-gray-600">
            OVERALL SCORE
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white/5 rounded-xl py-2.5 px-3 text-center">
            <p style={{ fontSize: 9 }} className="text-gray-600 font-semibold uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3 h-3 inline mr-1" style={{ color: data.aura.hex }} />
              Aura
            </p>
            <p style={{ fontSize: 13, color: data.aura.hex }} className="font-bold">
              {data.aura.vibe}
            </p>
          </div>
          <div className="bg-white/5 rounded-xl py-2.5 px-3 text-center">
            <p className="text-gray-600 font-semibold uppercase tracking-wider mb-0.5" style={{ fontSize: 9 }}>
              🚫 Ban
            </p>
            <p className="font-bold text-red-400" style={{ fontSize: 13 }}>
              {data.banClock.score}%
            </p>
          </div>
          <div className="bg-white/5 rounded-xl py-2.5 px-3 text-center">
            <p className="text-gray-600 font-semibold uppercase tracking-wider mb-0.5" style={{ fontSize: 9 }}>
              ✦ Beauty
            </p>
            <p className="font-bold text-emerald-400" style={{ fontSize: 13 }}>
              {data.beautyRanking.score}/100
            </p>
          </div>
          <div className="bg-white/5 rounded-xl py-2.5 px-3 text-center">
            <p className="text-gray-600 font-semibold uppercase tracking-wider mb-0.5" style={{ fontSize: 9 }}>
              📉 Flop
            </p>
            <p className="font-bold text-orange-400" style={{ fontSize: 13 }}>
              {data.flopRate.percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* AI Verdict */}
      <div className="px-6 py-3">
        <div className="bg-white/[0.03] rounded-2xl border border-white/5 p-4">
          <p className="text-gray-600 font-semibold mb-2 flex items-center gap-1.5" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
            <Sparkles className="w-3 h-3 text-purple-400" />
            AI VERDICT
          </p>
          <p className="text-gray-300 italic leading-relaxed" style={{ fontSize: 13, lineHeight: '20px' }}>
            &ldquo;{data.toast}&rdquo;
          </p>
        </div>
      </div>

      {/* Spirit Animal */}
      <div className="px-6 pb-4 flex items-center gap-3">
        <span style={{ fontSize: 28 }}>{data.spiritAnimal.emoji}</span>
        <div>
          <p className="text-gray-600 font-semibold" style={{ fontSize: 9, letterSpacing: '0.1em' }}>SPIRIT ANIMAL</p>
          <p className="text-gray-300 font-semibold" style={{ fontSize: 13 }}>{data.spiritAnimal.animal}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 px-6 py-3.5 flex items-center justify-between">
        <p className="text-gray-700 font-semibold" style={{ fontSize: 10, letterSpacing: '0.05em' }}>
          xposed.mabdullah.top
        </p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=48x48&data=${encodeURIComponent('https://xposed.mabdullah.top')}&bgcolor=0a0a0f&color=ffffff&margin=0`}
          alt="QR"
          style={{ width: 40, height: 40, borderRadius: 6 }}
          loading="lazy"
        />
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
