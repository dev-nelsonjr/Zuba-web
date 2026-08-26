/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare const process: {
  env: {
    REACT_APP_API_ENV?: string
    REACT_APP_CUSTOM_URL?: string
  }
}

declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react'

  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
  const source: string
  export default source
}
