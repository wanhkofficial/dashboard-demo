import ReactECharts from 'echarts-for-react'
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

const tooltip = {
  backgroundColor: 'rgba(8,15,30,0.95)',
  borderColor: '#38bdf8',
  textStyle: { color: '#e0f2fe' },
}

const glowBg = {
  backgroundColor: 'transparent',
}

export function EChartsKpis() {
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
                <div className="text-2xl font-semibold text-sky-50">{kpi.value}</div>
                <div
                  className={`mt-1 text-xs font-medium ${kpi.positive ? 'text-cyan-400' : 'text-rose-400'}`}
                >
                  {kpi.delta} vs prior
                </div>
              </div>
              <div className="h-14 w-28">
                <ReactECharts
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
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...tooltip, trigger: 'axis' },
    toolbox: {
      iconStyle: { borderColor: '#38bdf8' },
      feature: {
        dataZoom: { yAxisIndex: 'none' },
        restore: {},
        saveAsImage: { backgroundColor: '#0a1628' },
      },
    },
    legend: { textStyle: { color: '#7dd3fc' }, top: 0, left: 0 },
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
        textStyle: { color: '#7dd3fc' },
      },
    ],
    xAxis: { type: 'category', data: monthlySales.map((d) => d.month), ...darkAxis },
    yAxis: { type: 'value', ...darkAxis },
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
      <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsArea() {
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.cyan],
    tooltip: { ...tooltip, trigger: 'axis' },
    grid: { left: 48, right: 16, top: 24, bottom: 28 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: monthlySales.map((d) => d.month),
      ...darkAxis,
    },
    yAxis: { type: 'value', ...darkAxis },
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
      <ReactECharts option={option} style={{ height: 260 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsStackedBar() {
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.navy, ECHARTS_PALETTE.cyan, ECHARTS_PALETTE.glow],
    tooltip: { ...tooltip, trigger: 'axis' },
    legend: { textStyle: { color: '#7dd3fc' }, top: 0 },
    grid: { left: 48, right: 16, top: 40, bottom: 28 },
    xAxis: { type: 'category', data: categorySales.map((d) => d.category), ...darkAxis },
    yAxis: { type: 'value', ...darkAxis },
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
      <ReactECharts option={option} style={{ height: 260 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsGroupedBar() {
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.blue, ECHARTS_PALETTE.amber, ECHARTS_PALETTE.violet],
    tooltip: { ...tooltip, trigger: 'axis' },
    legend: { textStyle: { color: '#7dd3fc' }, top: 0 },
    grid: { left: 48, right: 16, top: 40, bottom: 28 },
    xAxis: { type: 'category', data: categorySales.map((d) => d.category), ...darkAxis },
    yAxis: { type: 'value', ...darkAxis },
    series: [
      { name: 'Online', type: 'bar', data: categorySales.map((d) => d.online), barGap: '10%' },
      { name: 'Retail', type: 'bar', data: categorySales.map((d) => d.retail) },
      { name: 'Partners', type: 'bar', data: categorySales.map((d) => d.partners) },
    ],
  }
  return (
    <ChartPanel title="Category Mix (Grouped Bar)" library={meta.name} note="Side-by-side bars" accent="echarts">
      <ReactECharts option={option} style={{ height: 260 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsDonut() {
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...tooltip, trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: '#7dd3fc' } },
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
      <ReactECharts option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

/** Nightingale / rose pie */
export function EChartsNightingale() {
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...tooltip, trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: '#7dd3fc' } },
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
      <ReactECharts option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsScatter() {
  const groups = ['Search', 'Social', 'Email', 'Display']
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: {
      ...tooltip,
      formatter: (p: { seriesName: string; value: number[] }) =>
        `${p.seriesName}<br/>Spend: $${p.value[0]}k<br/>Conversions: ${p.value[1]}`,
    },
    legend: { textStyle: { color: '#7dd3fc' }, top: 0 },
    grid: { left: 52, right: 16, top: 40, bottom: 36 },
    xAxis: { name: 'Ad spend ($k)', nameTextStyle: { color: '#64748b' }, ...darkAxis },
    yAxis: { name: 'Conversions', nameTextStyle: { color: '#64748b' }, ...darkAxis },
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
      <ReactECharts option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsCombo() {
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.navy, ECHARTS_PALETTE.amber],
    tooltip: { ...tooltip, trigger: 'axis' },
    legend: { textStyle: { color: '#7dd3fc' }, top: 0 },
    grid: { left: 52, right: 52, top: 40, bottom: 28 },
    xAxis: { type: 'category', data: trafficSources.map((d) => d.source), ...darkAxis },
    yAxis: [
      { type: 'value', name: 'Sessions', ...darkAxis },
      { type: 'value', name: 'Bounce %', max: 100, ...darkAxis },
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
      <ReactECharts option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsRadar() {
  const option = {
    ...glowBg,
    color: [ECHARTS_PALETTE.cyan, ECHARTS_PALETTE.glow, ECHARTS_PALETTE.amber],
    tooltip: tooltip,
    legend: { textStyle: { color: '#7dd3fc' }, bottom: 0 },
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
      <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsHeatmap() {
  const data: [number, number, number][] = []
  heatmapMatrix.forEach((row, yi) => {
    row.forEach((v, xi) => data.push([xi, yi, v]))
  })
  const option = {
    ...glowBg,
    tooltip: {
      ...tooltip,
      formatter: (p: { value: number[] }) =>
        `${heatmapRegions[p.value[1]]} · ${heatmapDays[p.value[0]]}: ${p.value[2]}`,
    },
    grid: { left: 72, right: 40, top: 16, bottom: 40 },
    xAxis: {
      type: 'category',
      data: heatmapDays,
      splitArea: { show: true },
      ...darkAxis,
    },
    yAxis: {
      type: 'category',
      data: heatmapRegions,
      ...darkAxis,
    },
    visualMap: {
      min: 20,
      max: 90,
      calculable: true,
      orient: 'vertical',
      right: 0,
      top: 'center',
      inRange: { color: ['#0c4a6e', '#0284c7', '#22d3ee', '#fbbf24'] },
      textStyle: { color: '#7dd3fc' },
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
      <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsGauge() {
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
      <ReactECharts option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsFunnel() {
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...tooltip, trigger: 'item' },
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
      <ReactECharts option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsCandlestick() {
  const option = {
    ...glowBg,
    tooltip: { ...tooltip, trigger: 'axis' },
    grid: { left: 52, right: 16, top: 24, bottom: 28 },
    xAxis: { type: 'category', data: ohlcMonthly.map((d) => d.month), ...darkAxis },
    yAxis: { type: 'value', scale: true, ...darkAxis },
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
      <ReactECharts option={option} style={{ height: 280 }} opts={{ renderer: 'canvas' }} />
    </ChartPanel>
  )
}

export function EChartsTreemap() {
  const option = {
    ...glowBg,
    color: ECHARTS_SERIES,
    tooltip: { ...tooltip },
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
      <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
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
