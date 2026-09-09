import type { CanonicalChart } from './LiveDataContext'

/** Rows keyed by category + each series name — Recharts / Tremor / ECharts category charts */
export function toCategoryRows(chart: CanonicalChart): Record<string, string | number>[] {
  return chart.categories.map((category, i) => {
    const row: Record<string, string | number> = { category, month: category }
    for (const s of chart.series) {
      row[s.name] = s.values[i] ?? 0
      row[s.name.toLowerCase()] = s.values[i] ?? 0
    }
    return row
  })
}

/** Chart.js dataset bundle */
export function toChartJsBundle(chart: CanonicalChart) {
  return {
    labels: chart.categories,
    datasets: chart.series.map((s) => ({
      label: s.name,
      data: s.values,
      borderColor: s.color,
      backgroundColor: s.color + '99',
      tension: 0.35,
      fill: false,
    })),
  }
}

/** Nivo line data */
export function toNivoLine(chart: CanonicalChart) {
  return chart.series.map((s) => ({
    id: s.name,
    color: s.color,
    data: chart.categories.map((x, i) => ({ x, y: s.values[i] ?? 0 })),
  }))
}

/** Nivo bar — index by category */
export function toNivoBar(chart: CanonicalChart) {
  return chart.categories.map((category, i) => {
    const row: Record<string, string | number> = { category }
    for (const s of chart.series) row[s.name] = s.values[i] ?? 0
    return row
  })
}

export function nivoBarKeys(chart: CanonicalChart) {
  return chart.series.map((s) => s.name)
}

export function nivoBarColors(chart: CanonicalChart) {
  return chart.series.map((s) => s.color)
}

/** Pie slices — sum of all series per category, or first series */
export function toPieSlices(chart: CanonicalChart, mode: 'sum' | 'first' = 'sum') {
  return chart.categories.map((name, i) => ({
    id: name,
    label: name,
    name,
    value:
      mode === 'first'
        ? (chart.series[0]?.values[i] ?? 0)
        : chart.series.reduce((a, s) => a + (s.values[i] ?? 0), 0),
    color: chart.series[0]?.color,
  }))
}

/** Scatter from series[0] (x) vs series[1] (y); falls back to index vs series[0] */
export function toScatterPoints(chart: CanonicalChart) {
  const x = chart.series[0]
  const y = chart.series[1] ?? chart.series[0]
  if (!x) return [] as { x: number; y: number; category: string; id: string }[]
  return chart.categories.map((category, i) => ({
    id: category,
    category,
    x: x.values[i] ?? 0,
    y: (y?.values[i] ?? 0) / (y === x ? 50 : 1),
  }))
}

export function toNivoScatter(chart: CanonicalChart) {
  const points = toScatterPoints(chart)
  return [
    {
      id: chart.series.map((s) => s.name).join(' vs ') || 'series',
      data: points.map((p) => ({ x: p.x, y: p.y })),
    },
  ]
}
