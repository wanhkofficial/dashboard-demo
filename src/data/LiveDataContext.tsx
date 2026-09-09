import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { monthlySales, categorySales, funnelPie, channelScatter } from './mockData'

/** Canonical shared chart shape consumed via thin per-library adapters */
export type CanonicalSeries = {
  name: string
  color: string
  values: number[]
}

export type CanonicalChart = {
  categories: string[]
  series: CanonicalSeries[]
}

export type PaletteId = 'ocean' | 'sunset' | 'forest' | 'neon' | 'mono'

export type LiveControls = {
  categoryCount: number
  seriesCount: number
  /** Base value per series slot (length 4) */
  bases: [number, number, number, number]
  /** 0 = flat bases, 1 = strong jitter */
  noise: number
  paletteId: PaletteId
  /** Changes on Randomize to reshuffle noise pattern */
  seed: number
}

export type LiveDataBag = {
  monthlySales: typeof monthlySales
  categorySales: typeof categorySales
  funnelPie: typeof funnelPie
  channelScatter: typeof channelScatter
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'M13',
  'M14',
  'M15',
  'M16',
  'M17',
  'M18',
]

const SERIES_NAMES = ['Revenue', 'Profit', 'Expenses', 'Visitors'] as const

export const PALETTES: Record<PaletteId, { label: string; colors: string[] }> = {
  ocean: {
    label: 'Ocean',
    colors: ['#38bdf8', '#22d3ee', '#34d399', '#818cf8'],
  },
  sunset: {
    label: 'Sunset',
    colors: ['#f97316', '#a78bfa', '#fb923c', '#e879f9'],
  },
  forest: {
    label: 'Forest',
    colors: ['#10b981', '#14b8a6', '#84cc16', '#06b6d4'],
  },
  neon: {
    label: 'Neon',
    colors: ['#22d3ee', '#f472b6', '#a3e635', '#facc15'],
  },
  mono: {
    label: 'Mono blue',
    colors: ['#60a5fa', '#3b82f6', '#2563eb', '#93c5fd'],
  },
}

export const DEFAULT_CONTROLS: LiveControls = {
  categoryCount: 12,
  seriesCount: 2,
  bases: [55000, 18000, 38000, 25000],
  noise: 0.35,
  paletteId: 'ocean',
  seed: 1,
}

