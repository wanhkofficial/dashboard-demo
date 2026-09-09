import type { ReactNode } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Cell,
  ComposedChart,
  ErrorBar,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Sankey,
  Scatter,
  ScatterChart,
  SunburstChart,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
} from 'recharts'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import {
  categorySales,
  channelScatter,
  funnelPie,
  monthlySales,
  radarScores,
  radialBarData,
} from '../../data/mockData'
import { ChartPanel } from '../../components/ChartPanel'

const RECHARTS_COLORS = ['#a78bfa', '#fb923c', '#34d399', '#38bdf8', '#f472b6', '#facc15']
const grid = { stroke: '#4c1d95', strokeDasharray: '4 4' }
const tip = {
  contentStyle: {
    background: '#1e1035',
    border: '1px solid #7c3aed',
    borderRadius: 8,
    color: '#ede9fe',
  },
}

const sankeyData = {
  nodes: [
    { name: 'Visit' },
    { name: 'Sign-up' },
    { name: 'Trial' },
    { name: 'Paid' },
    { name: 'Churn' },
  ],
  links: [
    { source: 0, target: 1, value: 120 },
    { source: 1, target: 2, value: 80 },
    { source: 2, target: 3, value: 50 },
    { source: 2, target: 4, value: 20 },
    { source: 1, target: 4, value: 15 },
  ],
}

const sunburstData = {
  name: 'root',
  children: [
    {
      name: 'Electronics',
      children: [
        { name: 'Phones', size: 40 },
        { name: 'Laptops', size: 28 },
      ],
    },
    {
      name: 'Apparel',
      children: [
        { name: 'Men', size: 22 },
        { name: 'Women', size: 30 },
      ],
    },
    {
      name: 'Home',
      children: [
        { name: 'Kitchen', size: 18 },
        { name: 'Decor', size: 14 },
      ],
    },
  ],
}

const errorBarData = monthlySales.slice(0, 8).map((d) => ({
  month: d.month,
  revenue: d.revenue,
  err: [d.revenue * 0.05, d.revenue * 0.07],
}))

const treemapDemo = [
  { name: 'Electronics / Phones', size: 42000, fill: '#a78bfa' },
  { name: 'Electronics / Laptops', size: 28000, fill: '#818cf8' },
  { name: 'Apparel / Online', size: 31000, fill: '#fb923c' },
  { name: 'Apparel / Retail', size: 36000, fill: '#f97316' },
  { name: 'Home / Furniture', size: 24000, fill: '#34d399' },
  { name: 'Sports / Gear', size: 18000, fill: '#38bdf8' },
]

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300/90">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">{children}</div>
    </section>
  )
}

