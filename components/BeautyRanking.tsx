'use client'

import { Trophy, Globe } from 'lucide-react'
import type { BeautyRanking as BeautyRankingType } from '@/lib/types'

export default function BeautyRanking({ data }: { data: BeautyRankingType }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <div className="card-icon bg-emerald-500/10">
          <Trophy className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">Beauty + Ranking</h3>
        <div className="ml-auto text-right">
          <span className="text-xl sm:text-2xl font-black text-white">{data.score}</span>
          <span className="text-gray-500 text-xs">/100</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-400 flex-wrap">
        <span className="flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          World #{data.worldRank.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          National #{data.nationalRank.toLocaleString()}
        </span>
        <span className="text-gray-600">{data.description}</span>
      </div>
    </div>
  )
}
