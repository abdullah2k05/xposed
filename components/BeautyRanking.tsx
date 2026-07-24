'use client'

import { Trophy, Globe } from 'lucide-react'
import type { BeautyRanking as BeautyRankingType } from '@/lib/types'

export default function BeautyRanking({ data }: { data: BeautyRankingType }) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-500/10">
          <Trophy className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Beauty + Ranking</h3>
        <div className="ml-auto text-right">
          <span className="text-3xl font-black text-white">{data.score}</span>
          <span className="text-gray-500 text-sm">/100</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800/50 rounded-xl p-3 text-center">
          <Globe className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <p className="text-xs text-gray-500">World Rank</p>
          <p className="text-lg font-bold text-white">#{data.worldRank.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3 text-center">
          <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
          <p className="text-xs text-gray-500">National Rank</p>
          <p className="text-lg font-bold text-white">#{data.nationalRank.toLocaleString()}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{data.description}</p>
    </div>
  )
}
