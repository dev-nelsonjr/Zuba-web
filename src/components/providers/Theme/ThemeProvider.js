import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager, ThemeProvider } from 'styled-components'

import { definitions } from './definitions'
import { GlobalStyle } from './GlobalStyle'

const shouldForwardProp = (propName, target) =>
  typeof target !== 'string' || isPropValid(propName)

export const Theme = ({ children }) => (
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <ThemeProvider theme={definitions}>
      <GlobalStyle bg="raisinBlack" color="white" fontSize={3} />
      {children}
    </ThemeProvider>
  </StyleSheetManager>
)