export function RechartsOfficialGallery() {
  return (
    <div className="space-y-8">
      <FingerprintBanner library="recharts" />
      <div className="rounded-2xl border border-violet-500/20 border-dashed bg-slate-950/60 px-4 py-4 text-sm text-slate-400 light:border-violet-200 light:bg-white/80 light:text-slate-600">
        <p className="font-medium text-violet-100 light:text-violet-800">
          Recharts official chart components — complete set for this package version
        </p>
        <p className="mt-1 text-xs leading-relaxed">
          Covers every chart export in <code className="text-violet-300/80">recharts@{/* */}2.x</code>{' '}
          chart/ folder: LineChart, AreaChart, BarChart, ComposedChart, ScatterChart, PieChart,
          RadarChart, RadialBarChart, Treemap, FunnelChart, Sankey, SunburstChart — plus Brush,
          ReferenceLine / Area / Dot, and ErrorBar demos. Shared mock data from{' '}
          <code className="text-slate-500">mockData.ts</code>.
        </p>
      </div>

      <Section title="LineChart" subtitle="Multi-series line with CartesianGrid">
        <ChartPanel title="Revenue & profit" library="Recharts" note="LineChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlySales}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip {...tip} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#a78bfa" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="profit" stroke="#fb923c" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="LineChart + Brush" library="Recharts" note="Zoom / pan via Brush" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlySales}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip {...tip} />
              <Line type="monotone" dataKey="visitors" stroke="#34d399" strokeWidth={2} dot={false} />
              <Brush dataKey="month" height={22} stroke="#7c3aed" fill="#1e1035" />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
      </Section>

      <Section title="AreaChart">
        <ChartPanel title="Visitors area" library="Recharts" note="AreaChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlySales}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip {...tip} />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#a78bfa"
                fill="#7c3aed55"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Stacked area" library="Recharts" note="AreaChart stackOffset" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlySales}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip {...tip} />
              <Area type="monotone" dataKey="profit" stackId="1" stroke="#34d399" fill="#34d39955" />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="#fb923c"
                fill="#fb923c55"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>
      </Section>

      <Section title="BarChart">
        <ChartPanel title="Stacked channels" library="Recharts" note="BarChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categorySales}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="category" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip {...tip} />
              <Legend />
              <Bar dataKey="online" stackId="a" fill="#a78bfa" />
              <Bar dataKey="retail" stackId="a" fill="#fb923c" />
              <Bar dataKey="partners" stackId="a" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="BarChart + ErrorBar" library="Recharts" note="ErrorBar demo" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={errorBarData}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip {...tip} />
              <Bar dataKey="revenue" fill="#818cf8">
                <ErrorBar dataKey="err" width={4} stroke="#f472b6" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </Section>

      <Section title="ComposedChart + Reference*">
        <ChartPanel title="Combo line + bar" library="Recharts" note="ComposedChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={monthlySales}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis yAxisId="l" stroke="#c4b5fd" />
              <YAxis yAxisId="r" orientation="right" stroke="#fb923c" />
              <Tooltip {...tip} />
              <Legend />
              <Bar yAxisId="l" dataKey="revenue" fill="#a78bfa88" />
              <Line
                yAxisId="r"
                type="monotone"
                dataKey="profit"
                stroke="#fb923c"
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine yAxisId="l" y={60000} stroke="#f472b6" strokeDasharray="4 4" label="60k" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="ReferenceArea / ReferenceDot" library="Recharts" note="ComposedChart helpers" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlySales}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip {...tip} />
              <ReferenceArea x1="Jun" x2="Aug" fill="#7c3aed33" />
              <ReferenceDot x="Oct" y={71200} r={6} fill="#f472b6" stroke="#fff" />
              <Line type="monotone" dataKey="revenue" stroke="#a78bfa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
      </Section>

      <Section title="ScatterChart / PieChart">
        <ChartPanel title="Spend vs conversions" library="Recharts" note="ScatterChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid {...grid} />
              <XAxis type="number" dataKey="spend" name="spend" stroke="#c4b5fd" />
              <YAxis type="number" dataKey="conversions" name="conv" stroke="#c4b5fd" />
              <Tooltip {...tip} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={channelScatter} fill="#a78bfa" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Funnel stages" library="Recharts" note="PieChart (donut)" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={funnelPie}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
              >
                {funnelPie.map((_, i) => (
                  <Cell key={i} fill={RECHARTS_COLORS[i % RECHARTS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>
      </Section>

      <Section title="RadarChart / RadialBarChart">
        <ChartPanel title="Product scores" library="Recharts" note="RadarChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarScores}>
              <PolarGrid stroke="#4c1d95" />
              <PolarAngleAxis dataKey="axis" stroke="#c4b5fd" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar dataKey="productA" stroke="#a78bfa" fill="#a78bfa55" />
              <Radar dataKey="productB" stroke="#fb923c" fill="#fb923c33" />
              <Legend />
              <Tooltip {...tip} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Radial bars" library="Recharts" note="RadialBarChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <RadialBarChart
              innerRadius="20%"
              outerRadius="90%"
              data={radialBarData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar background dataKey="value" cornerRadius={6} />
              <Legend />
              <Tooltip {...tip} />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </Section>

      <Section title="Treemap / FunnelChart">
        <ChartPanel title="Category treemap" library="Recharts" note="Treemap" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <Treemap data={treemapDemo} dataKey="size" nameKey="name" stroke="#1e1035" aspectRatio={4 / 3}>
              <Tooltip {...tip} />
            </Treemap>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Conversion funnel" library="Recharts" note="FunnelChart" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <FunnelChart>
              <Tooltip {...tip} />
              <Funnel dataKey="value" data={funnelPie} isAnimationActive>
                <LabelList position="right" fill="#e9d5ff" stroke="none" dataKey="name" />
                {funnelPie.map((_, i) => (
                  <Cell key={i} fill={RECHARTS_COLORS[i % RECHARTS_COLORS.length]} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartPanel>
      </Section>

      <Section title="Sankey / SunburstChart">
        <ChartPanel title="Flow sankey" library="Recharts" note="Sankey" accent="recharts">
          <ResponsiveContainer width="100%" height={280}>
            <Sankey
              data={sankeyData}
              nodePadding={20}
              margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
              link={{ stroke: '#7c3aed88' }}
            >
              <Tooltip {...tip} />
            </Sankey>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Hierarchy sunburst" library="Recharts" note="SunburstChart" accent="recharts">
          <div className="flex h-[280px] items-center justify-center">
            <SunburstChart width={280} height={280} data={sunburstData} dataKey="size" fill="#a78bfa">
              <Tooltip {...tip} />
            </SunburstChart>
          </div>
        </ChartPanel>
      </Section>
    </div>
  )
}
