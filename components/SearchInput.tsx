'use client'

import { useState, FormEvent } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface SearchInputProps {
  onAnalyze: (username: string) => void
  loading: boolean
}

export default function SearchInput({ onAnalyze, loading }: SearchInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const clean = value.replace(/^@/, '').trim()
    if (clean) onAnalyze(clean)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
        <div className="relative flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter any X username..."
            className="w-full h-[48px] sm:h-[52px] pl-12 pr-24 sm:pr-28 text-base sm:text-lg rounded-xl bg-gray-900/90 backdrop-blur-xl border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            disabled={loading}
            autoComplete="off"
            spellCheck={false}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-[40px] sm:h-[44px] px-4 sm:px-5 rounded-lg font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-500 hover:to-pink-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 select-none"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'xpose'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
