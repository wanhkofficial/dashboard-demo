import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'

/** Local mirror of official ROOT_PATH assets (see public/echarts-remote). */
export const ROOT_PATH = '/echarts-remote'

type RunResult = {
  option: echarts.EChartsOption | null
  error: string | null
  async: boolean
}

function looksLikeJson(url: string) {
  return /\.json($|\?)/i.test(url) || /geojson/i.test(url)
}

function resolveUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url
  return `${ROOT_PATH}/${url.replace(/^\.\//, '')}`
}

/**
 * Execute an official ECharts example script against a live chart instance.
 * Provides ROOT_PATH, $, app, myChart, echarts, and (when present) ecStat.
 */
export async function runOfficialExample(
  code: string,
  chart: EChartsType,
  opts?: { ecStat?: unknown },
): Promise<RunResult> {
  let option: echarts.EChartsOption | null = null
  let asyncPending = 0
  let lastError: string | null = null

  const markAsync = () => {
    asyncPending += 1
  }
  const settleAsync = () => {
    asyncPending = Math.max(0, asyncPending - 1)
  }

  const $ = {
    getJSON(url: string, success?: (data: unknown) => void): Promise<unknown> {
      return this.get(url, success, "json")
    },
    get(
      url: string,
      success?: (data: unknown) => void,
      _dataType?: string,
    ): Promise<unknown> {
      markAsync()
      const resolved = resolveUrl(url)
      const p = fetch(resolved)
        .then(async (res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${resolved}`)
          const ct = res.headers.get('content-type') || ''
          if (looksLikeJson(resolved) || ct.includes('json') || ct.includes('text')) {
            const text = await res.text()
            try {
              return JSON.parse(text)
            } catch {
              return text
            }
          }
          if (ct.includes('svg') || resolved.endsWith('.svg')) return res.text()
          if (ct.includes('image') || /\.(png|jpe?g|gif|webp)$/i.test(resolved)) {
            const blob = await res.blob()
            return URL.createObjectURL(blob)
          }
          // binary
          return res.arrayBuffer()
        })
        .then((data) => {
          try {
            success?.(data)
          } catch (err) {
            lastError = err instanceof Error ? err.message : String(err)
          }
          return data
        })
        .catch((err) => {
          lastError = err instanceof Error ? err.message : String(err)
          throw err
        })
        .finally(() => settleAsync())
      return p
    },
  }

  const app: Record<string, unknown> = {}

  // Bind myChart.setOption so async examples work
  const originalSetOption = chart.setOption.bind(chart)
  chart.setOption = ((opt: echarts.EChartsOption, ...rest: unknown[]) => {
    option = opt
    return originalSetOption(opt, ...(rest as []))
  }) as typeof chart.setOption

  try {
    // Official examples typically assign `option = {...}` or call myChart.setOption.
    // Some declare `var option;` then assign later.
    const wrapped =
      `"use strict";\n` +
      `var option = null;\n` +
      code +
      `\n; return typeof option !== "undefined" ? option : null;\n`

    const CDN_PATH = ROOT_PATH
    const fn = new Function(
      'echarts',
      'myChart',
      'app',
      'ROOT_PATH',
      'CDN_PATH',
      '$',
      'ecStat',
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval',
      'console',
      'window',
      wrapped,
    )

    const returned = fn(
      echarts,
      chart,
      app,
      ROOT_PATH,
      CDN_PATH,
      $,
      opts?.ecStat ?? undefined,
      window.setTimeout.bind(window),
      window.clearTimeout.bind(window),
      window.setInterval.bind(window),
      window.clearInterval.bind(window),
      console,
      window,
    ) as echarts.EChartsOption | null

    if (returned && typeof returned === 'object') {
      option = returned
      try {
        chart.setOption(returned, true)
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err)
      }
    }

    // Wait briefly for $.get callbacks that set option
    if (asyncPending > 0 || (!option && /\$\.get|fetch\(/i.test(code))) {
      await new Promise<void>((resolve) => {
        const start = Date.now()
        const tick = () => {
          if ((asyncPending === 0 && option) || Date.now() - start > 8000) {
            resolve()
            return
          }
          window.setTimeout(tick, 50)
        }
        tick()
      })
    }

    if (!option && lastError) {
      return { option: null, error: lastError, async: true }
    }
    if (!option) {
      return {
        option: null,
        error: 'Example did not produce an option (may need maps, bmap, d3, or extra plugins).',
        async: asyncPending > 0,
      }
    }
    return { option, error: lastError, async: asyncPending > 0 || /\$\.get/i.test(code) }
  } catch (err) {
    return {
      option,
      error: err instanceof Error ? err.message : String(err),
      async: false,
    }
  }
}
