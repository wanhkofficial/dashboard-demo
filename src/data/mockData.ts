/** Shared mock business metrics — identical across ECharts / Recharts / Tremor where fair.
 *  Extra datasets below power library-specific chart types.
 */

export type MonthPoint = {
  month: string
  revenue: number
  profit: number
  expenses: number
  visitors: number
}

export type CategoryPoint = {
  category: string
  online: number
  retail: number
  partners: number
}

export type FunnelSlice = {
  name: string
  value: number
}

export type ScatterPoint = {
  spend: number
  conversions: number
  channel: string
}

export type TrafficPoint = {
  source: string
  sessions: number
  bounce: number
}

export type KpiSpark = {
  label: string
  value: string
  delta: string
  positive: boolean
  spark: number[]
}

export type RadarAxis = {
  axis: string
  productA: number
  productB: number
  productC: number
}

export type OhlcPoint = {
  month: string
  open: number
  close: number
  low: number
  high: number
}

export type TreemapNode = {
  name: string
  value?: number
  children?: TreemapNode[]
}

export type BarListItem = {
  name: string
  value: number
}

export type TrackerItem = {
  color: 'emerald' | 'yellow' | 'rose' | 'gray' | 'cyan' | 'blue'
  tooltip: string
}

export type ProgressItem = {
  label: string
  value: number
  color: 'emerald' | 'cyan' | 'amber' | 'violet' | 'rose' | 'blue'
}

export type RadialPoint = {
  name: string
  value: number
  fill: string
}

export const monthlySales: MonthPoint[] = [
  { month: 'Jan', revenue: 42000, profit: 12800, expenses: 29200, visitors: 18200 },
  { month: 'Feb', revenue: 45500, profit: 14100, expenses: 31400, visitors: 19500 },
  { month: 'Mar', revenue: 51200, profit: 16200, expenses: 35000, visitors: 22100 },
  { month: 'Apr', revenue: 48700, profit: 15100, expenses: 33600, visitors: 20800 },
  { month: 'May', revenue: 53800, profit: 17800, expenses: 36000, visitors: 24300 },
  { month: 'Jun', revenue: 59100, profit: 19600, expenses: 39500, visitors: 26800 },
  { month: 'Jul', revenue: 62400, profit: 21100, expenses: 41300, visitors: 28100 },
  { month: 'Aug', revenue: 60200, profit: 19800, expenses: 40400, visitors: 27400 },
  { month: 'Sep', revenue: 65800, profit: 22400, expenses: 43400, visitors: 30200 },
  { month: 'Oct', revenue: 71200, profit: 24800, expenses: 46400, visitors: 32900 },
  { month: 'Nov', revenue: 76500, profit: 27100, expenses: 49400, visitors: 35100 },
  { month: 'Dec', revenue: 84200, profit: 30500, expenses: 53700, visitors: 38900 },
]

export const categorySales: CategoryPoint[] = [
  { category: 'Electronics', online: 42000, retail: 28000, partners: 12000 },
  { category: 'Apparel', online: 31000, retail: 36000, partners: 9000 },
  { category: 'Home', online: 24000, retail: 22000, partners: 15000 },
  { category: 'Sports', online: 18000, retail: 14000, partners: 8000 },
  { category: 'Beauty', online: 27000, retail: 19000, partners: 11000 },
]

export const funnelPie: FunnelSlice[] = [
  { name: 'Awareness', value: 100000 },
  { name: 'Interest', value: 62000 },
  { name: 'Consideration', value: 34000 },
  { name: 'Purchase', value: 18000 },
  { name: 'Retention', value: 9200 },
]

