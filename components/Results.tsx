'use client'

import type { XposedResult } from '@/lib/types'
import BanClock from './BanClock'
import ProfileRating from './ProfileRating'
import AuraAnalysis from './AuraAnalysis'
import BeautyRanking from './BeautyRanking'
import NpcClassCard from './NpcClassCard'
import FunExtras from './FunExtras'
import ShareCard from './ShareCard'

export default function Results({ data }: { data: XposedResult }) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-black text-white mb-1">
          {data.displayName}
        </h2>
        <p className="text-gray-500">@{data.username}</p>
        <div className="mt-3 inline-flex items-center gap-2 bg-gray-900/60 px-4 py-2 rounded-full border border-gray-800">
          <span className="text-sm text-gray-400">Overall Score</span>
          <span
            className="text-2xl font-black"
            style={{ color: data.aura.hex }}
          >
            {data.overallScore}
          </span>
          <span className="text-sm text-gray-600">/100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BanClock data={data.banClock} />
        <ProfileRating data={data.profileRating} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AuraAnalysis data={data.aura} />
        <BeautyRanking data={data.beautyRanking} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NpcClassCard data={data.npcClass} />
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-2" style={{ color: data.aura.hex }}>{data.overallScore}</div>
          <p className="text-sm text-gray-500">Overall Score</p>
        </div>
      </div>

      <FunExtras data={data} />
      <ShareCard data={data} />
    </div>
  )
}
