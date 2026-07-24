'use client'

import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { Share2, Download, Check } from 'lucide-react'
import type { XposedResult } from '@/lib/types'
import { useState } from 'react'

export default function ShareCard({ data }: { data: XposedResult }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (!cardRef.current) return
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
      })
      canvas.toBlob(async (blob) => {
        if (!blob) return
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ])
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          const link = document.createElement('a')
          link.download = `xposed-${data.username}.png`
          link.href = canvas.toDataURL()
          link.click()
        }
      })
    } catch {
      // fallback
    }
  }

  return (
    <div className="mt-6">
      <div
        ref={cardRef}
        className="bg-[#0a0a0f] rounded-2xl border border-gray-800 p-6 max-w-lg mx-auto"
      >
        <div className="flex items-center gap-3 mb-4">
          {data.avatarUrl && (
            <div
              className="w-12 h-12 rounded-full bg-gray-800"
              style={{
                backgroundImage: `url(${data.avatarUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          <div>
            <p className="text-lg font-bold text-white">{data.displayName}</p>
            <p className="text-sm text-gray-500">@{data.username}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-600">XPOSED</p>
            <p
              className="text-2xl font-black"
              style={{ color: data.aura.hex }}
            >
              {data.overallScore}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg"
            style={{ backgroundColor: data.aura.hex }}
          />
          <div>
            <p className="text-sm text-white font-semibold">
              {data.aura.vibe}
            </p>
            <p className="text-xs text-gray-500">{data.npcClass.emoji} {data.npcClass.title}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-500">Ban Risk</p>
            <p className="text-sm font-bold text-red-400">{data.banClock.score}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Rating</p>
            <p className="text-sm font-bold text-yellow-400">{data.profileRating.overall}/10</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-3 mt-2">
          <p className="text-xs text-gray-500 text-center">
            xposed.app — your profile, exposed.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy Card
            </>
          )}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just got xposed! My overall score: ${data.overallScore}/100\nBan risk: ${data.banClock.score}% | Aura: ${data.aura.color}\n\nGet exposed at:`)}&url=xposed.app`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white text-sm font-semibold transition-all"
        >
          <Share2 className="w-4 h-4" /> Share on X
        </a>
      </div>
    </div>
  )
}

function Copy(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}
