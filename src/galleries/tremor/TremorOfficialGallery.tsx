import type { ReactNode } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import {
  AreaChart,
  BarChart,
  BarList,
  Card,
  CategoryBar,
  DeltaBar,
  DonutChart,
  FunnelChart,
  LineChart,
  MarkerBar,
  ProgressBar,
  ProgressCircle,
  ScatterChart,
  SparkAreaChart,
  SparkBarChart,
  SparkLineChart,
  Title,
  Text,
  Tracker,
  Flex,
  Metric,
} from '@tremor/react'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import {
  barListItems,
  categoryBarValues,
  categorySales,
  channelScatter,
  funnelPie,
  kpiMetrics,
  monthlySales,
  progressItems,
  trackerItems,
} from '../../data/mockData'

const chartdata = monthlySales.map((d) => ({
  month: d.month,
  Revenue: d.revenue,
  Profit: d.profit,
  Expenses: d.expenses,
  Visitors: d.visitors,
}))

const categoryData = categorySales.map((d) => ({
  category: d.category,
  Online: d.online,
  Retail: d.retail,
  Partners: d.partners,
}))

const donutData = funnelPie.map((d) => ({ name: d.name, value: d.value }))

function Panel({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: ReactNode
}) {
  return (
    <Card className="bg-slate-950/80 ring-1 ring-slate-800 light:bg-white light:ring-slate-200">
      <Title className="text-slate-100 light:text-slate-900">{title}</Title>
      {note && <Text className="mt-1 text-slate-500">{note}</Text>}
      <div className="mt-4">{children}</div>
    </Card>
  )
}

export function TremorOfficialGallery() {
  const { isDark } = useTheme()
  return (
    <div className={`${isDark ? 'dark' : ''} space-y-8`}>
      <FingerprintBanner library="tremor" />
      <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 px-4 py-4 text-sm text-slate-400 light:border-emerald-200 light:bg-white/80 light:text-slate-600">
        <p className="font-medium text-emerald-100 light:text-emerald-800">
          Tremor visualization surface — complete for @tremor/react 3.18.x
        </p>
        <p className="mt-1 text-xs leading-relaxed">
          Honest note: Tremor is not ECharts-scale. This gallery demos every chart-like export in the
          installed package: AreaChart, BarChart, DonutChart, LineChart, ScatterChart, FunnelChart,
          BarList, ProgressBar, ProgressCircle, CategoryBar, DeltaBar, MarkerBar, Tracker, plus
          SparkAreaChart / SparkLineChart / SparkBarChart. Tremor charts are Recharts under the hood
          with Tailwind dashboard chrome.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
          Charts
        </h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <Panel title="AreaChart" note="chart-elements">
            <AreaChart
              className="h-72"
              data={chartdata}
              index="month"
              categories={['Revenue', 'Profit']}
              colors={['cyan', 'emerald']}
              showLegend
            />
          </Panel>
          <Panel title="LineChart" note="chart-elements">
            <LineChart
              className="h-72"
              data={chartdata}
              index="month"
              categories={['Visitors', 'Expenses']}
              colors={['cyan', 'amber']}
              showLegend
            />
          </Panel>
          <Panel title="BarChart" note="chart-elements">
            <BarChart
              className="h-72"
              data={categoryData}
              index="category"
              categories={['Online', 'Retail', 'Partners']}
              colors={['cyan', 'emerald', 'amber']}
              stack
            />
          </Panel>
          <Panel title="DonutChart" note="chart-elements">
            <DonutChart
              className="h-72"
              data={donutData}
              category="value"
              index="name"
              colors={['cyan', 'emerald', 'amber', 'violet', 'rose']}
              showLabel
            />
          </Panel>
          <Panel title="ScatterChart" note="chart-elements">
            <ScatterChart
              className="h-72"
              data={channelScatter}
              category="channel"
              x="spend"
              y="conversions"
              colors={['cyan', 'emerald', 'amber', 'violet', 'rose']}
              showAnimation={false}
              showLegend
              xAxisLabel="Ad spend ($k)"
              yAxisLabel="Conversions"
            />
          </Panel>
          <Panel title="FunnelChart" note="chart-elements">
            <FunnelChart className="h-72" data={funnelPie} color="cyan" gradient evolutionGradient />
          </Panel>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
          Vis elements
        </h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <Panel title="BarList" note="vis-elements">
            <BarList data={barListItems} color="cyan" />
          </Panel>
          <Panel title="CategoryBar" note="vis-elements">
            <CategoryBar values={categoryBarValues} colors={['cyan', 'emerald', 'amber', 'rose']} />
          </Panel>
          <Panel title="ProgressBar" note="vis-elements">
            <div className="space-y-4">
              {progressItems.map((p) => (
                <div key={p.label}>
                  <Flex>
                    <Text>{p.label}</Text>
                    <Text>{p.value}%</Text>
                  </Flex>
                  <ProgressBar value={p.value} color={p.color} className="mt-1" />
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="ProgressCircle" note="vis-elements">
            <Flex className="justify-evenly">
              {progressItems.slice(0, 4).map((p) => (
                <div key={p.label} className="text-center">
                  <ProgressCircle value={p.value} color={p.color} size="md">
                    <span className="text-xs text-slate-300">{p.value}%</span>
                  </ProgressCircle>
                  <Text className="mt-2">{p.label}</Text>
                </div>
              ))}
            </Flex>
          </Panel>
          <Panel title="DeltaBar" note="vis-elements">
            <div className="space-y-3">
              <div>
                <Text>WoW revenue</Text>
                <DeltaBar value={42} className="mt-1" />
              </div>
              <div>
                <Text>WoW churn</Text>
                <DeltaBar value={-18} className="mt-1" />
              </div>
              <div>
                <Text>Neutral</Text>
                <DeltaBar value={0} className="mt-1" isIncreasePositive={false} />
              </div>
            </div>
          </Panel>
          <Panel title="MarkerBar" note="vis-elements">
            <div className="space-y-4">
              <div>
                <Text>Quota attainment</Text>
                <MarkerBar value={68} minValue={0} maxValue={100} className="mt-2" color="cyan" />
              </div>
              <div>
                <Text>Pipeline coverage</Text>
                <MarkerBar value={35} minValue={0} maxValue={100} className="mt-2" color="emerald" />
              </div>
            </div>
          </Panel>
          <Panel title="Tracker" note="vis-elements · uptime style">
            <Tracker data={trackerItems} className="mt-1" />
          </Panel>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
          Sparklines
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiMetrics.map((kpi) => {
            const spark = kpi.spark.map((v, i) => ({ i: String(i), v }))
            return (
              <Card key={kpi.label} className="bg-slate-950/80 ring-1 ring-slate-800 light:bg-white light:ring-slate-200">
                <Text>{kpi.label}</Text>
                <Metric className="text-slate-50">{kpi.value}</Metric>
                <div className="mt-3 space-y-2">
                  <SparkAreaChart data={spark} index="i" categories={['v']} colors={['cyan']} className="h-10 w-full" />
                  <SparkLineChart data={spark} index="i" categories={['v']} colors={['emerald']} className="h-10 w-full" />
                  <SparkBarChart data={spark} index="i" categories={['v']} colors={['amber']} className="h-10 w-full" />
                </div>
              </Card>
            )
          })}
        </div>
        <p className="text-xs text-slate-500">
          Each KPI card shows SparkAreaChart, SparkLineChart, and SparkBarChart (all three spark
          exports).
        </p>
      </section>
    </div>
  )
}
