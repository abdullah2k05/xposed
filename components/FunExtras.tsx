'use client'

import type { XposedResult } from '@/lib/types'
import { MessageSquareQuote, Hash, TrendingDown, PawPrint, Heart } from 'lucide-react'

interface FunExtrasProps {
  data: XposedResult
}

export default function FunExtras({ data }: FunExtrasProps) {
  const items = [
    {
      icon: MessageSquareQuote,
      label: 'Signature Tweet',
      content: (
        <div>
          <p className="text-sm text-white italic mb-2">"{data.signatureTweet.text}"</p>
          <p className="text-xs text-gray-500">{data.signatureTweet.commentary}</p>
        </div>
      ),
    },
    {
      icon: Hash,
      label: 'Overused Word',
      content: (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-black text-pink-400">"{data.overusedWord.word}"</span>
            <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">
              x{data.overusedWord.count}
            </span>
          </div>
          <p className="text-xs text-gray-500">{data.overusedWord.commentary}</p>
        </div>
      ),
    },
    {
      icon: TrendingDown,
      label: 'Flop Rate',
      content: (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-black text-orange-400">{data.flopRate.percentage}%</span>
            <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">
              {data.flopRate.label}
            </span>
          </div>
          <p className="text-xs text-gray-500">{data.flopRate.commentary}</p>
        </div>
      ),
    },
    {
      icon: PawPrint,
      label: 'Spirit Animal',
      content: (
        <div className="flex items-center gap-3">
          <span className="text-4xl">{data.spiritAnimal.emoji}</span>
          <div>
            <p className="text-sm font-bold text-white">{data.spiritAnimal.animal}</p>
            <p className="text-xs text-gray-500">{data.spiritAnimal.description}</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <item.icon className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {item.label}
            </span>
          </div>
          {item.content}
        </div>
      ))}
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-5 md:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            The Toast
          </span>
        </div>
        <p className="text-sm text-emerald-300 leading-relaxed">{data.toast}</p>
      </div>
    </div>
  )
}
