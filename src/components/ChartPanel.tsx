import type { ReactNode } from 'react'
import type { LibraryKey } from './LibraryNotes'

type Accent = LibraryKey | 'neutral'

type Props = {
  title: string
  library: string
  note: string
  children: ReactNode
  className?: string
  accent?: Accent
}

const ACCENT: Record<Accent, string> = {
  echarts: 'border-sky-500/40 shadow-[0_0_18px_rgba(56,189,248,0.12)]',
  recharts: 'border-violet-500/40 border-dashed shadow-[0_0_18px_rgba(167,139,250,0.1)]',
  tremor: 'border-cyan-500/35 shadow-[0_0_18px_rgba(16,185,129,0.1)]',
  neutral: 'border-slate-800/80',
}

export function ChartPanel({
  title,
  library,
  note,
  children,
  className = '',
  accent = 'neutral',
}: Props) {
  return (
    <section
      className={`flex flex-col rounded-2xl border bg-slate-950/70 backdrop-blur ${ACCENT[accent]} ${className}`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-800/80 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-100">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            <span className="font-medium text-slate-300">{library}</span>
            <span className="mx-1.5 text-slate-700">·</span>
            {note}
          </p>
        </div>
      </header>
      <div className="min-h-[260px] flex-1 p-3 sm:p-4">{children}</div>
    </section>
  )
}

/** Placeholder when a library has no native chart for a type */
export function NotAvailableCard({
  title,
  reason,
}: {
  title: string
  reason: string
}) {
  return (
    <section className="flex min-h-[260px] flex-col rounded-2xl border border-dashed border-cyan-800/50 bg-slate-950/40 p-4">
      <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-xl border border-slate-800/60 bg-slate-900/50 px-4 py-8 text-center">
        <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-300">
          not available natively
        </span>
        <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-400">{reason}</p>
      </div>
    </section>
  )
}
