import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '../../theme/ThemeContext'
import {
  monthlySales,
  categorySales,
  funnelPie,
  channelScatter,
  trafficSources,
  kpiMetrics,
  radarScores,
  heatmapDays,
  heatmapRegions,
  heatmapMatrix,
  ohlcMonthly,
  treemapData,
  ECHARTS_PALETTE,
  ECHARTS_SERIES,
} from '../../data/mockData'
import { ChartPanel } from '../../components/ChartPanel'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import { LIBRARY_META } from '../../components/LibraryNotes'

const meta = LIBRARY_META.echarts

const darkAxis = {
  axisLine: { lineStyle: { color: '#1e3a5f' } },
  axisLabel: { color: '#7dd3fc' },
  splitLine: { lineStyle: { color: '#0f2744', type: 'solid' as const } },
}

const lightAxis = {
  axisLine: { lineStyle: { color: '#cbd5e1' } },
  axisLabel: { color: '#475569' },
  splitLine: { lineStyle: { color: '#e2e8f0', type: 'solid' as const } },
}

const tooltipDark = {
  backgroundColor: 'rgba(8,15,30,0.95)',
  borderColor: '#38bdf8',
  textStyle: { color: '#e0f2fe' },
}

const tooltipLight = {
  backgroundColor: 'rgba(255,255,255,0.96)',
  borderColor: '#0ea5e9',
  textStyle: { color: '#0f172a' },
}

const glowBg = {
  backgroundColor: 'transparent',
}

function useEchartsUi() {
  const { isDark, theme } = useTheme()
  return useMemo(
    () => ({
      themeName: (isDark ? 'dark' : undefined) as string | undefined,
      themeKey: theme,
      axis: isDark ? darkAxis : lightAxis,
      tooltip: isDark ? tooltipDark : tooltipLight,
      legendColor: isDark ? '#7dd3fc' : '#0369a1',
      saveBg: isDark ? '#0a1628' : '#ffffff',
      zoomBorder: isDark ? '#1e3a5f' : '#cbd5e1',
      zoomText: isDark ? '#7dd3fc' : '#475569',
    }),
    [isDark, theme],
  )
}

export function EChartsKpis() {
  const ui = useEchartsUi()
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpiMetrics.map((kpi) => {
        const option = {
          ...glowBg,
          grid: { left: 0, right: 0, top: 8, bottom: 0 },
          xAxis: { type: 'category', show: false, data: monthlySales.map((d) => d.month) },
          yAxis: { type: 'value', show: false },
          series: [
            {
              type: 'line',
              data: kpi.spark,
              smooth: true,
              symbol: 'none',
              lineStyle: {
                width: 2,
                color: kpi.positive ? ECHARTS_PALETTE.cyan : ECHARTS_PALETTE.rose,
                shadowBlur: 8,
                shadowColor: kpi.positive ? ECHARTS_PALETTE.cyan : ECHARTS_PALETTE.rose,
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: kpi.positive ? 'rgba(34,211,238,0.45)' : 'rgba(251,113,133,0.4)',
                    },
                    { offset: 1, color: 'rgba(0,0,0,0)' },
                  ],
                },
              },
            },
          ],
        }
        return (
          <ChartPanel
            key={kpi.label}
            title={kpi.label}
            library={meta.short}
            note="Canvas sparkline KPI"
            accent="echarts"
            className="!min-h-0"
          >
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-2xl font-semibold text-sky-50 light:text-slate-900">{kpi.value}</div>
                <div
                  className={`mt-1 text-xs font-medium ${kpi.positive ? 'text-cyan-400' : 'text-rose-400'}`}
                >
                  {kpi.delta} vs prior
                </div>
              </div>
              <div className="h-14 w-28">
                <ReactECharts
                  key={ui.themeKey}
                  theme={ui.themeName}
                  option={option}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'canvas' }}
                />
              </div>
            </div>
          </ChartPanel>
        )
      })}
    </div>
  )
}

