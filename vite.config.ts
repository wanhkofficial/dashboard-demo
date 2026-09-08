import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/echarts') || id.includes('echarts-for-react') || id.includes('echarts-stat')) {
            return 'echarts-vendor'
          }
          if (id.includes('node_modules/recharts')) {
            return 'recharts-vendor'
          }
          if (id.includes('node_modules/@tremor')) {
            return 'tremor-vendor'
          }
        },
      },
    },
  },
})
