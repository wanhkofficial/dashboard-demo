#!/usr/bin/env node
/**
 * Download all top-level Apache ECharts official example JS files
 * from https://echarts.apache.org/examples/examples/js/
 * into public/echarts-official/ and write a manifest JSON.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'echarts-official')
const MANIFEST = path.join(OUT_DIR, 'manifest.json')
const BASE = 'https://echarts.apache.org/examples/examples/js/'

function titleFromFile(file) {
  return file
    .replace(/\.js$/i, '')
    .split(/[-_]/)
    .map((p) => (p.length <= 3 ? p.toUpperCase() : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(' ')
}

function categoryFromFile(file) {
  const base = file.replace(/\.js$/i, '')
  const known = [
    'pictorialBar',
    'effectScatter',
    'themeRiver',
    'candlestick',
    'confidence',
    'data-transform',
    'dataset',
    'dynamic',
    'graphic',
    'heatmap',
    'intraday',
    'lines',
    'matrix',
    'multiple',
    'parallel',
    'sankey',
    'scatter',
    'sunburst',
    'treemap',
    'boxplot',
    'calendar',
    'custom',
    'funnel',
    'gauge',
    'graph',
    'radar',
    'chord',
    'flame',
    'geo',
    'map',
    'mix',
    'pie',
    'bar',
    'line',
    'area',
    'tree',
    'polar',
    'bubble',
    'bump',
    'cycle',
    'wind',
    'watermark',
  ]
  for (const k of known) {
    if (base === k || base.startsWith(k + '-') || base.startsWith(k)) {
      if (k === 'data-transform') return 'data-transform'
      if (k === 'effectScatter') return 'scatter'
      if (k === 'pictorialBar') return 'pictorialBar'
      if (k === 'themeRiver') return 'themeRiver'
      if (k === 'intraday') return 'line'
      if (k === 'confidence') return 'line'
      if (k === 'dynamic') return 'dynamic'
      if (k === 'multiple') return 'axis'
      if (k === 'mix') return 'mix'
      return k
    }
  }
  const m = base.match(/^([a-zA-Z]+)/)
  return m ? m[1] : 'other'
}

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

async function listJsFiles() {
  const html = await fetchText(BASE)
  const files = new Set()
  const re = /href="([^"]+\.js)"/gi
  let m
  while ((m = re.exec(html))) {
    const href = m[1]
    if (href.includes('/')) continue
    files.add(href)
  }
  const re2 = />\s*([a-zA-Z0-9._-]+\.js)\s*</g
  while ((m = re2.exec(html))) {
    files.add(m[1])
  }
  return [...files].sort()
}

function detectNeeds(code, file) {
  const needs = []
  if (/ROOT_PATH|\$\.get|fetch\(|XMLHttpRequest|echarts\.util\.ajax|getJSON/i.test(code)) {
    needs.push('remote-data')
  }
  if (/\bbmap\b|BMap|baidu/i.test(code) || /bmap/i.test(file)) needs.push('bmap')
  if (
    /\bregisterMap\b|geoJson|geoJSON|type:\s*['"]map['"]/i.test(code) ||
    /^map-|^geo-|heatmap-map|scatter-map|effectScatter-map/.test(file)
  ) {
    needs.push('map')
  }
  if (/echarts-gl|echarts\.gl/i.test(code)) needs.push('echarts-gl')
  if (/d3\.|require\(['"]d3/i.test(code)) needs.push('d3')
  if (/ecStat|echarts-stat/i.test(code)) needs.push('ecStat')
  return needs
}

async function downloadAll(files, concurrency = 12) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const results = []
  let i = 0
  async function worker() {
    while (i < files.length) {
      const idx = i++
      const file = files[idx]
      const url = BASE + file
      const dest = path.join(OUT_DIR, file)
      try {
        const code = await fetchText(url)
        fs.writeFileSync(dest, code)
        const needs = detectNeeds(code, file)
        let skipReason = null
        if (needs.includes('bmap')) skipReason = 'Requires Baidu Map (bmap)'
        else if (needs.includes('map')) skipReason = 'Requires map / geoJSON assets'
        else if (needs.includes('echarts-gl')) skipReason = 'Requires echarts-gl'
        else if (needs.includes('d3')) skipReason = 'Requires d3'
        else if (needs.includes('ecStat')) skipReason = 'Requires echarts-stat'
        else if (needs.includes('remote-data')) skipReason = 'needs-remote-data'
        results.push({
          id: file.replace(/\.js$/i, ''),
          file,
          category: categoryFromFile(file),
          title: titleFromFile(file),
          bytes: Buffer.byteLength(code),
          needs,
          skipReason,
        })
        process.stdout.write(`\r[${results.length}/${files.length}] ${file}          `)
      } catch (err) {
        console.error(`\nFailed ${file}:`, err.message)
        results.push({
          id: file.replace(/\.js$/i, ''),
          file,
          category: categoryFromFile(file),
          title: titleFromFile(file),
          bytes: 0,
          needs: ['download-failed'],
          skipReason: 'Download failed: ' + err.message,
        })
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()))
  return results.sort((a, b) => a.file.localeCompare(b.file))
}

async function main() {
  console.log('Listing official ECharts examples…')
  const files = await listJsFiles()
  console.log(`Found ${files.length} top-level .js files`)
  const manifest = await downloadAll(files)
  const payload = {
    source: BASE,
    fetchedAt: new Date().toISOString(),
    count: manifest.length,
    examples: manifest,
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(payload, null, 2))
  console.log(`\nWrote ${manifest.length} files + manifest to ${OUT_DIR}`)
  const byCat = {}
  for (const e of manifest) byCat[e.category] = (byCat[e.category] || 0) + 1
  console.log(
    'Categories:',
    Object.keys(byCat)
      .sort()
      .map((k) => `${k}:${byCat[k]}`)
      .join(', '),
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
