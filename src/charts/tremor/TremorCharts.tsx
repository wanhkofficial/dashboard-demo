import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  ScatterChart,
  FunnelChart,
  BarList,
  ProgressBar,
  CategoryBar,
  Tracker,
  Title,
} from '@tremor/react'
import {
  monthlySales,
  categorySales,
  funnelPie,
  channelScatter,
  kpiMetrics,
  barListItems,
  categoryBarValues,
  progressItems,
  trackerItems,
} from '../../data/mockData'
import { ChartPanel, NotAvailableCard } from '../../components/ChartPanel'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import { LIBRARY_META } from '../../components/LibraryNotes'

const meta = LIBRARY_META.tremor

const sparkData = kpiMetrics.map((kpi) =>
  kpi.spark.map((v, i) => ({ month: monthlySales[i].month, value: v })),
)

export function TremorKpis() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpiMetrics.map((kpi, idx) => (
        <Card
          key={kpi.label}
          decoration="top"
          decorationColor={kpi.positive ? 'emerald' : 'rose'}
          className="bg-slate-950/80 ring-1 ring-cyan-800/40 light:bg-white light:ring-cyan-200"
        >
          <Flex alignItems="start">
            <div>
              <Text>{kpi.label}</Text>
              <Metric className="text-slate-50 light:text-slate-900">{kpi.value}</Metric>
            </div>
            <BadgeDelta deltaType={kpi.positive ? 'moderateIncrease' : 'moderateDecrease'}>
              {kpi.delta}
            </BadgeDelta>
          </Flex>
          <AreaChart
            className="mt-3 h-14"
            data={sparkData[idx]}
            index="month"
            categories={['value']}
            colors={[kpi.positive ? 'emerald' : 'rose']}
            showXAxis={false}
            showYAxis={false}
            showLegend={false}
            showGridLines={false}
            showAnimation={false}
            curveType="monotone"
          />
          <p className="mt-2 text-[11px] text-slate-500">
            <span className="font-medium text-cyan-300">{meta.short}</span> · Card + Metric + BadgeDelta
          </p>
        </Card>
      ))}
    </div>
  )
}

export function TremorLine() {
  return (
    <ChartPanel title="Revenue & Profit (LineChart)" library={meta.name} note={meta.note} accent="tremor">
      <LineChart
        className="h-64"
        data={monthlySales}
        index="month"
        categories={['revenue', 'profit']}
        colors={['cyan', 'emerald']}
        showLegend
        showAnimation={false}
        curveType="monotone"
      />
    </ChartPanel>
  )
}

export function TremorArea() {
  return (
    <ChartPanel title="Visitors (AreaChart)" library={meta.name} note={meta.note} accent="tremor">
      <AreaChart
        className="h-64"
        data={monthlySales}
        index="month"
        categories={['visitors']}
        colors={['emerald']}
        showLegend={false}
        showAnimation={false}
        curveType="monotone"
      />
    </ChartPanel>
  )
}

export function TremorStackedBar() {
  return (
    <ChartPanel title="Category Mix (Stacked BarChart)" library={meta.name} note={meta.note} accent="tremor">
      <BarChart
        className="h-64"
        data={categorySales}
        index="category"
        categories={['online', 'retail', 'partners']}
        colors={['cyan', 'emerald', 'teal']}
        stack
        showAnimation={false}
      />
    </ChartPanel>
  )
}

export function TremorGroupedBar() {
  return (
    <ChartPanel title="Category Mix (Grouped BarChart)" library={meta.name} note="stack={false}" accent="tremor">
      <BarChart
        className="h-64"
        data={categorySales}
        index="category"
        categories={['online', 'retail', 'partners']}
        colors={['cyan', 'emerald', 'amber']}
        showAnimation={false}
      />
    </ChartPanel>
  )
}

export function TremorPie() {
  return (
    <ChartPanel title="Conversion Funnel (DonutChart)" library={meta.name} note={meta.note} accent="tremor">
      <div className="flex h-[280px] flex-col items-center justify-center">
        <DonutChart
          className="h-52"
          data={funnelPie}
          category="value"
          index="name"
          colors={['cyan', 'emerald', 'teal', 'amber', 'blue']}
          showAnimation={false}
          showLabel
        />
      </div>
    </ChartPanel>
  )
}

export function TremorScatter() {
  return (
    <ChartPanel title="Spend vs Conversions (ScatterChart)" library={meta.name} note={meta.note} accent="tremor">
      <ScatterChart
        className="h-72"
        data={channelScatter}
        category="channel"
        x="spend"
        y="conversions"
        colors={['cyan', 'emerald', 'teal', 'amber']}
        showAnimation={false}
        showLegend
        xAxisLabel="Ad spend ($k)"
        yAxisLabel="Conversions"
      />
    </ChartPanel>
  )
}

