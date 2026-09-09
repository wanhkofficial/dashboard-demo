import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import type { EChartsExampleMeta } from './types'
import { runOfficialExample } from './runOfficialExample'
import { useTheme } from '../../theme/ThemeContext'

type Props = {
  example: EChartsExampleMeta
  /** Inline page panel — no modal / popup */
  className?: string
}

export function EChartsExampleViewer({ example, className = '' }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'skipped'>('loading')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    let chart: echarts.EChartsType | null = null
    let ro: ResizeObserver | null = null

    async function load() {
      if (example.skipReason && /bmap|map \/ geoJSON|Baidu/i.test(example.skipReason)) {
        setStatus('skipped')
        setMessage(example.skipReason)
        return
      }

      setStatus('loading')
      setMessage('')

      try {
        const res = await fetch(`/echarts-official/${example.file}`)
        if (!res.ok) throw new Error(`Failed to load ${example.file} (${res.status})`)
        const code = await res.text()
        if (cancelled) return

        const el = hostRef.current
        if (!el) return

        chart = echarts.init(el, theme === 'dark' ? 'dark' : undefined, { renderer: 'canvas' })
        ro = new ResizeObserver(() => chart?.resize())
        ro.observe(el)

        let ecStat: unknown
        try {
          const mod = await import('echarts-stat')
          ecStat = (mod as { default?: unknown }).default ?? mod
          const transform = (ecStat as { transform?: Record<string, unknown> })?.transform
          if (transform) {
            // @ts-expect-error echarts registerTransform
            echarts.registerTransform?.(transform.regression)
            // @ts-expect-error
            echarts.registerTransform?.(transform.histogram)
            // @ts-expect-error
            echarts.registerTransform?.(transform.clustering)
          }
        } catch {
          ecStat = undefined
        }

        const result = await runOfficialExample(code, chart, { ecStat })
        if (cancelled) return

        if (result.error && !result.option) {
          setStatus('error')
          setMessage(result.error)
          return
        }
        if (result.error && result.option) {
          setStatus('ready')
          setMessage(`Rendered with warning: ${result.error}`)
          return
        }
        setStatus('ready')
        setMessage(result.async ? 'Loaded (async / remote data)' : 'Loaded')
      } catch (err) {
        if (cancelled) return
        setStatus('error')
        setMessage(err instanceof Error ? err.message : String(err))
      }
    }

    void load()

    return () => {
      cancelled = true
      ro?.disconnect()
      chart?.dispose()
    }
  }, [example, theme])

  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 light:border-slate-200 light:bg-white ${className}`}>
      <header className="border-b border-slate-800 px-5 py-4 light:border-slate-200">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400/80">
          {example.category} · {example.file}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white light:text-slate-900">{example.title}</h2>
        <p className="mt-1 text-xs text-slate-500">
          {status === 'loading' && 'Fetching & evaluating official example…'}
          {status === 'ready' && message}
          {status === 'error' && 'Could not render'}
          {status === 'skipped' && 'Skipped'}
        </p>
      </header>

      <div className="relative min-h-[320px] flex-1 bg-[#0b1220] light:bg-slate-50">
        {(status === 'error' || status === 'skipped') && (
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
            <div className="max-w-lg rounded-xl border border-amber-500/40 bg-amber-950/40 px-5 py-4 text-sm text-amber-100">
              <p className="font-semibold">
                {status === 'skipped' ? 'Not rendered in this demo' : 'Render error'}
              </p>
              <p className="mt-2 text-amber-100/80">{message || example.skipReason}</p>
              <p className="mt-3 text-xs text-amber-200/60">
                Maps / Baidu Map (bmap) / some plugin-heavy examples are listed but skipped so the
                app stays stable.
              </p>
            </div>
          </div>
        )}
        {status === 'loading' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-slate-400">
            Loading…
          </div>
        )}
        <div ref={hostRef} className="h-[320px] w-full" />
      </div>
    </div>
  )
}
