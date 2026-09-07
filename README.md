# Chart Library Compare

Polished Vite + React + TypeScript demo that renders the **same** mock business metrics with three popular chart stacks:

| Library | Rendering | Strengths in this demo |
|---|---|---|
| **Apache ECharts** (`echarts` + `echarts-for-react`) | Canvas (default) | Dense options, combo axes, polished tooltips |
| **Recharts** | SVG | Declarative React chart primitives |
| **Tremor** (`@tremor/react`) | SVG (Recharts under the hood) + Tailwind | KPI cards, sparklines, dashboard UI |

## What is compared

For each library (and in **Compare all** side-by-side mode):

- KPI metric cards with sparklines (native on Tremor; approximated on ECharts / Recharts)
- Line — revenue & profit
- Area — visitors
- Stacked bar — category channel mix
- Donut — conversion funnel stages
- Scatter — ad spend vs conversions by channel
- Combo line+bar — traffic sessions + bounce rate (Tremor approximates with stacked panels)

Shared data: `src/data/mockData.ts`.

## Setup

```bash
cd dashboard-demo
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Stack notes

- **Tailwind CSS v3** is configured for Tremor (content paths + color safelist).
- Dark modern dashboard aesthetic; desktop-first.
- No backend required.
