import { createGlobalStyle } from 'styled-components'

import {
  color,
  typography,
  type ColorProps,
  type TypographyProps,
} from 'styled-system'

export const GlobalStyle = createGlobalStyle<ColorProps & TypographyProps>`
* {
    font-family: Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
html, body {
height: 100%;
}

  body {
  ${color}
  ${typography}

    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
  height: 100%;
  display: flex;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  input {
    font-size: inherit;
    outline: none;
  }
`