/** Honest: no native combo — show not-available instead of fake dual-axis */
export function TremorCombo() {
  return (
    <NotAvailableCard
      title="Combo (bar + line dual axis)"
      reason="Tremor has no native ComposedChart / dual-axis combo. Use ECharts or Recharts for this pattern, or compose separate Tremor BarChart + LineChart panels."
    />
  )
}

export function TremorBarList() {
  return (
    <ChartPanel title="Traffic Sources (BarList)" library={meta.name} note="Tremor UI primitive" accent="tremor">
      <Card className="bg-transparent ring-0 shadow-none">
        <Title className="text-slate-300">Sessions by source</Title>
        <BarList
          data={barListItems}
          className="mt-4"
          color="cyan"
          valueFormatter={(n: number) => n.toLocaleString()}
          showAnimation={false}
        />
      </Card>
    </ChartPanel>
  )
}

export function TremorProgress() {
  return (
    <ChartPanel title="Goals (ProgressBar)" library={meta.name} note="Tremor UI primitive" accent="tremor">
      <div className="space-y-5 pt-2">
        {progressItems.map((p) => (
          <div key={p.label}>
            <Flex>
              <Text>{p.label}</Text>
              <Text>{p.value}%</Text>
            </Flex>
            <ProgressBar value={p.value} color={p.color} className="mt-2" showAnimation={false} />
          </div>
        ))}
      </div>
    </ChartPanel>
  )
}

export function TremorCategoryBarPanel() {
  return (
    <ChartPanel title="Channel Mix (CategoryBar)" library={meta.name} note="Tremor UI primitive" accent="tremor">
      <Card className="bg-transparent ring-0 shadow-none">
        <Text>Share of sessions</Text>
        <CategoryBar
          values={categoryBarValues}
          colors={['cyan', 'emerald', 'amber', 'violet']}
          className="mt-4"
          showLabels
          showAnimation={false}
        />
        <Flex className="mt-3">
          <Text className="text-xs">Organic 42%</Text>
          <Text className="text-xs">Paid 28%</Text>
          <Text className="text-xs">Social 18%</Text>
          <Text className="text-xs">Other 12%</Text>
        </Flex>
      </Card>
    </ChartPanel>
  )
}

export function TremorTrackerPanel() {
  return (
    <ChartPanel title="Service Health (Tracker)" library={meta.name} note="Tremor UI · uptime blocks" accent="tremor">
      <Card className="bg-transparent ring-0 shadow-none">
        <Flex>
          <Text>Last 30 checks</Text>
          <BadgeDelta deltaType="moderateIncrease">99.1% up</BadgeDelta>
        </Flex>
        <Tracker data={trackerItems} className="mt-4" />
        <Text className="mt-3 text-xs text-slate-500">Hover blocks for incident tooltips</Text>
      </Card>
    </ChartPanel>
  )
}

export function TremorFunnel() {
  return (
    <ChartPanel title="Sales Funnel (FunnelChart)" library={meta.name} note="Native Tremor FunnelChart" accent="tremor">
      <FunnelChart
        className="h-72"
        data={funnelPie}
        color="cyan"
        gradient
        evolutionGradient
      />
    </ChartPanel>
  )
}

export function TremorMissingHeatmap() {
  return (
    <NotAvailableCard
      title="Heatmap"
      reason="Tremor does not ship a heatmap. Use ECharts heatmap (category matrix) in the ECharts tab."
    />
  )
}

export function TremorMissingCandlestick() {
  return (
    <NotAvailableCard
      title="Candlestick / OHLC"
      reason="No native candlestick in Tremor. See ECharts Candlestick built from monthly OHLC mock data."
    />
  )
}

export function TremorMissingRadar() {
  return (
    <NotAvailableCard
      title="Radar"
      reason="Tremor has no RadarChart. Recharts and ECharts both expose radar in their individual tabs."
    />
  )
}

export function TremorMissingGauge() {
  return (
    <NotAvailableCard
      title="Gauge"
      reason="No gauge widget in @tremor/react. Approximate with ProgressCircle / ProgressBar, or use ECharts Gauge."
    />
  )
}

/** Aliases for CompareView */
export const TremorBar = TremorStackedBar

export function TremorSuite() {
  return (
    <div className="space-y-4 dark">
      <FingerprintBanner library="tremor" />
      <TremorKpis />
      <div className="grid gap-4 xl:grid-cols-2">
        <TremorLine />
        <TremorArea />
        <TremorStackedBar />
        <TremorGroupedBar />
        <TremorPie />
        <TremorScatter />
        <TremorFunnel />
        <TremorBarList />
        <TremorProgress />
        <TremorCategoryBarPanel />
        <TremorTrackerPanel />
        <TremorCombo />
        <TremorMissingRadar />
        <TremorMissingHeatmap />
        <TremorMissingCandlestick />
        <TremorMissingGauge />
      </div>
    </div>
  )
}
