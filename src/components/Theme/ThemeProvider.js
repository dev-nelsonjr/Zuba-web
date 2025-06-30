import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { definitions } from './config'
import { GlobalStyle } from './GlobalStyle'

export const Theme = ({ children }) => (
  <ThemeProvider theme={definitions}>
    <GlobalStyle bg="raisinBlack" color="white" />
    {children}
    </ThemeProvider>
)
