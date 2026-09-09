import { useState, lazy, Suspense } from 'react'
import { ThemeToggle } from './theme/ThemeToggle'
import { LiveDataToggle, LiveDataPanel } from './components/LiveDataPanel'

const CompareView = lazy(() =>
  import('./components/CompareView').then((m) => ({
    default: m.CompareView,
  })),
)

const EChartsOfficialGallery = lazy(() =>
  import('./galleries/echarts/EChartsOfficialGallery').then((m) => ({
    default: m.EChartsOfficialGallery,
  })),
)
const RechartsOfficialGallery = lazy(() =>
  import('./galleries/recharts/RechartsOfficialGallery').then((m) => ({
    default: m.RechartsOfficialGallery,
  })),
)
const TremorOfficialGallery = lazy(() =>
  import('./galleries/tremor/TremorOfficialGallery').then((m) => ({
    default: m.TremorOfficialGallery,
  })),
)
const ChartjsOfficialGallery = lazy(() =>
  import('./galleries/chartjs/ChartjsOfficialGallery').then((m) => ({
    default: m.ChartjsOfficialGallery,
  })),
)
const NivoOfficialGallery = lazy(() =>
  import('./galleries/nivo/NivoOfficialGallery').then((m) => ({
    default: m.NivoOfficialGallery,
  })),
)

type Tab = 'echarts' | 'recharts' | 'tremor' | 'chartjs' | 'nivo' | 'compare'

const TABS: { id: Tab; label: string }[] = [
  { id: 'echarts', label: 'ECharts Gallery' },
  { id: 'recharts', label: 'Recharts Gallery' },
  { id: 'tremor', label: 'Tremor Gallery' },
  { id: 'nivo', label: 'Nivo Gallery' },
  { id: 'chartjs', label: 'Chart.js Gallery' },
  { id: 'compare', label: 'Compare' },
]

function GalleryFallback() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-10 text-center text-sm text-slate-500 light:border-slate-200 light:bg-white/70 light:text-slate-500">
      Loading gallery…
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('compare')

  return (
    <div className="min-h-screen text-slate-200 light:text-slate-800">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-6 border-b border-slate-800/80 pb-6 light:border-slate-200 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/80 light:text-cyan-700">
              Official galleries demo
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white light:text-slate-900 sm:text-4xl">
              Chart Libraries — Full Galleries
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400 light:text-slate-600">
              Apache ECharts, Recharts, Tremor, Nivo, and Chart.js — open-source only. Compare uses a
              shared Live data model (categories + series) so every bound chart updates together.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <LiveDataToggle />
              <ThemeToggle />
            </div>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-1.5 shadow-inner light:border-slate-200 light:bg-white/90">
              {TABS.map((t) => {
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition sm:px-4 ${
                      active
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-900/30'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100 light:text-slate-600 light:hover:bg-slate-100 light:hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        {tab !== 'compare' && <LiveDataPanel />}

        <Suspense fallback={<GalleryFallback />}>
          {tab === 'echarts' && <EChartsOfficialGallery />}
          {tab === 'recharts' && <RechartsOfficialGallery />}
          {tab === 'tremor' && <TremorOfficialGallery />}
          {tab === 'nivo' && <NivoOfficialGallery />}
          {tab === 'chartjs' && <ChartjsOfficialGallery />}
          {tab === 'compare' && <CompareView />}
        </Suspense>

        <footer className="mt-10 border-t border-slate-800/80 pt-6 text-xs text-slate-600 light:border-slate-200 light:text-slate-500">
          ECharts examples live in public/echarts-official and are loaded on demand. Theme preference
          and Live data controls apply across bound charts.
        </footer>
      </div>
    </div>
  )
}
