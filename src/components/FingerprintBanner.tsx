import type { LibraryKey } from './LibraryNotes'

const BANNER: Record<
  LibraryKey,
  { title: string; subtitle: string; className: string; badge: string }
> = {
  echarts: {
    title: 'Renderer: Canvas (ECharts)',
    subtitle: 'detect/canvas · dark navy glow · toolbox / dataZoom · dense chrome',
    className:
      'border-sky-400/70 bg-gradient-to-r from-slate-950 via-[#0a1628] to-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.25)]',
    badge: 'border-sky-400/60 bg-sky-500/15 text-sky-300',
  },
  recharts: {
    title: 'Renderer: SVG (Recharts)',
    subtitle: 'declarative React · dashed CartesianGrid · violet / orange strokes · Brush zoom',
    className:
      'border-violet-400/60 border-dashed bg-gradient-to-r from-slate-950 via-[#1a1028] to-slate-950 shadow-[0_0_20px_rgba(167,139,250,0.18)]',
    badge: 'border-violet-400/50 bg-violet-500/15 text-violet-300',
  },
  tremor: {
    title: 'Tremor UI + charts (Recharts under the hood)',
    subtitle: 'Card · Metric · BadgeDelta · Tailwind dashboard primitives · cyan / emerald',
    className:
      'border-cyan-500/50 bg-gradient-to-r from-slate-950 via-[#0a1f1c] to-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.15)]',
    badge: 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300',
  },
}

type Props = {
  library: LibraryKey
  compact?: boolean
}

export function FingerprintBanner({ library, compact = false }: Props) {
  const b = BANNER[library]
  return (
    <div
      className={`rounded-xl border px-4 ${compact ? 'py-2' : 'py-3'} ${b.className}`}
      role="status"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${b.badge}`}>
          fingerprint
        </span>
        <p className={`font-semibold ${compact ? 'text-xs' : 'text-sm'} text-slate-100`}>{b.title}</p>
      </div>
      {!compact && <p className="mt-1 text-xs text-slate-400">{b.subtitle}</p>}
    </div>
  )
}
