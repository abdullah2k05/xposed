'use client'

import type { XposedResult } from '@/lib/types'
import { TrendingDown, PawPrint, Heart } from 'lucide-react'

interface FunExtrasProps {
  data: XposedResult
}

export default function FunExtras({ data }: FunExtrasProps) {
  const items = [
    {
      icon: TrendingDown,
      label: 'Flop Rate',
      content: (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-2xl font-black text-orange-400">{data.flopRate.percentage}%</span>
            <span className="text-[10px] sm:text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">
              {data.flopRate.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{data.flopRate.commentary}</p>
        </div>
      ),
    },
    {
      icon: PawPrint,
      label: 'Spirit Animal',
      content: (
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl shrink-0">{data.spiritAnimal.emoji}</span>
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-bold text-white truncate">{data.spiritAnimal.animal}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{data.spiritAnimal.description}</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {items.map((item) => (
        <div key={item.label} className="card">
          <div className="flex items-center gap-2 mb-3">
            <item.icon className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
              {item.label}
            </span>
          </div>
          {item.content}
        </div>
      ))}
      <div className="card sm:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
            The Toast
          </span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">{data.toast}</p>
      </div>
    </div>
  )
}
