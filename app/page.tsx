'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { Download, Share2, Link, Check, Image } from 'lucide-react'
import SearchInput from '@/components/SearchInput'
import Results from '@/components/Results'
import TopUsers from '@/components/TopUsers'
import ShareCard from '@/components/ShareCard'
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
  const [assetsReady, setAssetsReady] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true))
  }, [])

  useEffect(() => {
    if (!result) return
    setAssetsReady(fontsLoaded)
  }, [result, fontsLoaded])

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

  const captureCard = async (): Promise<Blob | null> => {
    if (!captureRef.current) return null
    await document.fonts.ready
    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: 1080,
      height: 1350,
    })
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const blob = await captureCard()
      if (!blob) return
      const link = document.createElement('a')
      link.download = `xposed-${result?.username}.png`
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  const handleShareImage = async () => {
    if (!result) return
    const blob = await captureCard()
    if (!blob) return

    const shareData: ShareData = {
      text:
        `I just got xposed! 🫣 Score: ${result.overallScore}/100 — Aura: ${result.aura.vibe}`,
      url: 'https://xposed.mabdullah.top',
    }

    if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'xposed.png', { type: 'image/png' })] })) {
      const file = new File([blob], 'xposed.png', { type: 'image/png' })
      await navigator.share({ ...shareData, files: [file] })
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `I just got xposed! 🫣\n\nScore: ${result.overallScore}/100\nAura: ${result.aura.color} — ${result.aura.vibe}\nBan Risk: ${result.banClock.score}%\nBeauty: ${result.beautyRanking.score}/100\nFlop Rate: ${result.flopRate.percentage}%\nSpirit Animal: ${result.spiritAnimal.emoji} ${result.spiritAnimal.animal}\n\nGet exposed at:`
        )}&url=${encodeURIComponent('https://xposed.mabdullah.top')}`,
        '_blank',
        'noopener'
      )
    }
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
            <Results data={result} />

            <hr className="my-10 sm:my-14 border-gray-800/60" />
            <div className="text-center mb-6">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-2">
                <Image className="w-5 h-5 text-purple-400" />
                Share Card Preview
              </h3>
              <p className="text-xs text-gray-500 mt-1">This image will be downloaded. Share it on X.</p>
            </div>

            {/* Preview: scaled visible card */}
            <div className="flex justify-center w-full max-w-[380px] sm:max-w-[500px] md:max-w-[650px] mx-auto">
              <div className="relative w-full" style={{ aspectRatio: '1080 / 1350' }}>
                <div className="absolute inset-0 overflow-hidden rounded-[32px]">
                  <div style={{ width: 1080, height: 1350, transformOrigin: '0 0' }} className="scale-[0.352] sm:scale-[0.463] md:scale-[0.602]">
                    <ShareCard data={result} />
                  </div>
                </div>
              </div>
            </div>

            {/* Capture target: fixed 1080x1350 off-screen */}
            <div
              ref={captureRef}
              style={{ position: 'absolute', left: -9999, top: 0, zIndex: -1 }}
            >
              <ShareCard data={result} />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <button
                onClick={handleDownload}
                disabled={downloading || !assetsReady}
                className="btn-primary w-full sm:w-auto"
              >
                {downloading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {downloading ? 'Rendering...' : 'Download Image'}
              </button>
              <button
                onClick={handleShareImage}
                disabled={!assetsReady}
                className="btn-secondary w-full sm:w-auto"
              >
                <Share2 className="w-5 h-5" />
                Share Image
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

            {!assetsReady && (
              <p className="text-center text-xs text-gray-600 mt-2">Loading assets for download...</p>
            )}
            {downloaded && (
              <p className="text-center text-xs text-emerald-400 font-medium mt-2">
                Downloaded at 1080×1350 — sharp on all screens
              </p>
            )}

            <div className="flex justify-center mt-8">
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
