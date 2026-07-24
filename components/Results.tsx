'use client'

import type { XposedResult } from '@/lib/types'
import ProfileRating from './ProfileRating'
import AuraAnalysis from './AuraAnalysis'
import BeautyRanking from './BeautyRanking'
import NpcClassCard from './NpcClassCard'
import FunExtras from './FunExtras'

export default function Results({ data }: { data: XposedResult }) {
  return (
    <>
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          {data.avatarUrl && (
            <div
              className="w-14 h-14 rounded-full bg-gray-800 border-2 border-gray-700"
              style={{
                backgroundImage: `url(${data.avatarUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          <div className="text-left">
            <h2 className="text-2xl font-black text-white">{data.displayName}</h2>
            <p className="text-gray-500">@{data.username}</p>
          </div>
          <div className="ml-4 text-center">
            <p className="text-xs text-gray-600 uppercase tracking-wider">Score</p>
            <p className="text-4xl font-black" style={{ color: data.aura.hex }}>
              {data.overallScore}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-600">
          <span>Ban risk: <span className="text-red-400 font-semibold">{data.banClock.score}%</span></span>
          <span>·</span>
          <span>Rating: <span className="text-yellow-400 font-semibold">{data.profileRating.overall}/10</span></span>
          <span>·</span>
          <span>Beauty: <span className="text-emerald-400 font-semibold">{data.beautyRanking.score}/100</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AuraAnalysis data={data.aura} />
        <ProfileRating data={data.profileRating} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BeautyRanking data={data.beautyRanking} />
        <NpcClassCard data={data.npcClass} />
      </div>

      <FunExtras data={data} />

      <div className="text-center py-4 border-t border-gray-800">
        <p className="text-sm text-gray-600 font-semibold">xposed.mabdullah.top</p>
      </div>
    </>
  )
}
