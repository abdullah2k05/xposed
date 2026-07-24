'use client'

import type { Aura as AuraType } from '@/lib/types'

export default function AuraAnalysis({ data }: { data: AuraType }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl shadow-lg shrink-0"
          style={{ backgroundColor: data.hex }}
        />
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white">Your Aura</h3>
          <span className="text-xs font-semibold uppercase tracking-wider truncate block" style={{ color: data.hex }}>
            {data.color}
          </span>
        </div>
        <div className="ml-auto shrink-0">
          <span className="text-xs font-mono text-gray-500">{data.hex}</span>
        </div>
      </div>
      <div className="inline-block px-3 py-1 rounded-full bg-gray-800 text-xs sm:text-sm text-purple-300 mb-3">
        {data.vibe}
      </div>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{data.description}</p>
    </div>
  )
}
