import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import type { ComponentProps, ReactNode } from 'react'

import { definitions } from './definitions'
import { GlobalStyle } from './GlobalStyle'

type ShouldForwardProp = NonNullable<
  ComponentProps<typeof StyleSheetManager>['shouldForwardProp']
>

type ThemeProps = {
  children: ReactNode
}

const shouldForwardProp: ShouldForwardProp = (propName, target) =>
  typeof target !== 'string' || isPropValid(propName)

export const Theme = ({ children }: ThemeProps) => (
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <ThemeProvider theme={definitions}>
      <GlobalStyle bg="raisinBlack" color="white" fontSize={3} />
      {children}
    </ThemeProvider>
  </StyleSheetManager>
)
