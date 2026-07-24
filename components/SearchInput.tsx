'use client'

import { useState, FormEvent } from 'react'
import { Search, Loader2 } from 'lucide-react'
import clsx from 'clsx'

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
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />
        <div className="relative flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter any X username..."
            className={clsx(
              'w-full px-6 py-4 pl-14 text-lg rounded-2xl',
              'bg-gray-900/90 backdrop-blur-xl border border-gray-700',
              'text-white placeholder-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
              'transition-all duration-300'
            )}
            disabled={loading}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className={clsx(
              'absolute right-2 top-1/2 -translate-y-1/2',
              'px-6 py-2.5 rounded-xl font-semibold text-sm',
              'bg-gradient-to-r from-purple-600 to-pink-500 text-white',
              'hover:from-purple-500 hover:to-pink-400',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200'
            )}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'xpose'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