export const channelScatter: ScatterPoint[] = [
  { spend: 12, conversions: 840, channel: 'Search' },
  { spend: 18, conversions: 1120, channel: 'Search' },
  { spend: 25, conversions: 1480, channel: 'Search' },
  { spend: 9, conversions: 520, channel: 'Social' },
  { spend: 15, conversions: 780, channel: 'Social' },
  { spend: 22, conversions: 990, channel: 'Social' },
  { spend: 7, conversions: 410, channel: 'Email' },
  { spend: 11, conversions: 690, channel: 'Email' },
  { spend: 16, conversions: 910, channel: 'Email' },
  { spend: 20, conversions: 860, channel: 'Display' },
  { spend: 28, conversions: 1020, channel: 'Display' },
  { spend: 35, conversions: 1180, channel: 'Display' },
]

export const trafficSources: TrafficPoint[] = [
  { source: 'Organic', sessions: 42000, bounce: 38 },
  { source: 'Paid Search', sessions: 28000, bounce: 42 },
  { source: 'Social', sessions: 19000, bounce: 51 },
  { source: 'Direct', sessions: 24000, bounce: 33 },
  { source: 'Referral', sessions: 11000, bounce: 46 },
  { source: 'Email', sessions: 9000, bounce: 29 },
]

export const kpiMetrics: KpiSpark[] = [
  {
    label: 'Revenue',
    value: '$84.2k',
    delta: '+10.1%',
    positive: true,
    spark: monthlySales.map((d) => d.revenue),
  },
  {
    label: 'Profit',
    value: '$30.5k',
    delta: '+12.6%',
    positive: true,
    spark: monthlySales.map((d) => d.profit),
  },
  {
    label: 'Visitors',
    value: '38.9k',
    delta: '+10.8%',
    positive: true,
    spark: monthlySales.map((d) => d.visitors),
  },
  {
    label: 'Expenses',
    value: '$53.7k',
    delta: '+8.7%',
    positive: false,
    spark: monthlySales.map((d) => d.expenses),
  },
]

/** Radar axes — product capability scores */
export const radarScores: RadarAxis[] = [
  { axis: 'Performance', productA: 85, productB: 72, productC: 90 },
  { axis: 'Reliability', productA: 78, productB: 88, productC: 70 },
  { axis: 'UX', productA: 92, productB: 65, productC: 80 },
  { axis: 'Support', productA: 70, productB: 95, productC: 75 },
  { axis: 'Price', productA: 60, productB: 80, productC: 55 },
  { axis: 'Features', productA: 88, productB: 74, productC: 92 },
]

/** Heatmap: region × weekday engagement (0–100) */
export const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const heatmapRegions = ['North', 'South', 'East', 'West', 'Central']
export const heatmapMatrix: number[][] = [
  [42, 55, 68, 72, 80, 35, 28],
  [38, 48, 60, 65, 70, 40, 32],
  [50, 62, 75, 82, 88, 45, 38],
  [33, 41, 52, 58, 64, 30, 25],
  [45, 58, 70, 76, 85, 42, 36],
]

/** Mock OHLC derived from monthly revenue swing */
export const ohlcMonthly: OhlcPoint[] = monthlySales.map((d, i) => {
  const prev = i === 0 ? d.revenue * 0.95 : monthlySales[i - 1].revenue
  const open = Math.round(prev)
  const close = d.revenue
  const low = Math.round(Math.min(open, close) * 0.94)
  const high = Math.round(Math.max(open, close) * 1.06)
  return { month: d.month, open, close, low, high }
})

/** Treemap — org revenue hierarchy */
export const treemapData: TreemapNode[] = [
  {
    name: 'Revenue',
    children: [
      {
        name: 'Online',
        children: [
          { name: 'Electronics', value: 42000 },
          { name: 'Apparel', value: 31000 },
          { name: 'Beauty', value: 27000 },
        ],
      },
      {
        name: 'Retail',
        children: [
          { name: 'Apparel Stores', value: 36000 },
          { name: 'Electronics Stores', value: 28000 },
          { name: 'Home Stores', value: 22000 },
        ],
      },
      {
        name: 'Partners',
        children: [
          { name: 'Affiliates', value: 15000 },
          { name: 'Resellers', value: 12000 },
          { name: 'Marketplaces', value: 11000 },
        ],
      },
    ],
  },
]

