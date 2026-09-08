export type EChartsExampleMeta = {
  id: string
  file: string
  category: string
  title: string
  bytes: number
  needs: string[]
  skipReason: string | null
  notes?: string
}

export type EChartsManifest = {
  source: string
  fetchedAt: string
  count: number
  examples: EChartsExampleMeta[]
}
