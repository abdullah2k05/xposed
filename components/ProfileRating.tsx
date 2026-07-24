'use client'

import { Star } from 'lucide-react'
import type { ProfileRating as ProfileRatingType } from '@/lib/types'

const labels = {
  bio: 'Bio',
  banner: 'Banner',
  avatar: 'Avatar',
  pinTweet: 'Pin Tweet',
  vibe: 'Vibe',
}

export default function ProfileRating({ data }: { data: ProfileRatingType }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="card-icon bg-yellow-500/10">
          <Star className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">Profile Rating</h3>
        <div className="ml-auto flex items-baseline gap-0.5">
          <span className="text-2xl sm:text-3xl font-black text-white">{data.overall}</span>
          <span className="text-gray-500 text-sm sm:text-base">/10</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => {
          const score = data.breakdown[key]
          return (
            <div key={key}>
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-400">{labels[key]}</span>
                <span className="text-white font-semibold">{score}/10</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-700"
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
