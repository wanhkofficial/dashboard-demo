import { FingerprintBanner } from '../../components/FingerprintBanner'
import {
  ChartjsArea,
  ChartjsBar,
  ChartjsDoughnut,
  ChartjsLine,
  ChartjsPie,
  ChartjsScatter,
} from '../../charts/chartjs/ChartjsCharts'
import { LIBRARY_ONLY } from '../../components/LibraryNotes'

export function ChartjsOfficialGallery() {
  return (
    <div className="space-y-8">
      <FingerprintBanner library="chartjs" />
      <div className="rounded-2xl border border-rose-500/25 bg-slate-950/60 px-4 py-4 text-sm text-slate-400 light:border-rose-200 light:bg-white/80 light:text-slate-600">
        <p className="font-medium text-rose-100 light:text-rose-800">
          Chart.js gallery — Canvas via react-chartjs-2
        </p>
        <p className="mt-1 text-xs leading-relaxed">
          Components registered once (scales, elements, Filler). Bound to Live data controls so
          Line / Bar / Doughnut / Pie / Scatter update immediately. Distinct rose fingerprint from
          ECharts canvas chrome.
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wide text-rose-300/90 light:text-rose-700">
          {LIBRARY_ONLY.chartjs.map((t) => (
            <li key={t} className="rounded border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 light:border-rose-300 light:bg-rose-50">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartjsLine />
        <ChartjsArea />
        <ChartjsBar />
        <ChartjsDoughnut />
        <ChartjsPie />
        <ChartjsScatter />
      </div>
    </div>
  )
}
