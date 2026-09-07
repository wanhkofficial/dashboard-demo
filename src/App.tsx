import { useState } from 'react'
import { EChartsSuite } from './charts/echarts/EChartsCharts'
import { RechartsSuite } from './charts/recharts/RechartsCharts'
import { TremorSuite } from './charts/tremor/TremorCharts'
import { CompareView } from './components/CompareView'
import type { LibraryKey } from './components/LibraryNotes'
import { LIBRARY_META } from './components/LibraryNotes'

type Tab = LibraryKey | 'compare'

const TABS: { id: Tab; label: string }[] = [
  { id: 'echarts', label: 'ECharts' },
  { id: 'recharts', label: 'Recharts' },
  { id: 'tremor', label: 'Tremor' },
  { id: 'compare', label: 'Compare all' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('compare')

  return (
    <div className="min-h-screen text-slate-200">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-6 border-b border-slate-800/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/80">
              Dashboard demo
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Chart Library Compare
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
              Apache ECharts (Canvas), Recharts (SVG), and Tremor (UI kit on Recharts) — each with a
              distinct visual fingerprint and library-specific chart types, not just reskinned copies
              of the same six panels.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-1.5 shadow-inner">
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-900/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </header>

        {tab !== 'compare' && (
          <div className="mb-4 rounded-xl border border-slate-800/80 bg-slate-950/50 px-4 py-3 text-sm text-slate-400">
            Viewing <span className="font-medium text-slate-200">{LIBRARY_META[tab].name}</span>
            <span className="mx-2 text-slate-700">·</span>
            {LIBRARY_META[tab].note}
          </div>
        )}

        {tab === 'echarts' && <EChartsSuite />}
        {tab === 'recharts' && <RechartsSuite />}
        {tab === 'tremor' && <TremorSuite />}
        {tab === 'compare' && <CompareView />}

        <footer className="mt-10 border-t border-slate-800/80 pt-6 text-xs text-slate-600">
          Shared mock data lives in <code className="text-slate-500">src/data/mockData.ts</code>. Extra
          datasets power radar, heatmap, OHLC, treemap, tracker, and progress panels. No backend —
          Vite + React + TypeScript client demo.
        </footer>
      </div>
    </div>
  )
}
