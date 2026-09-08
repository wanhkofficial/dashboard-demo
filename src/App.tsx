import { useState, lazy, Suspense } from "react"
const CompareView = lazy(() =>
  import("./components/CompareView").then((m) => ({
    default: m.CompareView,
  })),
)

const EChartsOfficialGallery = lazy(() =>
  import("./galleries/echarts/EChartsOfficialGallery").then((m) => ({
    default: m.EChartsOfficialGallery,
  })),
)
const RechartsOfficialGallery = lazy(() =>
  import("./galleries/recharts/RechartsOfficialGallery").then((m) => ({
    default: m.RechartsOfficialGallery,
  })),
)
const TremorOfficialGallery = lazy(() =>
  import("./galleries/tremor/TremorOfficialGallery").then((m) => ({
    default: m.TremorOfficialGallery,
  })),
)

type Tab = "echarts" | "recharts" | "tremor" | "compare"

const TABS: { id: Tab; label: string }[] = [
  { id: "echarts", label: "ECharts Gallery" },
  { id: "recharts", label: "Recharts Gallery" },
  { id: "tremor", label: "Tremor Gallery" },
  { id: "compare", label: "Compare" },
]

function GalleryFallback() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-10 text-center text-sm text-slate-500">
      Loading gallery…
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('echarts')

  return (
    <div className="min-h-screen text-slate-200">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-6 border-b border-slate-800/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/80">
              Official galleries demo
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Chart Libraries — Full Galleries
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
              Complete official-style galleries for Apache ECharts (~297 examples), Recharts (all chart
              components), and Tremor 3.18 (full chart / vis / spark surface). Compare keeps a slim
              side-by-side for overlapping types.
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

        <Suspense fallback={<GalleryFallback />}>
          {tab === 'echarts' && <EChartsOfficialGallery />}
          {tab === 'recharts' && <RechartsOfficialGallery />}
          {tab === 'tremor' && <TremorOfficialGallery />}
          {tab === 'compare' && <CompareView />}
        </Suspense>

        <footer className="mt-10 border-t border-slate-800/80 pt-6 text-xs text-slate-600">
          ECharts examples live in public/echarts-official and are loaded on demand.
        </footer>
      </div>
    </div>
  )
}
