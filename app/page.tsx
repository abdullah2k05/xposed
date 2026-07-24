'use client'

import { useState, useCallback, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Camera, Check, Link, Download } from 'lucide-react'
import SearchInput from '@/components/SearchInput'
import Results from '@/components/Results'
import TopUsers from '@/components/TopUsers'
import type { XposedResult, StoredProfile } from '@/lib/types'

export default function Home() {
  const [result, setResult] = useState<XposedResult | null>(null)
  const [topUsers, setTopUsers] = useState<StoredProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [captured, setCaptured] = useState(false)
  const [capturing, setCapturing] = useState(false)
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

  const handleCapture = async () => {
    if (!resultsRef.current) return
    setCapturing(true)
    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
      })

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      )
      if (!blob) return

      const file = new File([blob], `xposed-${result?.username}.png`, { type: 'image/png' })
      const shareUrl = 'https://xposed.mabdullah.top'
      const shareText = `I just got xposed! Score: ${result?.overallScore}/100 | Ban: ${result?.banClock.score}% | Aura: ${result?.aura.color}`

      // Try native share (mobile — shares image + text together)
      if (navigator.canShare && navigator.canShare({ files: [file], text: shareText, url: shareUrl })) {
        await navigator.share({ files: [file], text: shareText, url: shareUrl })
      } else {
        // Fallback: copy image to clipboard + open tweet intent
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        } catch {
          // If clipboard fails, download the image
          const link = document.createElement('a')
          link.download = `xposed-${result?.username}.png`
          link.href = canvas.toDataURL()
          link.click()
        }
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + '\n\n📸 Image copied to clipboard — paste it here!\n\n')}&url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'noopener'
        )
      }

      setCaptured(true)
      setTimeout(() => setCaptured(false), 4000)
    } catch (err) {
      console.error('Capture failed:', err)
    } finally {
      setCapturing(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://xposed.mabdullah.top')
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

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
              <span className="text-gray-400 text-sm">Fetching tweets, reading aura, calculating score...</span>
            </div>
          </div>
        )}

        {result && (
          <div ref={resultsRef} className="space-y-8">
            <Results data={result} />

            <div className="flex justify-center gap-3 pb-8">
              <button
                onClick={handleCapture}
                disabled={capturing}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-base transition-all shadow-lg shadow-purple-500/25"
              >
                {capturing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : captured ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
                {capturing ? 'Capturing...' : captured ? 'Shared!' : '📸 Capture & Share'}
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-base transition-all border border-gray-700"
              >
                {linkCopied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Link className="w-5 h-5" />
                )}
                {linkCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        )}

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
