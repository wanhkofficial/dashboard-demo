import type { LibraryKey } from './LibraryNotes'

const BANNER: Record<
  LibraryKey,
  { title: string; subtitle: string; className: string; badge: string }
> = {
  echarts: {
    title: 'Renderer: Canvas (ECharts)',
    subtitle: 'detect/canvas · theme follows Dark/Light toggle · toolbox / dataZoom · dense chrome',
    className:
      'border-sky-400/70 bg-gradient-to-r from-slate-950 via-[#0a1628] to-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.25)] light:from-sky-50 light:via-white light:to-sky-50 light:shadow-none light:border-sky-300',
    badge: 'border-sky-400/60 bg-sky-500/15 text-sky-300 light:border-sky-400 light:bg-sky-100 light:text-sky-800',
  },
  recharts: {
    title: 'Renderer: SVG (Recharts)',
    subtitle: 'declarative React · dashed CartesianGrid · violet / orange strokes · Brush zoom',
    className:
      'border-violet-400/60 border-dashed bg-gradient-to-r from-slate-950 via-[#1a1028] to-slate-950 shadow-[0_0_20px_rgba(167,139,250,0.18)] light:from-violet-50 light:via-white light:to-violet-50 light:shadow-none light:border-violet-300',
    badge: 'border-violet-400/50 bg-violet-500/15 text-violet-300 light:border-violet-400 light:bg-violet-100 light:text-violet-800',
  },
  tremor: {
    title: 'Tremor UI + charts (Recharts under the hood)',
    subtitle: 'Card · Metric · BadgeDelta · Tailwind dashboard primitives · cyan / emerald',
    className:
      'border-cyan-500/50 bg-gradient-to-r from-slate-950 via-[#0a1f1c] to-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.15)] light:from-emerald-50 light:via-white light:to-cyan-50 light:shadow-none light:border-cyan-300',
    badge: 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300 light:border-emerald-400 light:bg-emerald-100 light:text-emerald-800',
  },
  chartjs: {
    title: 'Renderer: Canvas · Chart.js',
    subtitle: 'react-chartjs-2 · registerables · distinct from ECharts canvas chrome',
    className:
      'border-rose-400/60 bg-gradient-to-r from-slate-950 via-[#281018] to-slate-950 shadow-[0_0_20px_rgba(251,113,133,0.18)] light:from-rose-50 light:via-white light:to-orange-50 light:shadow-none light:border-rose-300',
    badge: 'border-rose-400/50 bg-rose-500/15 text-rose-300 light:border-rose-400 light:bg-rose-100 light:text-rose-800',
  },
  nivo: {
    title: 'Renderer: SVG · Nivo',
    subtitle: 'ResponsiveLine / Bar / Pie / Scatter · theme tokens for dark / light',
    className:
      'border-amber-400/60 bg-gradient-to-r from-slate-950 via-[#281e0a] to-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.16)] light:from-amber-50 light:via-white light:to-yellow-50 light:shadow-none light:border-amber-300',
    badge: 'border-amber-400/50 bg-amber-500/15 text-amber-300 light:border-amber-400 light:bg-amber-100 light:text-amber-900',
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
        <p className={`font-semibold ${compact ? 'text-xs' : 'text-sm'} text-slate-100 light:text-slate-900`}>
          {b.title}
        </p>
      </div>
      {!compact && <p className="mt-1 text-xs text-slate-400 light:text-slate-600">{b.subtitle}</p>}
    </div>
  )
}
