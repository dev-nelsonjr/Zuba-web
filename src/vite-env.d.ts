/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react'

  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
  const source: string
  export default source
}
