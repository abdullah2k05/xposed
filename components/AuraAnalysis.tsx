'use client'

import type { Aura as AuraType } from '@/lib/types'

export default function AuraAnalysis({ data }: { data: AuraType }) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-2xl shadow-lg flex-shrink-0"
          style={{ backgroundColor: data.hex }}
        />
        <div>
          <h3 className="text-lg font-bold text-white">Your Aura</h3>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: data.hex }}>
            {data.color}
          </span>
        </div>
        <div className="ml-auto">
          <span className="text-sm font-mono text-gray-500">{data.hex}</span>
        </div>
      </div>
      <div className="inline-block px-3 py-1 rounded-full bg-gray-800 text-sm text-purple-300 mb-3">
        {data.vibe}
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{data.description}</p>
    </div>
  )
}
