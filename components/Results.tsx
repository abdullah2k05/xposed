'use client'

import type { XposedResult } from '@/lib/types'
import ProfileRating from './ProfileRating'
import AuraAnalysis from './AuraAnalysis'
import BeautyRanking from './BeautyRanking'
import FunExtras from './FunExtras'

export default function Results({ data }: { data: XposedResult }) {
  return (
    <>
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {data.avatarUrl && (
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-800 border-2 border-gray-700 shrink-0"
              style={{
                backgroundImage: `url(${data.avatarUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          <div className="text-left min-w-0">
            <h2 className="text-xl sm:text-2xl font-black text-white truncate max-w-[200px] sm:max-w-none">
              {data.displayName}
            </h2>
            <p className="text-sm text-gray-500">@{data.username}</p>
          </div>
          <div className="text-center shrink-0">
            <p className="text-[10px] text-gray-600 uppercase tracking-wider">Score</p>
            <p className="text-3xl sm:text-4xl font-black" style={{ color: data.aura.hex }}>
              {data.overallScore}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3 text-xs sm:text-sm text-gray-600 flex-wrap">
          <span>Ban: <span className="text-red-400 font-semibold">{data.banClock.score}%</span></span>
          <span className="text-gray-700 hidden sm:inline">·</span>
          <span className="block sm:hidden w-full h-0" />
          <span>Rating: <span className="text-yellow-400 font-semibold">{data.profileRating.overall}/10</span></span>
          <span className="text-gray-700">·</span>
          <span>Beauty: <span className="text-emerald-400 font-semibold">{data.beautyRanking.score}/100</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <AuraAnalysis data={data.aura} />
        <ProfileRating data={data.profileRating} />
      </div>

      <BeautyRanking data={data.beautyRanking} />

      <FunExtras data={data} />

      <div className="text-center pt-6 border-t border-gray-800">
        <p className="text-xs sm:text-sm text-gray-600 font-semibold">xposed.mabdullah.top</p>
      </div>
    </>
  )
}
