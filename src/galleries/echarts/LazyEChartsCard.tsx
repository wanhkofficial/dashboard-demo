import { useEffect, useRef, useState } from 'react'
import type { EChartsExampleMeta } from './types'
import { EChartsExampleViewer } from './EChartsExampleViewer'

type Props = {
  example: EChartsExampleMeta
}

/** Mount the real chart only when the card enters (or nears) the viewport. */
export function LazyEChartsCard({ example }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true)
            // keep mounted once seen — scrolling back is instant
            io.disconnect()
            break
          }
        }
      },
      { root: null, rootMargin: '240px 0px', threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const skipped = Boolean(example.skipReason)

  return (
    <div ref={ref} className="min-h-[340px]">
      {skipped ? (
        <div className="flex h-full min-h-[340px] flex-col rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/80">
            {example.category} · skip
          </p>
          <h3 className="mt-2 text-base font-semibold text-slate-100">{example.title}</h3>
          <p className="mt-1 font-mono text-[11px] text-slate-500">{example.file}</p>
          <p className="mt-4 text-sm text-amber-100/80">{example.skipReason}</p>
        </div>
      ) : active ? (
        <EChartsExampleViewer example={example} />
      ) : (
        <div className="flex h-full min-h-[340px] flex-col justify-end rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400/70">
            {example.category}
          </p>
          <h3 className="mt-2 text-base font-semibold text-slate-100">{example.title}</h3>
          <p className="mt-1 font-mono text-[11px] text-slate-500">{example.file}</p>
          <p className="mt-6 text-xs text-slate-600">Scroll into view to load chart…</p>
        </div>
      )}
    </div>
  )
}
