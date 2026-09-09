import { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { useTheme } from '../../theme/ThemeContext'
import { useLiveData } from '../../data/LiveDataContext'
import {
  toNivoLine,
  toNivoBar,
  nivoBarKeys,
  nivoBarColors,
  toPieSlices,
  toNivoScatter,
} from '../../data/liveAdapters'
import { ChartPanel } from '../../components/ChartPanel'
import { FingerprintBanner } from '../../components/FingerprintBanner'
import { LIBRARY_META } from '../../components/LibraryNotes'

const meta = LIBRARY_META.nivo

function useNivoTheme() {
  const { isDark } = useTheme()
  return useMemo(
    () => ({
      isDark,
      theme: {
        background: 'transparent',
        textColor: isDark ? '#fde68a' : '#92400e',
        fontSize: 11,
        axis: {
          domain: { line: { stroke: isDark ? '#78350f' : '#fcd34d', strokeWidth: 1 } },
          ticks: {
            line: { stroke: isDark ? '#78350f' : '#fcd34d', strokeWidth: 1 },
            text: { fill: isDark ? '#fcd34d' : '#78350f' },
          },
          legend: { text: { fill: isDark ? '#fde68a' : '#92400e' } },
        },
        grid: { line: { stroke: isDark ? '#3f2e0a' : '#fef3c7', strokeWidth: 1 } },
        legends: { text: { fill: isDark ? '#fde68a' : '#92400e' } },
        tooltip: {
          container: {
            background: isDark ? '#1c1408' : '#fffbeb',
            color: isDark ? '#fef3c7' : '#78350f',
            fontSize: 12,
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          },
        },
      },
      colors: isDark
        ? ['#fbbf24', '#f59e0b', '#fcd34d', '#d97706']
        : ['#d97706', '#b45309', '#f59e0b', '#92400e'],
    }),
    [isDark],
  )
}

export function NivoLine() {
  const { chart } = useLiveData()
  const { theme } = useNivoTheme()
  const data = toNivoLine(chart)
  const colors = chart.series.map((s) => s.color)
  return (
    <ChartPanel title="ResponsiveLine" library={meta.name} note="SVG · Nivo" accent="nivo">
      <div className="h-[280px]">
        <ResponsiveLine
          data={data}
          theme={theme}
          colors={colors}
          margin={{ top: 20, right: 24, bottom: 48, left: 52 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
          axisBottom={{ tickRotation: -30 }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enableArea={false}
          useMesh
          legends={[
            {
              anchor: 'top-left',
              direction: 'row',
              translateY: -12,
              itemWidth: 80,
              itemHeight: 16,
              symbolSize: 10,
            },
          ]}
        />
      </div>
    </ChartPanel>
  )
}

export function NivoArea() {
  const { chart } = useLiveData()
  const { theme } = useNivoTheme()
  const data = toNivoLine(chart).slice(0, 1)
  const colors = chart.series.slice(0, 1).map((s) => s.color)
  return (
    <ChartPanel title="ResponsiveLine (area)" library={meta.name} note="enableArea" accent="nivo">
      <div className="h-[280px]">
        <ResponsiveLine
          data={data}
          theme={theme}
          colors={colors}
          margin={{ top: 16, right: 24, bottom: 48, left: 52 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 0, max: 'auto' }}
          axisBottom={{ tickRotation: -30 }}
          enableArea
          areaOpacity={0.35}
          pointSize={6}
          useMesh
        />
      </div>
    </ChartPanel>
  )
}

export function NivoBar() {
  const { chart } = useLiveData()
  const { theme } = useNivoTheme()
  const data = toNivoBar(chart)
  const keys = nivoBarKeys(chart)
  const colors = nivoBarColors(chart)
  return (
    <ChartPanel title="ResponsiveBar (stacked)" library={meta.name} note="SVG bars" accent="nivo">
      <div className="h-[280px]">
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy="category"
          theme={theme}
          colors={colors}
          margin={{ top: 24, right: 24, bottom: 48, left: 52 }}
          padding={0.3}
          groupMode="stacked"
          axisBottom={{ tickRotation: -30 }}
          labelSkipHeight={12}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top-left',
              direction: 'row',
              translateY: -18,
              itemWidth: 80,
              itemHeight: 14,
              symbolSize: 10,
            },
          ]}
        />
      </div>
    </ChartPanel>
  )
}

export function NivoPie() {
  const { chart } = useLiveData()
  const { theme, isDark } = useNivoTheme()
  const data = toPieSlices(chart, 'sum').map((s, i) => ({
    id: s.id,
    label: s.label,
    value: s.value,
    color: chart.series[i % Math.max(chart.series.length, 1)]?.color,
  }))
  return (
    <ChartPanel title="ResponsivePie" library={meta.name} note="Donut radius" accent="nivo">
      <div className="h-[280px]">
        <ResponsivePie
          data={data}
          theme={theme}
          colors={{ datum: 'data.color' }}
          margin={{ top: 24, right: 24, bottom: 40, left: 24 }}
          innerRadius={0.55}
          padAngle={1.2}
          cornerRadius={4}
          activeOuterRadiusOffset={6}
          borderWidth={2}
          borderColor={isDark ? '#1c1408' : '#fff'}
          arcLabelsSkipAngle={16}
          arcLinkLabelsSkipAngle={12}
          arcLinkLabelsTextColor={isDark ? '#fde68a' : '#92400e'}
          arcLinkLabelsColor={{ from: 'color' }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateY: 32,
              itemWidth: 72,
              itemHeight: 14,
              symbolSize: 10,
            },
          ]}
        />
      </div>
    </ChartPanel>
  )
}

export function NivoScatter() {
  const { chart } = useLiveData()
  const { theme } = useNivoTheme()
  const data = toNivoScatter(chart)
  const color = chart.series[0]?.color ?? '#fbbf24'
  return (
    <ChartPanel title="ResponsiveScatterPlot" library={meta.name} note="series pair" accent="nivo">
      <div className="h-[280px]">
        <ResponsiveScatterPlot
          data={data}
          theme={theme}
          colors={[color]}
          margin={{ top: 24, right: 24, bottom: 48, left: 56 }}
          xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          axisBottom={{ legend: chart.series[0]?.name ?? 'x', legendOffset: 36, legendPosition: 'middle' }}
          axisLeft={{
            legend: chart.series[1]?.name ?? chart.series[0]?.name ?? 'y',
            legendOffset: -48,
            legendPosition: 'middle',
          }}
          nodeSize={10}
        />
      </div>
    </ChartPanel>
  )
}

export function NivoSuite() {
  return (
    <div className="space-y-4">
      <FingerprintBanner library="nivo" />
      <div className="grid gap-4 xl:grid-cols-2">
        <NivoLine />
        <NivoArea />
        <NivoBar />
        <NivoPie />
        <NivoScatter />
      </div>
    </div>
  )
}
