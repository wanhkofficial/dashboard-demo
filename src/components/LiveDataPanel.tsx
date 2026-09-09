import { useLiveData, PALETTES, type PaletteId } from '../data/LiveDataContext'

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (n: number) => void
  display?: string
}) {
  return (
    <label className="block space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-slate-300 light:text-slate-700">{label}</span>
        <span className="tabular-nums text-cyan-300 light:text-cyan-700">{display ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400 light:bg-slate-200"
      />
    </label>
  )
}

function PanelBody() {
  const {
    controls,
    chart,
    setCategoryCount,
    setSeriesCount,
    setBase,
    setNoise,
    setPaletteId,
    setPoint,
    addMonth,
    removeMonth,
    randomize,
    reset,
  } = useLiveData()

  return (
    <div className="space-y-5 text-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400/90 light:text-cyan-700">
          Live data / value settings
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-500 light:text-slate-600">
          Canonical shape <code className="text-slate-400">categories + series[]</code> feeds every
          bound chart via thin adapters. Edits re-render immediately.
        </p>
      </div>

      <SliderRow
        label="Category count"
        value={controls.categoryCount}
        min={3}
        max={12}
        onChange={setCategoryCount}
      />
      <SliderRow
        label="Series count"
        value={controls.seriesCount}
        min={1}
        max={4}
        onChange={setSeriesCount}
      />

      <div className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 light:border-slate-200 light:bg-slate-50">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Per-series base value
        </p>
        {chart.series.map((s, i) => (
          <SliderRow
            key={s.name}
            label={s.name}
            value={controls.bases[i] ?? 0}
            min={1000}
            max={120000}
            step={500}
            onChange={(n) => setBase(i, n)}
            display={(controls.bases[i] ?? 0).toLocaleString()}
          />
        ))}
      </div>

      <SliderRow
        label="Noise / jitter"
        value={controls.noise}
        min={0}
        max={1}
        step={0.01}
        onChange={setNoise}
        display={controls.noise.toFixed(2)}
      />

      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-slate-300 light:text-slate-700">Color palette</span>
        <select
          value={controls.paletteId}
          onChange={(e) => setPaletteId(e.target.value as PaletteId)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 light:border-slate-300 light:bg-white light:text-slate-800"
        >
          {(Object.keys(PALETTES) as PaletteId[]).map((id) => (
            <option key={id} value={id}>
              {PALETTES[id].label}
            </option>
          ))}
        </select>
        <div className="mt-2 flex gap-1.5">
          {PALETTES[controls.paletteId].colors.map((c) => (
            <span
              key={c}
              className="h-4 flex-1 rounded"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={randomize}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1.5 text-xs font-semibold text-white shadow"
        >
          Randomize
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 light:border-slate-300 light:text-slate-700"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={addMonth}
          disabled={controls.categoryCount >= 12}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 disabled:opacity-40 light:border-slate-300 light:text-slate-700"
        >
          + Month
        </button>
        <button
          type="button"
          onClick={removeMonth}
          disabled={controls.categoryCount <= 3}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 disabled:opacity-40 light:border-slate-300 light:text-slate-700"
        >
          − Month
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Fine-tune points (series 1)
        </p>
        <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
          {chart.categories.map((cat, ci) => (
            <label key={cat} className="flex items-center gap-2 text-[11px]">
              <span className="w-8 shrink-0 text-slate-500">{cat}</span>
              <input
                type="number"
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 light:border-slate-300 light:bg-white light:text-slate-800"
                value={chart.series[0]?.values[ci] ?? 0}
                onChange={(e) => setPoint(0, ci, Number(e.target.value) || 0)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Sticky right drawer (desktop) / collapsible (mobile) */
export function LiveDataPanel() {
  const { panelOpen, setPanelOpen } = useLiveData()

  return (
    <>
      {/* Desktop sticky drawer */}
      <aside
        className={`fixed bottom-4 right-4 top-24 z-40 hidden w-[320px] flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/95 shadow-2xl backdrop-blur-md transition-transform light:border-slate-200 light:bg-white/95 lg:flex ${
          panelOpen ? 'translate-x-0' : 'translate-x-[110%]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 light:border-slate-200">
          <span className="text-sm font-semibold text-slate-100 light:text-slate-900">Live data</span>
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-100 light:hover:bg-slate-100"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <PanelBody />
        </div>
      </aside>

      {/* Mobile collapsible */}
      {panelOpen && (
        <div className="mb-6 rounded-2xl border border-slate-700/80 bg-slate-950/80 p-4 light:border-slate-200 light:bg-white lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-100 light:text-slate-900">Live data</span>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="text-xs text-slate-400"
            >
              Close
            </button>
          </div>
          <PanelBody />
        </div>
      )}
    </>
  )
}

export function LiveDataToggle() {
  const { panelOpen, togglePanel } = useLiveData()
  return (
    <button
      type="button"
      onClick={togglePanel}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition ${
        panelOpen
          ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-200 light:border-cyan-400 light:bg-cyan-50 light:text-cyan-800'
          : 'border-slate-700 bg-slate-950/80 text-slate-200 hover:border-slate-500 light:border-slate-300 light:bg-white light:text-slate-700'
      }`}
      aria-pressed={panelOpen}
      title="Live data / value settings"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-800 text-[10px] text-cyan-300 light:bg-slate-100 light:text-cyan-700">
        ◇
      </span>
      Live data
    </button>
  )
}
