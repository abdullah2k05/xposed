'use client'

import { useState, useCallback, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Download, Share2, Link, Check } from 'lucide-react'
import SearchInput from '@/components/SearchInput'
import Results from '@/components/Results'
import TopUsers from '@/components/TopUsers'
import Donate from '@/components/Donate'
import type { XposedResult, StoredProfile } from '@/lib/types'

export default function Home() {
  const [result, setResult] = useState<XposedResult | null>(null)
  const [topUsers, setTopUsers] = useState<StoredProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

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

  const handleDownload = async () => {
    if (!resultsRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `xposed-${result?.username}.png`
      link.href = canvas.toDataURL()
      link.click()
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = () => {
    if (!result) return
    const text =
      `I just got xposed! 🫣\n\n` +
      `Score: ${result.overallScore}/100\n` +
      `Ban Risk: ${result.banClock.score}%\n` +
      `Aura: ${result.aura.color} — ${result.aura.vibe}\n` +
      `Rating: ${result.profileRating.overall}/10\n` +
      `Beauty: ${result.beautyRanking.score}/100\n` +
      `Flop Rate: ${result.flopRate.percentage}%\n` +
      `Spirit Animal: ${result.spiritAnimal.emoji} ${result.spiritAnimal.animal}\n\n` +
      `Get exposed at:`

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://xposed.mabdullah.top')}`,
      '_blank',
      'noopener'
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://xposed.mabdullah.top')
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-[2.5rem] leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
            xposed
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mt-2 sm:mt-3 max-w-readable mx-auto">
            Enter any <span className="text-white font-semibold">X username</span> and get your profile exposed.
          </p>
        </header>

        <SearchInput onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="mt-6 max-w-lg mx-auto bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {loading && (
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-gray-900/60 px-5 py-3 rounded-xl border border-gray-800">
              <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">Reading aura, calculating score...</span>
            </div>
          </div>
        )}

        {result && (
          <>
            <hr className="my-10 sm:my-14 border-gray-800/60" />
            <div ref={resultsRef} className="space-y-5 sm:space-y-6">
              <Results data={result} />
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="btn-primary w-full sm:w-auto"
                >
                  {downloading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  {downloading ? 'Downloading...' : 'Download Image'}
                </button>
                <button
                  onClick={handleShare}
                  className="btn-secondary w-full sm:w-auto"
                >
                  <Share2 className="w-5 h-5" />
                  Share on X
                </button>
                <button
                  onClick={handleCopyLink}
                  className="btn-secondary w-full sm:w-auto"
                >
                  {linkCopied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Link className="w-5 h-5" />
                  )}
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              {downloaded && (
                <p className="text-center text-xs text-emerald-400 font-medium">Image downloaded!</p>
              )}
            </div>
            <div className="flex justify-center">
              <Donate />
            </div>
          </>
        )}

        {topUsers.length > 0 && (
          <>
            <hr className="my-14 sm:my-20 border-gray-800/60" />
            <TopUsers users={topUsers} />
          </>
        )}

        <footer className="mt-16 sm:mt-24 text-center pb-6 sm:pb-8">
          <Donate />
          <p className="text-xs text-gray-700 mt-8">
            xposed — not affiliated with X Corp. Profiles are analyzed using public data.
          </p>
        </footer>
      </div>
    </main>
  )
}
