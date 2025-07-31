/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_PROXY_TARGET: string
  readonly VITE_USE_PROXY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 