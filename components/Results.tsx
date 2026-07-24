'use client'

import type { XposedResult } from '@/lib/types'
import BanClock from './BanClock'
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

      <div className="text-center py-4 border-t border-gray-800">
        <p className="text-sm text-gray-600 font-semibold">xposed.mabdullah.top</p>
      </div>
    </>
  )
}
