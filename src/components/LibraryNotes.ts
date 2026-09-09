export const LIBRARY_META = {
  echarts: {
    name: 'Apache ECharts',
    note: 'Canvas renderer · option-driven · dataZoom / toolbox / gauge / candlestick',
    short: 'ECharts',
    renderer: 'Canvas',
  },
  recharts: {
    name: 'Recharts',
    note: 'SVG · declarative React · Brush / Radar / RadialBar / Funnel / Treemap',
    short: 'Recharts',
    renderer: 'SVG',
  },
  tremor: {
    name: 'Tremor',
    note: 'UI kit on Recharts · Card/Metric/BadgeDelta · BarList / Tracker / ProgressBar',
    short: 'Tremor',
    renderer: 'SVG (via Recharts)',
  },
  chartjs: {
    name: 'Chart.js',
    note: 'Canvas · react-chartjs-2 · Line / Bar / Doughnut / Scatter · register once',
    short: 'Chart.js',
    renderer: 'Canvas',
  },
  nivo: {
    name: 'Nivo',
    note: 'SVG · ResponsiveLine / Bar / Pie / Scatter · rich theme tokens',
    short: 'Nivo',
    renderer: 'SVG',
  },
} as const

export type LibraryKey = keyof typeof LIBRARY_META

export const LIBRARY_ONLY = {
  echarts: ['Radar', 'Heatmap', 'Gauge', 'Candlestick', 'Nightingale rose', 'Treemap', 'Funnel', 'dataZoom'],
  recharts: ['RadarChart', 'RadialBarChart', 'Treemap', 'FunnelChart', 'Brush zoom', 'ReferenceLine'],
  tremor: ['BarList', 'ProgressBar', 'CategoryBar', 'Tracker', 'FunnelChart', 'Spark charts'],
  chartjs: ['Doughnut', 'Polar Area', 'Radar (Chart.js)', 'Time scale', 'Plugin API'],
  nivo: ['Stream', 'Bump', 'Calendar', 'Chord', 'Sankey', 'TreeMap', 'Waffle'],
} as const
