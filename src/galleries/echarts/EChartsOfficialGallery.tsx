import { useEffect, useMemo, useState } from 'react'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import { LazyEChartsCard } from './LazyEChartsCard'
import type { EChartsManifest } from './types'

export function EChartsOfficialGallery() {
  const [manifest, setManifest] = useState<EChartsManifest | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')

  useEffect(() => {
    let cancelled = false
    fetch('/echarts-official/manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error(`manifest ${r.status}`)
        return r.json()
      })
      .then((data: EChartsManifest) => {
        if (!cancelled) setManifest(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err))
      })
    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(() => {
    if (!manifest) return []
    const set = new Set(manifest.examples.map((e) => e.category))
    return ['all', ...[...set].sort()]
  }, [manifest])

  const filtered = useMemo(() => {
    if (!manifest) return []
    const q = query.trim().toLowerCase()
    return manifest.examples.filter((e) => {
      if (category !== 'all' && e.category !== category) return false
      if (!q) return true
      return (
        e.title.toLowerCase().includes(q) ||
        e.file.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      )
    })
  }, [manifest, query, category])

  const skipCount = manifest?.examples.filter((e) => e.skipReason).length ?? 0

  return (
    <div className="space-y-5">
      <FingerprintBanner library="echarts" />

      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-4 text-sm text-slate-400 light:border-slate-200 light:bg-white/80 light:text-slate-600">
        <p className="font-medium text-slate-100 light:text-slate-900">ECharts Official Gallery — all on one page</p>
        <p className="mt-1 text-xs leading-relaxed">
          Every official example is laid out in a scrollable grid on this page (no popup, no
          side-panel pick). Charts <span className="text-slate-200">lazy-load as you scroll</span>{' '}
          so the browser does not open ~300 canvases at once.
          {manifest ? (
            <>
              {' '}
              — <span className="text-slate-200 light:text-slate-800">{manifest.count}</span> examples
              {skipCount > 0 && (
                <>
                  , <span className="text-amber-300">{skipCount}</span> skip cards (maps / bmap)
                </>
              )}
              .
            </>
          ) : (
            <> — loading manifest…</>
          )}
        </p>
      </div>

      <div className="sticky top-0 z-10 -mx-1 flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-[#0b1220]/95 px-3 py-3 backdrop-blur light:border-slate-200 light:bg-white/95 lg:flex-row lg:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, file, category…"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-600 focus:ring-2 light:border-slate-300 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 lg:max-w-md"
        />
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                category === c
                  ? 'bg-sky-600 text-white'
                  : 'border border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600 light:border-slate-200 light:bg-white light:text-slate-600 light:hover:border-slate-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">
          Failed to load manifest: {error}
        </div>
      )}

      {!manifest && !error && (
        <p className="text-sm text-slate-500">Loading official examples manifest…</p>
      )}

      {manifest && (
        <p className="text-xs text-slate-500">
          Showing {filtered.length} of {manifest.count} on this page
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {filtered.map((ex) => (
          <LazyEChartsCard key={ex.id} example={ex} />
        ))}
      </div>

      {manifest && !filtered.length && (
        <p className="py-16 text-center text-sm text-slate-500">No matches for this filter</p>
      )}
    </div>
  )
}
