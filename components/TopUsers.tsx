'use client'

import type { StoredProfile } from '@/lib/types'
import { Trophy } from 'lucide-react'

function maskUsername(username: string): string {
  if (!username) return '***'
  if (username.length <= 2) return username[0] + '*'
  const first = username[0]
  const last = username[username.length - 1]
  const middle = '*'.repeat(username.length - 2)
  return `${first}${middle}${last}`
}

export default function TopUsers({ users }: { users: StoredProfile[] }) {
  if (!users || users.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 shrink-0" />
        <h2 className="text-xl sm:text-2xl font-black text-white">Top Xposed Profiles</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {users.map((user, i) => (
          <div
            key={user.id || i}
            className="card !p-3 sm:!p-4 text-center hover:border-gray-700 transition-colors"
          >
            <div className="text-[10px] sm:text-xs font-bold text-gray-600 mb-1">#{i + 1}</div>
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-2 bg-gray-800 bg-cover bg-center"
              style={
                user.profile_image_url
                  ? { backgroundImage: `url(${user.profile_image_url})` }
                  : {}
              }
            />
            <p className="text-xs sm:text-sm font-semibold text-white truncate">{maskUsername(user.username)}</p>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-[10px] sm:text-xs text-gray-500">{user.npc_emoji}</span>
              <span
                className="w-2 h-2 rounded-full inline-block shrink-0"
                style={{ backgroundColor: user.aura_color }}
              />
              <span className="text-[10px] sm:text-xs text-gray-500">{user.overall_score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
