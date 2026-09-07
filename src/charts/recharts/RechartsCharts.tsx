import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList,
  Brush,
  ReferenceLine,
} from 'recharts'
import {
  monthlySales,
  categorySales,
  funnelPie,
  channelScatter,
  trafficSources,
  kpiMetrics,
  radarScores,
  treemapFlat,
  radialBarData,
  RECHARTS_PALETTE,
  RECHARTS_SERIES,
} from '../../data/mockData'
import { ChartPanel } from '../../components/ChartPanel'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import { LIBRARY_META } from '../../components/LibraryNotes'

const meta = LIBRARY_META.recharts

const axisProps = {
  stroke: '#a78bfa',
  tick: { fill: '#c4b5fd', fontSize: 12 },
}

const gridProps = { stroke: '#6d28d9', strokeDasharray: '4 4', strokeOpacity: 0.45 }

const tooltipStyle = {
  contentStyle: {
    background: 'rgba(24,16,40,0.96)',
    border: '1px dashed #a78bfa',
    borderRadius: 8,
    color: '#f5f3ff',
  },
  labelStyle: { color: '#ddd6fe' },
}

export function RechartsKpis() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpiMetrics.map((kpi) => {
        const data = kpi.spark.map((v, i) => ({ i, v }))
        const color = kpi.positive ? RECHARTS_PALETTE.orange : RECHARTS_PALETTE.rose
        return (
          <ChartPanel
            key={kpi.label}
            title={kpi.label}
            library={meta.short}
            note="SVG sparkline KPI"
            accent="recharts"
            className="!min-h-0"
          >
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-2xl font-semibold text-violet-50">{kpi.value}</div>
                <div
                  className={`mt-1 text-xs font-medium ${kpi.positive ? 'text-orange-400' : 'text-rose-400'}`}
                >
                  {kpi.delta} vs prior
                </div>
              </div>
              <div className="h-14 w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id={`rc-spark-${kpi.label}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={color}
                      fill={`url(#rc-spark-${kpi.label})`}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ChartPanel>
        )
      })}
    </div>
  )
}

