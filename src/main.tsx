import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './theme/ThemeContext'
import './index.css'

// Apply before paint to avoid flash
try {
  const saved = localStorage.getItem('dashboard-demo-theme')
  const theme = saved === 'light' || saved === 'dark' ? saved : 'dark'
  document.documentElement.dataset.theme = theme
  document.documentElement.classList.add(theme)
  document.documentElement.style.colorScheme = theme
} catch {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
