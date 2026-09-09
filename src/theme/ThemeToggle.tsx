import { useTheme } from './ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-slate-200 shadow-sm transition hover:border-slate-500 hover:bg-slate-900 light:border-slate-300 light:bg-white light:text-slate-700 light:hover:bg-slate-50"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${
          isDark ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-700'
        }`}
      >
        {isDark ? '☾' : '☀'}
      </span>
      <span>{isDark ? 'Dark' : 'Light'}</span>
      <span className="text-slate-500 light:text-slate-400">⇄</span>
      <span className="font-normal text-slate-400 light:text-slate-500">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
