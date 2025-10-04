import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { definitions } from './definitions'
import { GlobalStyle } from './GlobalStyle'

export const Theme = ({ children }) => (
  <ThemeProvider theme={definitions}>
    <GlobalStyle bg="raisinBlack" color="white" fontSize={3} />
    {children}
  </ThemeProvider>
)
