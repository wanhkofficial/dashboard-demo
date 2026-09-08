# Chart Libraries - Full Official Galleries

Vite + React + TypeScript demo with complete galleries for Apache ECharts, Recharts, and Tremor.

## Tabs

- ECharts Gallery: mirrors official top-level example JS (~297). Lazy-fetched and evaluated on click.
- Recharts Gallery: every chart component in this package version + Brush / Reference / ErrorBar demos.
- Tremor Gallery: complete Tremor 3.18 chart / vis / spark surface (not ECharts-scale).
- Compare: slim side-by-side on overlapping types.

## ECharts examples

- Files: public/echarts-official/*.js + manifest.json
- Refresh: scripts/fetch-echarts-examples.mjs (package script fetch:echarts)
- Data assets: public/echarts-remote/ used as ROOT_PATH
- Known skips: bmap and map/geoJSON-heavy examples show skip cards
- Skipped dirs: archive/, doc-example/, gl/

## Stack

- echarts 5 + echarts-stat
- recharts 2.x
- @tremor/react 3.18.x + Tailwind CSS v3
- vite allowedHosts true for server and preview
