import { FingerprintBanner } from '../../components/FingerprintBanner'
import {
  NivoArea,
  NivoBar,
  NivoLine,
  NivoPie,
  NivoScatter,
} from '../../charts/nivo/NivoCharts'
import { LIBRARY_ONLY } from '../../components/LibraryNotes'

export function NivoOfficialGallery() {
  return (
    <div className="space-y-8">
      <FingerprintBanner library="nivo" />
      <div className="rounded-2xl border border-amber-500/25 bg-slate-950/60 px-4 py-4 text-sm text-slate-400 light:border-amber-200 light:bg-white/80 light:text-slate-600">
        <p className="font-medium text-amber-100 light:text-amber-900">
          Nivo gallery — SVG Responsive* charts
        </p>
        <p className="mt-1 text-xs leading-relaxed">
          ResponsiveLine, ResponsiveBar, ResponsivePie, ResponsiveScatterPlot with a dark/light
          Nivo theme. Data comes from the shared Live data canonical shape (categories + series).
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wide text-amber-300/90 light:text-amber-800">
          {LIBRARY_ONLY.nivo.map((t) => (
            <li key={t} className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 light:border-amber-300 light:bg-amber-50">
              {t}
            </li>
          ))}
        </ul>
      </div>
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
