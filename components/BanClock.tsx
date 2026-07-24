'use client'

import { AlertTriangle, Clock } from 'lucide-react'
import type { BanClock as BanClockType } from '@/lib/types'

export default function BanClock({ data }: { data: BanClockType }) {
  const color =
    data.score > 70 ? 'from-red-500 to-orange-500' :
    data.score > 40 ? 'from-orange-400 to-yellow-400' :
    'from-green-400 to-emerald-400'

  const label =
    data.score > 80 ? 'TERMINAL' :
    data.score > 60 ? 'WATCHLISTED' :
    data.score > 40 ? 'SUSPICIOUS' :
    data.score > 20 ? 'CLEAN' : 'SAINT'

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-red-500/10">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Ban Clock</h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400">{label}</span>
        </div>
        <div className="ml-auto text-right">
          <span className="text-3xl font-black text-white">{data.score}%</span>
          <p className="text-xs text-gray-500">ban risk</p>
        </div>
      </div>

      <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{ width: `${data.score}%` }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4 text-orange-400" />
          <span>Estimated: <strong className="text-white">{data.daysEstimate} days</strong> until you are cooked</span>
        </div>
        <p className="text-sm text-gray-400">
          <span className="text-red-400 font-semibold">Most violative: </span>
          <span className="text-gray-300">{data.mostViolative}</span>
        </p>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">{data.analysis}</p>
      </div>
    </div>
  )
}