/** Mulberry32 — deterministic PRNG from seed + index */
function mulberry32(a: number) {
  return function next() {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildCanonical(controls: LiveControls): CanonicalChart {
  const { categoryCount, seriesCount, bases, noise, paletteId, seed } = controls
  const colors = PALETTES[paletteId].colors
  const categories = MONTH_LABELS.slice(0, categoryCount)
  const rand = mulberry32(seed * 9973 + categoryCount * 13 + seriesCount * 17)

  const series: CanonicalSeries[] = []
  for (let s = 0; s < seriesCount; s++) {
    const base = bases[s] ?? bases[0]
    const values = categories.map((_, i) => {
      const trend = 1 + (i / Math.max(categories.length - 1, 1)) * 0.45
      const wave = 1 + Math.sin((i + s) * 0.55) * 0.08
      const jitter = 1 + (rand() * 2 - 1) * noise * 0.55
      return Math.max(0, Math.round(base * trend * wave * jitter))
    })
    series.push({
      name: SERIES_NAMES[s] ?? `Series ${s + 1}`,
      color: colors[s % colors.length],
      values,
    })
  }
  return { categories, series }
}

function formatK(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n}`
}

function toLiveBag(chart: CanonicalChart, seed: number): LiveDataBag {
  const { categories, series } = chart
  const byName = (name: string, fallbackIdx: number) =>
    series.find((s) => s.name === name)?.values ?? series[fallbackIdx]?.values

  const revenue = byName('Revenue', 0) ?? categories.map(() => 0)
  const profit = byName('Profit', 1) ?? revenue.map((v) => Math.round(v * 0.32))
  const expenses =
    byName('Expenses', 2) ?? revenue.map((v, i) => Math.max(0, v - (profit[i] ?? 0)))
  const visitors =
    byName('Visitors', 3) ?? revenue.map((v) => Math.round(v * 0.45))

  const monthly = categories.map((month, i) => ({
    month,
    revenue: revenue[i] ?? 0,
    profit: profit[i] ?? 0,
    expenses: expenses[i] ?? 0,
    visitors: visitors[i] ?? 0,
  }))

  // Category bar rows — fold months into 5 retail categories when possible
  const catNames =
    categorySales.length > 0
      ? categorySales.map((c) => c.category)
      : ['Electronics', 'Apparel', 'Home', 'Sports', 'Beauty']
  const catCount = Math.min(5, Math.max(3, Math.ceil(categories.length / 2)))
  const usedCats = catNames.slice(0, catCount)
  const chunk = Math.max(1, Math.floor(categories.length / usedCats.length))
  const category = usedCats.map((category, ci) => {
    const start = ci * chunk
    const end = ci === usedCats.length - 1 ? categories.length : start + chunk
    const slice = monthly.slice(start, end)
    const online = slice.reduce((a, d) => a + d.revenue, 0)
    const retail = slice.reduce((a, d) => a + d.profit * 2, 0)
    const partners = slice.reduce((a, d) => a + Math.round(d.expenses * 0.35), 0)
    return {
      category,
      online: Math.round(online / Math.max(slice.length, 1)),
      retail: Math.round(retail / Math.max(slice.length, 1)),
      partners: Math.round(partners / Math.max(slice.length, 1)),
    }
  })

  // Pie from category totals (or series means)
  const pieSource = category.map((c) => ({
    name: c.category,
    value: c.online + c.retail + c.partners,
  }))
  const pie =
    pieSource.length >= 3
      ? pieSource
      : series[0]
        ? categories.map((name, i) => ({ name, value: series[0].values[i] ?? 0 }))
        : funnelPie.map((d) => ({ ...d }))

  // Scatter derived from spend≈revenue/1000 vs conversions≈profit/20 with channel labels
  const channels = ['Search', 'Social', 'Email', 'Display']
  const rand = mulberry32(seed * 4243 + 11)
  const scatter = categories.slice(0, Math.min(12, categories.length)).map((month, i) => {
    const r = revenue[i] ?? 10000
    const p = profit[i] ?? 3000
    return {
      spend: Math.round((r / 2500 + rand() * 4) * 10) / 10,
      conversions: Math.round(p / 18 + rand() * 80),
      channel: channels[i % channels.length],
      month,
    }
  })

  return {
    monthlySales: monthly,
    categorySales: category,
    funnelPie: pie,
    channelScatter: scatter,
  }
}

function deriveKpis(monthly: LiveDataBag['monthlySales']) {
  if (!monthly.length) return []
  const last = monthly[monthly.length - 1]
  const prev = monthly[monthly.length - 2] ?? last
  const pct = (a: number, b: number) => {
    if (!b) return '+0.0%'
    const d = ((a - b) / b) * 100
    return `${d >= 0 ? '+' : ''}${d.toFixed(1)}%`
  }
  return [
    {
      label: 'Revenue',
      value: formatK(last.revenue),
      delta: pct(last.revenue, prev.revenue),
      positive: last.revenue >= prev.revenue,
      spark: monthly.map((d) => d.revenue),
    },
    {
      label: 'Profit',
      value: formatK(last.profit),
      delta: pct(last.profit, prev.profit),
      positive: last.profit >= prev.profit,
      spark: monthly.map((d) => d.profit),
    },
    {
      label: 'Visitors',
      value: last.visitors >= 1000 ? `${(last.visitors / 1000).toFixed(1)}k` : String(last.visitors),
      delta: pct(last.visitors, prev.visitors),
      positive: last.visitors >= prev.visitors,
      spark: monthly.map((d) => d.visitors),
    },
    {
      label: 'Expenses',
      value: formatK(last.expenses),
      delta: pct(last.expenses, prev.expenses),
      positive: last.expenses <= prev.expenses,
      spark: monthly.map((d) => d.expenses),
    },
  ]
}

type Ctx = {
  controls: LiveControls
  chart: CanonicalChart
  data: LiveDataBag
  kpiMetrics: ReturnType<typeof deriveKpis>
  setCategoryCount: (n: number) => void
  setSeriesCount: (n: number) => void
  setBase: (index: number, value: number) => void
  setNoise: (n: number) => void
  setPaletteId: (id: PaletteId) => void
  /** Fine-grained point edit on canonical series */
  setPoint: (seriesIndex: number, categoryIndex: number, value: number) => void
  updateSeries: (seriesIndex: number, values: number[]) => void
  addMonth: () => void
  removeMonth: () => void
  randomize: () => void
  reset: () => void
  panelOpen: boolean
  setPanelOpen: (open: boolean) => void
  togglePanel: () => void
}

const LiveDataContext = createContext<Ctx | null>(null)

const MAX_CATEGORIES = 12
const MIN_CATEGORIES = 3
const MAX_SERIES = 4
const MIN_SERIES = 1

export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [controls, setControls] = useState<LiveControls>(DEFAULT_CONTROLS)
  /** Optional overrides after generation — cleared on control/reset/randomize */
  const [overrides, setOverrides] = useState<Record<string, number>>({})
  const [panelOpen, setPanelOpen] = useState(false)

  const baseChart = useMemo(() => buildCanonical(controls), [controls])

  const chart = useMemo(() => {
    if (!Object.keys(overrides).length) return baseChart
    return {
      ...baseChart,
      series: baseChart.series.map((s, si) => ({
        ...s,
        values: s.values.map((v, ci) => {
          const key = `${si}:${ci}`
          return key in overrides ? overrides[key]! : v
        }),
      })),
    }
  }, [baseChart, overrides])

  const data = useMemo(() => toLiveBag(chart, controls.seed), [chart, controls.seed])
  const kpiMetrics = useMemo(() => deriveKpis(data.monthlySales), [data.monthlySales])

  const clearOverrides = useCallback(() => setOverrides({}), [])

  const setCategoryCount = useCallback((n: number) => {
    clearOverrides()
    setControls((c) => ({
      ...c,
      categoryCount: Math.min(MAX_CATEGORIES, Math.max(MIN_CATEGORIES, Math.round(n))),
    }))
  }, [clearOverrides])

  const setSeriesCount = useCallback((n: number) => {
    clearOverrides()
    setControls((c) => ({
      ...c,
      seriesCount: Math.min(MAX_SERIES, Math.max(MIN_SERIES, Math.round(n))),
    }))
  }, [clearOverrides])

  const setBase = useCallback((index: number, value: number) => {
    clearOverrides()
    setControls((c) => {
      const bases = [...c.bases] as LiveControls['bases']
      bases[index] = Math.max(0, Math.round(value))
      return { ...c, bases }
    })
  }, [clearOverrides])

  const setNoise = useCallback((n: number) => {
    clearOverrides()
    setControls((c) => ({ ...c, noise: Math.min(1, Math.max(0, n)) }))
  }, [clearOverrides])

  const setPaletteId = useCallback((id: PaletteId) => {
    clearOverrides()
    setControls((c) => ({ ...c, paletteId: id }))
  }, [clearOverrides])

  const setPoint = useCallback((seriesIndex: number, categoryIndex: number, value: number) => {
    setOverrides((o) => ({ ...o, [`${seriesIndex}:${categoryIndex}`]: Math.max(0, Math.round(value)) }))
  }, [])

  const updateSeries = useCallback((seriesIndex: number, values: number[]) => {
    setOverrides((o) => {
      const next = { ...o }
      values.forEach((v, ci) => {
        next[`${seriesIndex}:${ci}`] = Math.max(0, Math.round(v))
      })
      return next
    })
  }, [])

  const addMonth = useCallback(() => {
    setCategoryCount(controls.categoryCount + 1)
  }, [controls.categoryCount, setCategoryCount])

  const removeMonth = useCallback(() => {
    setCategoryCount(controls.categoryCount - 1)
  }, [controls.categoryCount, setCategoryCount])

  const randomize = useCallback(() => {
    clearOverrides()
    setControls((c) => ({
      ...c,
      seed: (c.seed + 1 + Math.floor(Math.random() * 1000)) % 100000,
      noise: Math.round((0.2 + Math.random() * 0.7) * 100) / 100,
      bases: c.bases.map((b) =>
        Math.max(1000, Math.round(b * (0.7 + Math.random() * 0.8))),
      ) as LiveControls['bases'],
    }))
  }, [clearOverrides])

  const reset = useCallback(() => {
    clearOverrides()
    setControls({ ...DEFAULT_CONTROLS })
  }, [clearOverrides])

  const togglePanel = useCallback(() => setPanelOpen((p) => !p), [])

  const value = useMemo(
    () => ({
      controls,
      chart,
      data,
      kpiMetrics,
      setCategoryCount,
      setSeriesCount,
      setBase,
      setNoise,
      setPaletteId,
      setPoint,
      updateSeries,
      addMonth,
      removeMonth,
      randomize,
      reset,
      panelOpen,
      setPanelOpen,
      togglePanel,
    }),
    [
      controls,
      chart,
      data,
      kpiMetrics,
      setCategoryCount,
      setSeriesCount,
      setBase,
      setNoise,
      setPaletteId,
      setPoint,
      updateSeries,
      addMonth,
      removeMonth,
      randomize,
      reset,
      panelOpen,
      togglePanel,
    ],
  )

  return <LiveDataContext.Provider value={value}>{children}</LiveDataContext.Provider>
}

export function useLiveData() {
  const ctx = useContext(LiveDataContext)
  if (!ctx) throw new Error('useLiveData must be used within LiveDataProvider')
  return ctx
}

/** Defaults for reset / docs */
export const DEFAULT_CHART = buildCanonical(DEFAULT_CONTROLS)
export const DEFAULT_LIVE_BAG = toLiveBag(DEFAULT_CHART, DEFAULT_CONTROLS.seed)
