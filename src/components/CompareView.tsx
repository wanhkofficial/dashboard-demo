import type { ReactNode } from 'react'
import {
  EChartsLine,
  EChartsArea,
  EChartsBar,
  EChartsPie,
  EChartsScatter,
  EChartsCombo,
  EChartsKpis,
  EChartsRadar,
  EChartsHeatmap,
  EChartsGauge,
  EChartsCandlestick,
} from '../charts/echarts/EChartsCharts'
import {
  RechartsLine,
  RechartsArea,
  RechartsBar,
  RechartsDonut,
  RechartsScatter,
  RechartsCombo,
  RechartsKpis,
  RechartsRadar,
  RechartsRadialBar,
  RechartsFunnel,
  RechartsLineBrush,
} from '../charts/recharts/RechartsCharts'
import {
  TremorLine,
  TremorArea,
  TremorBar,
  TremorPie,
  TremorScatter,
  TremorCombo,
  TremorKpis,
  TremorBarList,
  TremorTrackerPanel,
  TremorFunnel,
} from '../charts/tremor/TremorCharts'
import { FingerprintBanner } from './FingerprintBanner'
import { LIBRARY_ONLY } from './LibraryNotes'

type RowProps = {
  title: string
  children: ReactNode
}

function CompareRow({ title, children }: RowProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</h2>
      <div className="grid gap-4 xl:grid-cols-3">{children}</div>
    </div>
  )
}

function ColumnShell({
  library,
  children,
}: {
  library: 'echarts' | 'recharts' | 'tremor'
  children: ReactNode
}) {
  return (
    <div className={`space-y-2 ${library === 'tremor' ? 'dark' : ''}`}>
      <FingerprintBanner library={library} compact />
      {children}
    </div>
  )
}

export function CompareView() {
  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 px-4 py-4 text-sm text-slate-400">
        <p className="font-medium text-slate-200">Quick compare - overlapping chart types</p>
        <p className="mt-1 text-xs leading-relaxed">
          Each column keeps its fingerprint banner and visual language so Canvas (ECharts), SVG
          (Recharts), and Tremor UI stay obviously different — same mock data, different chrome.
        </p>
      </div>

      <CompareRow title="KPI cards + sparklines">
        <div className="xl:col-span-3">
          <div className="grid gap-4 lg:grid-cols-3">
            <ColumnShell library="echarts">
              <EChartsKpis />
            </ColumnShell>
            <ColumnShell library="recharts">
              <RechartsKpis />
            </ColumnShell>
            <ColumnShell library="tremor">
              <TremorKpis />
            </ColumnShell>
          </div>
        </div>
      </CompareRow>

      <CompareRow title="Line — revenue & profit">
        <ColumnShell library="echarts">
          <EChartsLine />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsLine />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorLine />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Area — visitors">
        <ColumnShell library="echarts">
          <EChartsArea />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsArea />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorArea />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Stacked bar — category mix">
        <ColumnShell library="echarts">
          <EChartsBar />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsBar />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorBar />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Donut — conversion funnel">
        <ColumnShell library="echarts">
          <EChartsPie />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsDonut />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorPie />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Scatter — spend vs conversions">
        <ColumnShell library="echarts">
          <EChartsScatter />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsScatter />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorScatter />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Combo — traffic sessions + bounce">
        <ColumnShell library="echarts">
          <EChartsCombo />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsCombo />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorCombo />
        </ColumnShell>
      </CompareRow>

      {/* Library-only condensed highlights */}
      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Library-only showcases
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Condensed highlights unique to each library. Open the individual tabs for the full suites
            (treemap, nightingale, grouped bars, ProgressBar, CategoryBar, etc.).
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-3">
            <FingerprintBanner library="echarts" compact />
            <ul className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wide text-sky-300/90">
              {LIBRARY_ONLY.echarts.map((t) => (
                <li key={t} className="rounded border border-sky-500/30 bg-sky-500/10 px-2 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
            <EChartsRadar />
            <EChartsHeatmap />
            <EChartsGauge />
            <EChartsCandlestick />
          </div>

          <div className="space-y-3">
            <FingerprintBanner library="recharts" compact />
            <ul className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wide text-violet-300/90">
              {LIBRARY_ONLY.recharts.map((t) => (
                <li key={t} className="rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
            <RechartsRadar />
            <RechartsRadialBar />
            <RechartsFunnel />
            <RechartsLineBrush />
          </div>

          <div className="space-y-3 dark">
            <FingerprintBanner library="tremor" compact />
            <ul className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wide text-emerald-300/90">
              {LIBRARY_ONLY.tremor.map((t) => (
                <li key={t} className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
            <TremorBarList />
            <TremorTrackerPanel />
            <TremorFunnel />
            <TremorCombo />
          </div>
        </div>
      </section>
    </div>
  )
}
