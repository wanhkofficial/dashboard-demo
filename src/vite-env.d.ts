/// <reference types="vite/client" />

declare module "echarts-stat" {
  const ecStat: {
    transform?: {
      regression?: unknown
      histogram?: unknown
      clustering?: unknown
    }
    regression?: (...args: unknown[]) => unknown
    histogram?: (...args: unknown[]) => unknown
    clustering?: (...args: unknown[]) => unknown
  }
  export default ecStat
}
