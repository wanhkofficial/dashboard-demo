import type { ReactNode } from 'react'
import { useTheme } from '../theme/ThemeContext'
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
import {
  ChartjsLine,
  ChartjsArea,
  ChartjsBar,
  ChartjsDoughnut,
  ChartjsScatter,
} from '../charts/chartjs/ChartjsCharts'
import {
  NivoLine,
  NivoArea,
  NivoBar,
  NivoPie,
  NivoScatter,
} from '../charts/nivo/NivoCharts'
import { FingerprintBanner } from './FingerprintBanner'
import { LIBRARY_ONLY } from './LibraryNotes'
import { LiveDataPanel } from './LiveDataPanel'
import type { LibraryKey } from './LibraryNotes'

type RowProps = {
  title: string
  children: ReactNode
}

function CompareRow({ title, children }: RowProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 light:text-slate-500">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 xl:grid xl:grid-cols-5 xl:overflow-visible">
        {children}
      </div>
    </div>
  )
}

function ColumnShell({
  library,
  children,
}: {
  library: LibraryKey
  children: ReactNode
}) {
  const { isDark } = useTheme()
  return (
    <div
      className={`min-w-[280px] flex-1 space-y-2 xl:min-w-0 ${library === 'tremor' && isDark ? 'dark' : ''}`}
    >
      <FingerprintBanner library={library} compact />
      {children}
    </div>
  )
}

export function CompareView() {
  return (
    <div className="relative space-y-10 lg:pr-[340px]">
      <LiveDataPanel />

      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 px-4 py-4 text-sm text-slate-400 light:border-slate-200 light:bg-white/80 light:text-slate-600">
        <p className="font-medium text-slate-200 light:text-slate-900">
          Quick compare — five open-source libraries
        </p>
        <p className="mt-1 text-xs leading-relaxed">
          ECharts · Recharts · Tremor · Chart.js · Nivo side-by-side on overlapping types. Open{' '}
          <strong className="text-cyan-300 light:text-cyan-700">Live data</strong> to change
          category/series counts, bases, noise, and palette — all bound charts update immediately.
        </p>
      </div>

      <CompareRow title="KPI cards + sparklines">
        <div className="xl:col-span-5 w-full min-w-0">
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
        <ColumnShell library="chartjs">
          <ChartjsLine />
        </ColumnShell>
        <ColumnShell library="nivo">
          <NivoLine />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Area — primary series">
        <ColumnShell library="echarts">
          <EChartsArea />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsArea />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorArea />
        </ColumnShell>
        <ColumnShell library="chartjs">
          <ChartjsArea />
        </ColumnShell>
        <ColumnShell library="nivo">
          <NivoArea />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Stacked bar — category / series mix">
        <ColumnShell library="echarts">
          <EChartsBar />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsBar />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorBar />
        </ColumnShell>
        <ColumnShell library="chartjs">
          <ChartjsBar />
        </ColumnShell>
        <ColumnShell library="nivo">
          <NivoBar />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Donut / pie — distribution">
        <ColumnShell library="echarts">
          <EChartsPie />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsDonut />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorPie />
        </ColumnShell>
        <ColumnShell library="chartjs">
          <ChartjsDoughnut />
        </ColumnShell>
        <ColumnShell library="nivo">
          <NivoPie />
        </ColumnShell>
      </CompareRow>

      <CompareRow title="Scatter">
        <ColumnShell library="echarts">
          <EChartsScatter />
        </ColumnShell>
        <ColumnShell library="recharts">
          <RechartsScatter />
        </ColumnShell>
        <ColumnShell library="tremor">
          <TremorScatter />
        </ColumnShell>
        <ColumnShell library="chartjs">
          <ChartjsScatter />
        </ColumnShell>
        <ColumnShell library="nivo">
          <NivoScatter />
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

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Library-only showcases
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Condensed highlights unique to each library. Open individual gallery tabs for fuller
            suites.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
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

          <div className="space-y-3">
            <FingerprintBanner library="chartjs" compact />
            <ul className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wide text-rose-300/90">
              {LIBRARY_ONLY.chartjs.map((t) => (
                <li key={t} className="rounded border border-rose-500/30 bg-rose-500/10 px-2 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
            <ChartjsDoughnut />
            <ChartjsScatter />
          </div>

          <div className="space-y-3">
            <FingerprintBanner library="nivo" compact />
            <ul className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wide text-amber-300/90">
              {LIBRARY_ONLY.nivo.map((t) => (
                <li key={t} className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
            <NivoPie />
            <NivoScatter />
          </div>
        </div>
      </section>
    </div>
  )
}