/** Main line with dataZoom + toolbox */
export function EChartsLine() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...ui.tooltip, trigger: 'axis' },
    toolbox: {
      iconStyle: { borderColor: '#38bdf8' },
      feature: {
        dataZoom: { yAxisIndex: 'none' },
        restore: {},
        saveAsImage: { backgroundColor: ui.saveBg },
      },
    },
    legend: { textStyle: { color: ui.legendColor }, top: 0, left: 0 },
    grid: { left: 48, right: 20, top: 56, bottom: 56 },
    dataZoom: [
      { type: 'inside', start: 0, end: 100 },
      {
        type: 'slider',
        start: 0,
        end: 100,
        height: 18,
        bottom: 8,
        borderColor: '#1e3a5f',
        fillerColor: 'rgba(56,189,248,0.2)',
        handleStyle: { color: '#38bdf8' },
        textStyle: { color: ui.legendColor },
      },
    ],
    xAxis: { type: 'category', data: monthlySales.map((d) => d.month), ...ui.axis },
    yAxis: { type: 'value', ...ui.axis },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, shadowBlur: 10, shadowColor: ECHARTS_PALETTE.blue },
        data: monthlySales.map((d) => d.revenue),
      },
      {
        name: 'Profit',
        type: 'line',
        smooth: true,
        symbol: 'diamond',
        symbolSize: 6,
        lineStyle: { width: 2, shadowBlur: 8, shadowColor: ECHARTS_PALETTE.cyan },
        data: monthlySales.map((d) => d.profit),
      },
    ],
  }
  return (
    <ChartPanel
      title="Revenue & Profit (Line + dataZoom)"
      library={meta.name}
      note="Canvas · toolbox + slider zoom"
      accent="echarts"
    >
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsArea() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.cyan],
    tooltip: { ...ui.tooltip, trigger: 'axis' },
    grid: { left: 48, right: 16, top: 24, bottom: 28 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: monthlySales.map((d) => d.month),
      ...ui.axis,
    },
    yAxis: { type: 'value', ...ui.axis },
    series: [
      {
        name: 'Visitors',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34,211,238,0.55)' },
              { offset: 1, color: 'rgba(14,165,233,0.02)' },
            ],
          },
        },
        lineStyle: { width: 3, shadowBlur: 12, shadowColor: ECHARTS_PALETTE.cyan },
        data: monthlySales.map((d) => d.visitors),
      },
    ],
  }
  return (
    <ChartPanel title="Visitors (Area)" library={meta.name} note="Neon cyan glow fill" accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 260 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsStackedBar() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.navy, ECHARTS_PALETTE.cyan, ECHARTS_PALETTE.glow],
    tooltip: { ...ui.tooltip, trigger: 'axis' },
    legend: { textStyle: { color: ui.legendColor }, top: 0 },
    grid: { left: 48, right: 16, top: 40, bottom: 28 },
    xAxis: { type: 'category', data: categorySales.map((d) => d.category), ...ui.axis },
    yAxis: { type: 'value', ...ui.axis },
    series: [
      { name: 'Online', type: 'bar', stack: 'ch', data: categorySales.map((d) => d.online), barWidth: 28 },
      { name: 'Retail', type: 'bar', stack: 'ch', data: categorySales.map((d) => d.retail) },
      {
        name: 'Partners',
        type: 'bar',
        stack: 'ch',
        data: categorySales.map((d) => d.partners),
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  }
  return (
    <ChartPanel title="Category Mix (Stacked Bar)" library={meta.name} note={meta.note} accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 260 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsGroupedBar() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.blue, ECHARTS_PALETTE.amber, ECHARTS_PALETTE.violet],
    tooltip: { ...ui.tooltip, trigger: 'axis' },
    legend: { textStyle: { color: ui.legendColor }, top: 0 },
    grid: { left: 48, right: 16, top: 40, bottom: 28 },
    xAxis: { type: 'category', data: categorySales.map((d) => d.category), ...ui.axis },
    yAxis: { type: 'value', ...ui.axis },
    series: [
      { name: 'Online', type: 'bar', data: categorySales.map((d) => d.online), barGap: '10%' },
      { name: 'Retail', type: 'bar', data: categorySales.map((d) => d.retail) },
      { name: 'Partners', type: 'bar', data: categorySales.map((d) => d.partners) },
    ],
  }
  return (
    <ChartPanel title="Category Mix (Grouped Bar)" library={meta.name} note="Side-by-side bars" accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 260 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsDonut() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...ui.tooltip, trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: ui.legendColor } },
    series: [
      {
        name: 'Funnel',
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '46%'],
        itemStyle: {
          borderRadius: 6,
          borderColor: '#0a1628',
          borderWidth: 3,
          shadowBlur: 12,
          shadowColor: 'rgba(56,189,248,0.35)',
        },
        label: { color: '#bae6fd' },
        data: funnelPie,
      },
    ],
  }
  return (
    <ChartPanel title="Conversion Funnel (Donut)" library={meta.name} note={meta.note} accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

/** Nightingale / rose pie */
export function EChartsNightingale() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...ui.tooltip, trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: ui.legendColor } },
    series: [
      {
        name: 'Rose',
        type: 'pie',
        roseType: 'area',
        radius: ['12%', '70%'],
        center: ['50%', '46%'],
        itemStyle: {
          borderRadius: 8,
          borderColor: '#0a1628',
          borderWidth: 2,
          shadowBlur: 16,
          shadowColor: 'rgba(56,189,248,0.4)',
        },
        label: { color: '#bae6fd' },
        data: funnelPie,
      },
    ],
  }
  return (
    <ChartPanel
      title="Nightingale Rose (Pie)"
      library={meta.name}
      note="Library-specific · roseType area"
      accent="echarts"
    >
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsScatter() {
  const ui = useEchartsUi()
  const groups = ['Search', 'Social', 'Email', 'Display']
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: {
      ...ui.tooltip,
      formatter: (p: { seriesName: string; value: number[] }) =>
        `${p.seriesName}<br/>Spend: $${p.value[0]}k<br/>Conversions: ${p.value[1]}`,
    },
    legend: { textStyle: { color: ui.legendColor }, top: 0 },
    grid: { left: 52, right: 16, top: 40, bottom: 36 },
    xAxis: { name: 'Ad spend ($k)', nameTextStyle: { color: '#64748b' }, ...ui.axis },
    yAxis: { name: 'Conversions', nameTextStyle: { color: '#64748b' }, ...ui.axis },
    series: groups.map((g) => ({
      name: g,
      type: 'scatter',
      symbolSize: 14,
      itemStyle: { shadowBlur: 10, shadowColor: 'rgba(56,189,248,0.5)' },
      data: channelScatter.filter((d) => d.channel === g).map((d) => [d.spend, d.conversions]),
    })),
  }
  return (
    <ChartPanel title="Spend vs Conversions (Scatter)" library={meta.name} note={meta.note} accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsCombo() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.navy, ECHARTS_PALETTE.amber],
    tooltip: { ...ui.tooltip, trigger: 'axis' },
    legend: { textStyle: { color: ui.legendColor }, top: 0 },
    grid: { left: 52, right: 52, top: 40, bottom: 28 },
    xAxis: { type: 'category', data: trafficSources.map((d) => d.source), ...ui.axis },
    yAxis: [
      { type: 'value', name: 'Sessions', ...ui.axis },
      { type: 'value', name: 'Bounce %', max: 100, ...ui.axis },
    ],
    series: [
      {
        name: 'Sessions',
        type: 'bar',
        data: trafficSources.map((d) => d.sessions),
        barWidth: 28,
        itemStyle: { borderRadius: [4, 4, 0, 0], shadowBlur: 8, shadowColor: 'rgba(14,165,233,0.4)' },
      },
      {
        name: 'Bounce %',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 8,
        lineStyle: { width: 3, shadowBlur: 8, shadowColor: ECHARTS_PALETTE.amber },
        data: trafficSources.map((d) => d.bounce),
      },
    ],
  }
  return (
    <ChartPanel title="Traffic + Bounce (Combo dual-axis)" library={meta.name} note={meta.note} accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsRadar() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.cyan, ECHARTS_PALETTE.glow, ECHARTS_PALETTE.amber],
    tooltip: ui.tooltip,
    legend: { textStyle: { color: ui.legendColor }, bottom: 0 },
    radar: {
      indicator: radarScores.map((r) => ({ name: r.axis, max: 100 })),
      axisName: { color: '#7dd3fc' },
      splitArea: {
        areaStyle: {
          color: ['rgba(14,165,233,0.05)', 'rgba(14,165,233,0.12)', 'rgba(14,165,233,0.05)', 'rgba(14,165,233,0.12)'],
        },
      },
      splitLine: { lineStyle: { color: '#1e3a5f' } },
      axisLine: { lineStyle: { color: '#1e3a5f' } },
    },
    series: [
      {
        type: 'radar',
        areaStyle: { opacity: 0.25 },
        data: [
          { name: 'Product A', value: radarScores.map((r) => r.productA) },
          { name: 'Product B', value: radarScores.map((r) => r.productB) },
          { name: 'Product C', value: radarScores.map((r) => r.productC) },
        ],
      },
    ],
  }
  return (
    <ChartPanel title="Product Radar" library={meta.name} note="Library-specific · gradient radar" accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsHeatmap() {
  const ui = useEchartsUi()
  const data: [number, number, number][] = []
  heatmapMatrix.forEach((row, yi) => {
    row.forEach((v, xi) => data.push([xi, yi, v]))
  })
  const option = {
    ...glowBg,
    tooltip: {
      ...ui.tooltip,
      formatter: (p: { value: number[] }) =>
        `${heatmapRegions[p.value[1]]} · ${heatmapDays[p.value[0]]}: ${p.value[2]}`,
    },
    grid: { left: 72, right: 40, top: 16, bottom: 40 },
    xAxis: {
      type: 'category',
      data: heatmapDays,
      splitArea: { show: true },
      ...ui.axis,
    },
    yAxis: {
      type: 'category',
      data: heatmapRegions,
      ...ui.axis,
    },
    visualMap: {
      min: 20,
      max: 90,
      calculable: true,
      orient: 'vertical',
      right: 0,
      top: 'center',
      inRange: { color: ['#0c4a6e', '#0284c7', '#22d3ee', '#fbbf24'] },
      textStyle: { color: ui.legendColor },
    },
    series: [
      {
        type: 'heatmap',
        data,
        label: { show: true, color: '#e0f2fe', fontSize: 10 },
        itemStyle: { borderColor: '#0a1628', borderWidth: 2 },
      },
    ],
  }
  return (
    <ChartPanel title="Engagement Heatmap" library={meta.name} note="Library-specific · category matrix" accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsGauge() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 18,
            color: [
              [0.3, ECHARTS_PALETTE.rose],
              [0.7, ECHARTS_PALETTE.amber],
              [1, ECHARTS_PALETTE.cyan],
            ],
          },
        },
        pointer: { itemStyle: { color: ECHARTS_PALETTE.blue } },
        axisTick: { distance: -18, length: 6, lineStyle: { color: '#0a1628' } },
        splitLine: { distance: -22, length: 18, lineStyle: { color: '#0a1628', width: 3 } },
        axisLabel: { color: '#7dd3fc', distance: 28, fontSize: 11 },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: '#e0f2fe',
          fontSize: 22,
          offsetCenter: [0, '70%'],
        },
        title: { offsetCenter: [0, '92%'], color: '#7dd3fc', fontSize: 12 },
        data: [{ value: 78, name: 'Goal progress' }],
      },
    ],
  }
  return (
    <ChartPanel title="Goal Gauge" library={meta.name} note="Library-specific · gauge" accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsFunnel() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...ui.tooltip, trigger: 'item' },
    series: [
      {
        type: 'funnel',
        left: '12%',
        width: '76%',
        label: { color: '#e0f2fe' },
        itemStyle: { borderColor: '#0a1628', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(56,189,248,0.3)' },
        data: funnelPie,
      },
    ],
  }
  return (
    <ChartPanel title="Sales Funnel" library={meta.name} note="type: funnel" accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsCandlestick() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    tooltip: { ...ui.tooltip, trigger: 'axis' },
    grid: { left: 52, right: 16, top: 24, bottom: 28 },
    xAxis: { type: 'category', data: ohlcMonthly.map((d) => d.month), ...ui.axis },
    yAxis: { type: 'value', scale: true, ...ui.axis },
    series: [
      {
        type: 'candlestick',
        data: ohlcMonthly.map((d) => [d.open, d.close, d.low, d.high]),
        itemStyle: {
          color: ECHARTS_PALETTE.cyan,
          color0: ECHARTS_PALETTE.rose,
          borderColor: ECHARTS_PALETTE.cyan,
          borderColor0: ECHARTS_PALETTE.rose,
        },
      },
    ],
  }
  return (
    <ChartPanel
      title="Monthly OHLC (Candlestick)"
      library={meta.name}
      note="Library-specific · mock OHLC from revenue"
      accent="echarts"
    >
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsTreemap() {
  const ui = useEchartsUi()
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...ui.tooltip },
    series: [
      {
        type: 'treemap',
        data: treemapData,
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: { color: '#e0f2fe', fontSize: 12 },
        upperLabel: { show: true, height: 24, color: '#bae6fd' },
        itemStyle: { borderColor: '#0a1628', borderWidth: 2, gapWidth: 2 },
        levels: [
          { itemStyle: { borderWidth: 0, gapWidth: 4 } },
          { itemStyle: { borderWidth: 2, gapWidth: 2 } },
          {},
        ],
      },
    ],
  }
  return (
    <ChartPanel title="Revenue Treemap" library={meta.name} note="Library-specific · hierarchy" accent="echarts">
      <ReactECharts key={ui.themeKey} theme={ui.themeName} option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

/** Alias kept for CompareView shared row */
export const EChartsBar = EChartsStackedBar
export const EChartsPie = EChartsDonut

export function EChartsSuite() {
  return (
    <div className="space-y-4">
      <FingerprintBanner library="echarts" />
      <EChartsKpis />
      <div className="grid gap-4 xl:grid-cols-2">
        <EChartsLine />
        <EChartsArea />
        <EChartsStackedBar />
        <EChartsGroupedBar />
        <EChartsDonut />
        <EChartsNightingale />
        <EChartsScatter />
        <EChartsCombo />
        <EChartsRadar />
        <EChartsHeatmap />
        <EChartsGauge />
        <EChartsFunnel />
        <EChartsCandlestick />
        <EChartsTreemap />
      </div>
    </div>
  )
}
