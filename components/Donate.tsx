'use client'

import { useState } from 'react'
import { Heart, Copy, Check, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'

const wallets = [
  {
    label: 'USDT (TRC20)',
    address: 'TDXhsg1XhMnrwY4kYTycnm9gvExp9akZd1',
    network: 'TRC20',
  },
  {
    label: 'Ethereum (ETH)',
    address: '0x7a04fc8a46795c3245be2de84a26c3ba90ff0f74',
    network: 'ERC20',
  },
  {
    label: 'Bitcoin (BTC)',
    address: '1LvyZ3XqCd8NJtxM7Jg2Z5Q1TVBEtxSafA',
    network: 'Bitcoin',
  },
  {
    label: 'BNB',
    address: '0x7a04fc8a46795c3245be2de84a26c3ba90ff0f74',
    network: 'BSC (BEP20)',
    warning: '⚠️ Only send BNB on BSC (BEP20) network. Sending on the wrong network may result in permanent loss.',
  },
]

export default function Donate() {
  const [open, setOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (address: string, index: number) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = address
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  return (
    <div className="mt-6 sm:mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
      >
        <Heart className="w-4 h-4 text-red-400" />
        Support the project
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {open && (
        <div className="mt-4 max-w-lg mx-auto bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 p-5 sm:p-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-bold text-white">Support xposed</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mb-4">
            Running this costs money (API credits, hosting). If you find it fun, send a tip:
          </p>

          <div className="space-y-2.5">
            {wallets.map((w, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-semibold text-white">{w.label}</span>
                  <button
                    onClick={() => handleCopy(w.address, i)}
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors shrink-0"
                  >
                    {copiedIndex === i ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] sm:text-xs font-mono text-gray-500 break-all">{w.address}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Network: {w.network}</p>
                {w.warning && (
                  <p className="text-[10px] text-red-400/80 mt-1.5 flex items-start gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{w.warning}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <p className="text-[11px] sm:text-xs text-red-400/80 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                <strong>Important:</strong> Always send the asset using the specified network. Sending funds on the wrong network may result in permanent loss of funds. Binance account: <span className="font-semibold text-red-300">abdullah2k05</span>
              </span>
            </p>
          </div>

          <p className="text-[10px] text-gray-600 text-center mt-3">Thank you for your support! 🙏</p>
        </div>
      )}
    </div>
  )
}