export function RechartsLine() {
  return (
    <ChartPanel
      title="Revenue & Profit (Line + dots)"
      library={meta.name}
      note="Visible dots · dashed grid · violet/orange"
      accent="recharts"
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={monthlySales}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Legend />
          <ReferenceLine
            y={60000}
            stroke={RECHARTS_PALETTE.fuchsia}
            strokeDasharray="6 4"
            label={{ value: 'Target', fill: '#e879f9', fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={RECHARTS_PALETTE.orange}
            strokeWidth={2.5}
            dot={{ r: 4, fill: RECHARTS_PALETTE.orange, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            name="Profit"
            stroke={RECHARTS_PALETTE.violet}
            strokeWidth={2.5}
            dot={{ r: 4, fill: RECHARTS_PALETTE.violet, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsLineBrush() {
  return (
    <ChartPanel
      title="Revenue (Line + Brush zoom/pan)"
      library={meta.name}
      note="Library-specific · Brush"
      accent="recharts"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlySales}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={RECHARTS_PALETTE.orange}
            strokeWidth={2.5}
            dot={{ r: 3, fill: RECHARTS_PALETTE.orange }}
          />
          <Brush dataKey="month" height={24} stroke={RECHARTS_PALETTE.violet} fill="#1a1028" />
        </LineChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsArea() {
  return (
    <ChartPanel title="Visitors (Area)" library={meta.name} note="Orange→violet gradient" accent="recharts">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={monthlySales}>
          <defs>
            <linearGradient id="rc-visitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={RECHARTS_PALETTE.orange} stopOpacity={0.5} />
              <stop offset="100%" stopColor={RECHARTS_PALETTE.violet} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Area
            type="monotone"
            dataKey="visitors"
            name="Visitors"
            stroke={RECHARTS_PALETTE.orange}
            fill="url(#rc-visitors)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: RECHARTS_PALETTE.violet }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsStackedBar() {
  return (
    <ChartPanel title="Category Mix (Stacked Bar)" library={meta.name} note={meta.note} accent="recharts">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={categorySales}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="category" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Legend />
          <Bar dataKey="online" name="Online" stackId="a" fill={RECHARTS_PALETTE.orange} />
          <Bar dataKey="retail" name="Retail" stackId="a" fill={RECHARTS_PALETTE.violet} />
          <Bar
            dataKey="partners"
            name="Partners"
            stackId="a"
            fill={RECHARTS_PALETTE.amber}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsGroupedBar() {
  return (
    <ChartPanel title="Category Mix (Grouped Bar)" library={meta.name} note="Side-by-side bars" accent="recharts">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={categorySales} barGap={4}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="category" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Legend />
          <Bar dataKey="online" name="Online" fill={RECHARTS_PALETTE.orange} radius={[4, 4, 0, 0]} />
          <Bar dataKey="retail" name="Retail" fill={RECHARTS_PALETTE.violet} radius={[4, 4, 0, 0]} />
          <Bar dataKey="partners" name="Partners" fill={RECHARTS_PALETTE.fuchsia} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsDonut() {
  return (
    <ChartPanel title="Conversion Funnel (Donut)" library={meta.name} note={meta.note} accent="recharts">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Tooltip {...tooltipStyle} />
          <Legend />
          <Pie
            data={funnelPie}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            stroke="#1a1028"
            strokeWidth={2}
          >
            {funnelPie.map((_, i) => (
              <Cell key={i} fill={RECHARTS_SERIES[i % RECHARTS_SERIES.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsPie() {
  return (
    <ChartPanel title="Conversion Share (Pie)" library={meta.name} note="Full pie (no hole)" accent="recharts">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Tooltip {...tooltipStyle} />
          <Legend />
          <Pie
            data={funnelPie}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            paddingAngle={2}
            stroke="#1a1028"
            label
          >
            {funnelPie.map((_, i) => (
              <Cell key={i} fill={RECHARTS_SERIES[i % RECHARTS_SERIES.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsScatter() {
  const groups = ['Search', 'Social', 'Email', 'Display'] as const
  return (
    <ChartPanel title="Spend vs Conversions (Scatter)" library={meta.name} note={meta.note} accent="recharts">
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid {...gridProps} />
          <XAxis type="number" dataKey="spend" name="Ad spend ($k)" {...axisProps} />
          <YAxis type="number" dataKey="conversions" name="Conversions" {...axisProps} />
          <ZAxis range={[80, 80]} />
          <Tooltip {...tooltipStyle} cursor={{ strokeDasharray: '4 4' }} />
          <Legend />
          {groups.map((g, i) => (
            <Scatter
              key={g}
              name={g}
              data={channelScatter.filter((d) => d.channel === g)}
              fill={RECHARTS_SERIES[i]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsCombo() {
  return (
    <ChartPanel title="Traffic + Bounce (ComposedChart)" library={meta.name} note="Bar + Line dual axis" accent="recharts">
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={trafficSources}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="source" {...axisProps} />
          <YAxis yAxisId="left" {...axisProps} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="sessions"
            name="Sessions"
            fill={RECHARTS_PALETTE.violet}
            radius={[4, 4, 0, 0]}
            barSize={28}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bounce"
            name="Bounce %"
            stroke={RECHARTS_PALETTE.orange}
            strokeWidth={2.5}
            dot={{ r: 4, fill: RECHARTS_PALETTE.orange }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsRadar() {
  return (
    <ChartPanel title="Product Radar" library={meta.name} note="Library-specific · RadarChart" accent="recharts">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarScores}>
          <PolarGrid stroke="#6d28d9" strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: '#c4b5fd', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#a78bfa', fontSize: 10 }} />
          <Radar
            name="Product A"
            dataKey="productA"
            stroke={RECHARTS_PALETTE.orange}
            fill={RECHARTS_PALETTE.orange}
            fillOpacity={0.3}
          />
          <Radar
            name="Product B"
            dataKey="productB"
            stroke={RECHARTS_PALETTE.violet}
            fill={RECHARTS_PALETTE.violet}
            fillOpacity={0.25}
          />
          <Radar
            name="Product C"
            dataKey="productC"
            stroke={RECHARTS_PALETTE.fuchsia}
            fill={RECHARTS_PALETTE.fuchsia}
            fillOpacity={0.2}
          />
          <Legend />
          <Tooltip {...tooltipStyle} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsRadialBar() {
  return (
    <ChartPanel title="Funnel Radial Bar" library={meta.name} note="Library-specific · RadialBarChart" accent="recharts">
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          data={radialBarData}
          startAngle={180}
          endAngle={-180}
        >
          <RadialBar background dataKey="value" cornerRadius={6}>
            <LabelList dataKey="name" position="insideStart" fill="#f5f3ff" fontSize={11} />
          </RadialBar>
          <Legend />
          <Tooltip {...tooltipStyle} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsTreemap() {
  return (
    <ChartPanel title="Category Treemap" library={meta.name} note="Library-specific · Treemap" accent="recharts">
      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={treemapFlat}
          dataKey="size"
          nameKey="name"
          stroke="#1a1028"
          fill={RECHARTS_PALETTE.violet}
          aspectRatio={4 / 3}
        >
          <Tooltip {...tooltipStyle} />
        </Treemap>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

export function RechartsFunnel() {
  return (
    <ChartPanel title="Sales Funnel" library={meta.name} note="Library-specific · FunnelChart" accent="recharts">
      <ResponsiveContainer width="100%" height={280}>
        <FunnelChart>
          <Tooltip {...tooltipStyle} />
          <Funnel dataKey="value" data={funnelPie} isAnimationActive={false}>
            <LabelList position="right" fill="#e9d5ff" stroke="none" dataKey="name" />
            {funnelPie.map((_, i) => (
              <Cell key={i} fill={RECHARTS_SERIES[i % RECHARTS_SERIES.length]} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}

/** Aliases for CompareView */
export const RechartsBar = RechartsStackedBar

export function RechartsSuite() {
  return (
    <div className="space-y-4">
      <FingerprintBanner library="recharts" />
      <RechartsKpis />
      <div className="grid gap-4 xl:grid-cols-2">
        <RechartsLine />
        <RechartsLineBrush />
        <RechartsArea />
        <RechartsStackedBar />
        <RechartsGroupedBar />
        <RechartsDonut />
        <RechartsPie />
        <RechartsScatter />
        <RechartsCombo />
        <RechartsRadar />
        <RechartsRadialBar />
        <RechartsTreemap />
        <RechartsFunnel />
      </div>
    </div>
  )
}