/** Flat treemap for Recharts */
export const treemapFlat = [
  { name: 'Electronics', size: 42000, fill: '#f97316' },
  { name: 'Apparel', size: 36000, fill: '#a78bfa' },
  { name: 'Home', size: 22000, fill: '#fb923c' },
  { name: 'Beauty', size: 27000, fill: '#c084fc' },
  { name: 'Sports', size: 18000, fill: '#fdba74' },
  { name: 'Partners', size: 38000, fill: '#8b5cf6' },
]

export const barListItems: BarListItem[] = [
  { name: 'Organic Search', value: 42000 },
  { name: 'Paid Search', value: 28000 },
  { name: 'Direct', value: 24000 },
  { name: 'Social', value: 19000 },
  { name: 'Referral', value: 11000 },
  { name: 'Email', value: 9000 },
]

export const categoryBarValues = [42, 28, 18, 12]

export const progressItems: ProgressItem[] = [
  { label: 'Q4 Revenue goal', value: 78, color: 'emerald' },
  { label: 'NPS target', value: 64, color: 'cyan' },
  { label: 'Support SLA', value: 91, color: 'amber' },
  { label: 'Feature adoption', value: 53, color: 'violet' },
]

/** Uptime tracker — last 30 slots */
export const trackerItems: TrackerItem[] = [
  ...Array.from({ length: 22 }, () => ({ color: 'emerald' as const, tooltip: 'Operational' })),
  { color: 'yellow', tooltip: 'Degraded 14:00–14:20' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'rose', tooltip: 'Outage 09:12–09:45' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'yellow', tooltip: 'Elevated latency' },
  { color: 'emerald', tooltip: 'Operational' },
]

export const radialBarData: RadialPoint[] = [
  { name: 'Awareness', value: 100, fill: '#f97316' },
  { name: 'Interest', value: 72, fill: '#a78bfa' },
  { name: 'Consideration', value: 48, fill: '#fb923c' },
  { name: 'Purchase', value: 28, fill: '#c084fc' },
  { name: 'Retention', value: 15, fill: '#fdba74' },
]

/** Distinct library color languages */
export const ECHARTS_PALETTE = {
  blue: '#38bdf8',
  cyan: '#22d3ee',
  navy: '#0ea5e9',
  glow: '#60a5fa',
  emerald: '#34d399',
  amber: '#fbbf24',
  rose: '#fb7185',
  violet: '#818cf8',
}

export const RECHARTS_PALETTE = {
  orange: '#f97316',
  violet: '#a78bfa',
  fuchsia: '#e879f9',
  amber: '#fb923c',
  rose: '#fb7185',
  indigo: '#818cf6',
  slate: '#94a3b8',
}

export const CHART_COLORS = {
  blue: '#3b82f6',
  cyan: '#22d3ee',
  emerald: '#34d399',
  amber: '#fbbf24',
  violet: '#a78bfa',
  rose: '#fb7185',
  slate: '#94a3b8',
  orange: '#f97316',
}

export const SERIES_PALETTE = [
  CHART_COLORS.blue,
  CHART_COLORS.cyan,
  CHART_COLORS.emerald,
  CHART_COLORS.amber,
  CHART_COLORS.violet,
  CHART_COLORS.rose,
]

export const ECHARTS_SERIES = [
  ECHARTS_PALETTE.blue,
  ECHARTS_PALETTE.cyan,
  ECHARTS_PALETTE.glow,
  ECHARTS_PALETTE.emerald,
  ECHARTS_PALETTE.amber,
  ECHARTS_PALETTE.violet,
]

export const RECHARTS_SERIES = [
  RECHARTS_PALETTE.orange,
  RECHARTS_PALETTE.violet,
  RECHARTS_PALETTE.amber,
  RECHARTS_PALETTE.fuchsia,
  RECHARTS_PALETTE.indigo,
  RECHARTS_PALETTE.rose,
]
