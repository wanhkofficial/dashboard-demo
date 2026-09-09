import { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut, Scatter, Pie } from 'react-chartjs-2'
import { useTheme } from '../../theme/ThemeContext'
import { useLiveData } from '../../data/LiveDataContext'
import { toChartJsBundle, toPieSlices, toScatterPoints } from '../../data/liveAdapters'
import { ChartPanel } from '../../components/ChartPanel'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import { LIBRARY_META } from '../../components/LibraryNotes'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const meta = LIBRARY_META.chartjs

function useChartJsTheme() {
  const { isDark } = useTheme()
  return useMemo(
    () => ({
      isDark,
      text: isDark ? '#fda4af' : '#9f1239',
      grid: isDark ? 'rgba(251,113,133,0.15)' : 'rgba(244,63,94,0.12)',
      legend: isDark ? '#fecdd3' : '#881337',
      tooltipBg: isDark ? 'rgba(40,16,24,0.95)' : 'rgba(255,255,255,0.96)',
      tooltipFg: isDark ? '#ffe4e6' : '#881337',
    }),
    [isDark],
  )
}

function commonOptions(ui: ReturnType<typeof useChartJsTheme>, stacked = false) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: ui.legend } },
      tooltip: {
        backgroundColor: ui.tooltipBg,
        titleColor: ui.tooltipFg,
        bodyColor: ui.tooltipFg,
        borderColor: '#fb7185',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        stacked,
        ticks: { color: ui.text },
        grid: { color: ui.grid },
      },
      y: {
        stacked,
        ticks: { color: ui.text },
        grid: { color: ui.grid },
      },
    },
  }
}

export function ChartjsLine() {
  const { chart } = useLiveData()
  const ui = useChartJsTheme()
  const bundle = toChartJsBundle(chart)
  const data = {
    labels: bundle.labels,
    datasets: bundle.datasets.map((d) => ({
      ...d,
      backgroundColor: 'transparent',
      borderWidth: 2.5,
      pointRadius: 3,
      pointHoverRadius: 5,
    })),
  }
  return (
    <ChartPanel title="Revenue series (Line)" library={meta.name} note="Canvas · react-chartjs-2" accent="chartjs">
      <div className="h-[260px]">
        <Line data={data} options={commonOptions(ui)} />
      </div>
    </ChartPanel>
  )
}

export function ChartjsArea() {
  const { chart } = useLiveData()
  const ui = useChartJsTheme()
  const first = chart.series[0]
  const data = {
    labels: chart.categories,
    datasets: [
      {
        label: first?.name ?? 'Series',
        data: first?.values ?? [],
        borderColor: first?.color ?? '#fb7185',
        backgroundColor: (first?.color ?? '#fb7185') + '55',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 2,
      },
    ],
  }
  return (
    <ChartPanel title="Area fill" library={meta.name} note="Filler plugin" accent="chartjs">
      <div className="h-[260px]">
        <Line data={data} options={commonOptions(ui)} />
      </div>
    </ChartPanel>
  )
}

export function ChartjsBar() {
  const { chart } = useLiveData()
  const ui = useChartJsTheme()
  const bundle = toChartJsBundle(chart)
  const data = {
    labels: bundle.labels,
    datasets: bundle.datasets.map((d) => ({
      ...d,
      borderWidth: 0,
      borderRadius: 4,
    })),
  }
  return (
    <ChartPanel title="Stacked bar" library={meta.name} note="Canvas bars" accent="chartjs">
      <div className="h-[260px]">
        <Bar data={data} options={commonOptions(ui, true)} />
      </div>
    </ChartPanel>
  )
}

export function ChartjsDoughnut() {
  const { chart } = useLiveData()
  const ui = useChartJsTheme()
  const slices = toPieSlices(chart, 'sum')
  const colors = chart.series.map((s) => s.color)
  const palette =
    slices.length <= colors.length
      ? colors
      : slices.map((_, i) => colors[i % Math.max(colors.length, 1)] ?? '#fb7185')
  const data = {
    labels: slices.map((s) => s.name),
    datasets: [
      {
        data: slices.map((s) => s.value),
        backgroundColor: palette.map((c, i) => {
          const base = c ?? '#fb7185'
          const alphas = ['ee', 'cc', 'aa', '88', '66', '99']
          return base.length === 7 ? base + alphas[i % alphas.length] : base
        }),
        borderColor: ui.isDark ? '#1c0a10' : '#fff',
        borderWidth: 2,
      },
    ],
  }
  return (
    <ChartPanel title="Doughnut" library={meta.name} note="ArcElement" accent="chartjs">
      <div className="mx-auto h-[260px] max-w-xs">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { color: ui.legend, boxWidth: 12 } },
            },
            cutout: '55%',
          }}
        />
      </div>
    </ChartPanel>
  )
}

export function ChartjsPie() {
  const { chart } = useLiveData()
  const ui = useChartJsTheme()
  const slices = toPieSlices(chart, 'first')
  const data = {
    labels: slices.map((s) => s.name),
    datasets: [
      {
        data: slices.map((s) => s.value),
        backgroundColor: slices.map((_, i) => {
          const c = chart.series[i % Math.max(chart.series.length, 1)]?.color ?? '#fb7185'
          return c + 'cc'
        }),
        borderWidth: 2,
        borderColor: ui.isDark ? '#1c0a10' : '#fff',
      },
    ],
  }
  return (
    <ChartPanel title="Pie" library={meta.name} note="Full pie" accent="chartjs">
      <div className="mx-auto h-[260px] max-w-xs">
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: ui.legend } } },
          }}
        />
      </div>
    </ChartPanel>
  )
}

export function ChartjsScatter() {
  const { chart } = useLiveData()
  const ui = useChartJsTheme()
  const points = toScatterPoints(chart)
  const color = chart.series[0]?.color ?? '#fb7185'
  const data = {
    datasets: [
      {
        label: chart.series.map((s) => s.name).slice(0, 2).join(' vs ') || 'Scatter',
        data: points.map((p) => ({ x: p.x, y: p.y })),
        backgroundColor: color + 'cc',
        borderColor: color,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }
  return (
    <ChartPanel title="Scatter" library={meta.name} note="series[0] vs series[1]" accent="chartjs">
      <div className="h-[260px]">
        <Scatter
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: ui.legend } },
            },
            scales: {
              x: { ticks: { color: ui.text }, grid: { color: ui.grid } },
              y: { ticks: { color: ui.text }, grid: { color: ui.grid } },
            },
          }}
        />
      </div>
    </ChartPanel>
  )
}

export function ChartjsSuite() {
  return (
    <div className="space-y-4">
      <FingerprintBanner library="chartjs" />
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
