'use client'

import type { NpcClass as NpcClassType } from '@/lib/types'
import { Sparkles } from 'lucide-react'

export default function NpcClassCard({ data }: { data: NpcClassType }) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-bold text-white">NPC Class</h3>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-5 text-center mb-3">
        <span className="text-5xl block mb-3">{data.emoji}</span>
        <h4 className="text-xl font-black text-white">{data.title}</h4>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{data.description}</p>
    </div>
  )
}
