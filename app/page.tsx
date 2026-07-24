'use client'

import { useState, useCallback } from 'react'
import SearchInput from '@/components/SearchInput'
import Results from '@/components/Results'
import TopUsers from '@/components/TopUsers'
import type { XposedResult, StoredProfile } from '@/lib/types'

export default function Home() {
  const [result, setResult] = useState<XposedResult | null>(null)
  const [topUsers, setTopUsers] = useState<StoredProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = useCallback(async (username: string) => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`/api/analyze?username=${encodeURIComponent(username)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Analysis failed')
        return
      }
      setResult(data.result)
      if (data.topUsers) setTopUsers(data.topUsers)
    } catch {
      setError('Network error. Check your connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
            xposed
          </h1>
          <p className="text-lg text-gray-500 mt-3">
            Enter any <span className="text-white font-semibold">X username</span> and get your profile exposed.
          </p>
        </div>

        <SearchInput onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="mt-6 max-w-lg mx-auto bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {loading && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-gray-900/60 px-6 py-3 rounded-full border border-gray-800">
              <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">Fetching tweets, calculating ban risk, reading aura...</span>
            </div>
          </div>
        )}

        {result && <Results data={result} />}
        {topUsers.length > 0 && <TopUsers users={topUsers} />}

        <footer className="mt-32 text-center pb-8">
          <p className="text-xs text-gray-700">
            xposed — not affiliated with X Corp. Profiles are analyzed using public data.
          </p>
        </footer>
      </div>
    </main>
  )
}
