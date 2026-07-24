'use client'

import type { StoredProfile } from '@/lib/types'
import { Trophy } from 'lucide-react'

function maskUsername(username: string): string {
  if (username.length <= 2) return username[0] + '*'
  const first = username[0]
  const last = username[username.length - 1]
  const middle = '*'.repeat(username.length - 2)
  return `${first}${middle}${last}`
}

export default function TopUsers({ users }: { users: StoredProfile[] }) {
  if (!users || users.length === 0) return null

  return (
    <div className="mt-20">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-black text-white">Top Xposed Profiles</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {users.map((user, i) => (
          <div
            key={user.id || i}
            className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800 p-3 text-center hover:border-gray-700 transition-all group"
          >
            <div className="text-xs font-bold text-gray-600 mb-1">#{i + 1}</div>
            <div
              className="w-10 h-10 rounded-full mx-auto mb-2 bg-gray-800"
              style={
                user.profile_image_url
                  ? {
                      backgroundImage: `url(${user.profile_image_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {}
              }
            />
            <p className="text-sm font-semibold text-white">{maskUsername(user.username)}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-xs text-gray-500">{user.npc_emoji}</span>
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: user.aura_color }}
              />
              <span className="text-xs text-gray-500">{user.overall_score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
