'use client'

import { Trophy, Globe } from 'lucide-react'
import type { BeautyRanking as BeautyRankingType } from '@/lib/types'

export default function BeautyRanking({ data }: { data: BeautyRankingType }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="card-icon bg-emerald-500/10">
          <Trophy className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">Beauty + Ranking</h3>
        <div className="ml-auto text-right">
          <span className="text-2xl sm:text-3xl font-black text-white">{data.score}</span>
          <span className="text-gray-500 text-xs sm:text-sm">/100</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 text-center">
          <Globe className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">World Rank</p>
          <p className="text-base sm:text-lg font-bold text-white">#{data.worldRank.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 text-center">
          <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1.5" />
          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">National Rank</p>
          <p className="text-base sm:text-lg font-bold text-white">#{data.nationalRank.toLocaleString()}</p>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{data.description}</p>
    </div>
  )
}
