'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { Camera, Check, Link, Download, X, Copy } from 'lucide-react'
import SearchInput from '@/components/SearchInput'
import Results from '@/components/Results'
import TopUsers from '@/components/TopUsers'
import type { XposedResult, StoredProfile } from '@/lib/types'

export default function Home() {
  const [result, setResult] = useState<XposedResult | null>(null)
  const [topUsers, setTopUsers] = useState<StoredProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [capturing, setCapturing] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [showToast, setShowToast] = useState<'clipboard' | 'download' | 'share' | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current) }
  }, [])

  const showToastMsg = (type: 'clipboard' | 'download' | 'share', duration = 5000) => {
    setShowToast(type)
    toastTimer.current = setTimeout(() => setShowToast(null), duration)
  }

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
    setCapturedImage(null)
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
      if (!blob) { setCapturing(false); return }

      const dataUrl = canvas.toDataURL()
      setCapturedImage(dataUrl)

      const file = new File([blob], `xposed-${result?.username}.png`, { type: 'image/png' })
      const shareUrl = 'https://xposed.mabdullah.top'
      const shareText = `I just got xposed! Score: ${result?.overallScore}/100 | Ban: ${result?.banClock.score}% | Aura: ${result?.aura.color}\n\n${shareUrl}`

      // 1) Try native share (mobile — includes image + text together)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: shareText, url: shareUrl })
          showToastMsg('share')
          setCapturing(false)
          return
        } catch {
          // user cancelled or failed
        }
      }

      // 2) Desktop: copy to clipboard + open compose
      let clipboardOk = false
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        clipboardOk = true
      } catch {
        // clipboard denied — download instead
      }

      if (clipboardOk) {
        showToastMsg('clipboard')
      } else {
        const a = document.createElement('a')
        a.download = `xposed-${result?.username}.png`
        a.href = dataUrl
        a.click()
        showToastMsg('download')
      }

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent('I just got xposed! 🫣\n\n')}&url=${encodeURIComponent(shareUrl)}`,
        '_blank',
        'noopener'
      )
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
                  onClick={handleCapture}
                  disabled={capturing}
                  className="btn-primary w-full sm:w-auto"
                >
                  {capturing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5" />
                  )}
                  {capturing ? 'Capturing...' : 'Capture & Share'}
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

              {capturedImage && showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setShowPreview(false)}>
                  <div className="relative max-w-lg w-full max-h-[90vh] overflow-auto rounded-2xl" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center z-10"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <img src={capturedImage} alt="xposed report" className="w-full rounded-2xl" />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={async () => {
                          const res = await fetch(capturedImage)
                          const blob = await res.blob()
                          try {
                            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
                            showToastMsg('clipboard', 3000)
                          } catch {
                            const a = document.createElement('a')
                            a.download = `xposed-${result?.username}.png`
                            a.href = capturedImage
                            a.click()
                          }
                        }}
                        className="btn-primary flex-1 text-sm"
                      >
                        <Copy className="w-4 h-4" /> Copy Image
                      </button>
                      <a
                        href={capturedImage}
                        download={`xposed-${result?.username}.png`}
                        className="btn-secondary flex-1 text-sm"
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">Right-click + copy, or drag into Twitter compose</p>
                  </div>
                </div>
              )}

              {/* Toast notifications */}
              {showToast === 'share' && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/90 backdrop-blur-xl text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in">
                  <Check className="w-4 h-4" /> Shared successfully!
                </div>
              )}
              {showToast === 'clipboard' && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-purple-600/90 backdrop-blur-xl text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in max-w-sm text-center">
                  <Check className="w-4 h-4 shrink-0" /> Image copied! Open Twitter compose and paste (<span className="font-mono">Ctrl+V</span>)
                </div>
              )}
              {showToast === 'download' && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800/95 backdrop-blur-xl text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in max-w-sm text-center">
                  <Download className="w-4 h-4 shrink-0" /> Image downloaded — drag it into the tweet compose window
                </div>
              )}
              </div>
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
          <p className="text-xs text-gray-700">
            xposed — not affiliated with X Corp. Profiles are analyzed using public data.
          </p>
        </footer>
      </div>
    </main>
  )
}
