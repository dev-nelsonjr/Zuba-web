import styled from 'styled-components'

import {
  background,
  margin,
  padding,
  flexbox,
  typography,
  color,
  layout,
} from 'styled-system'

export const Box = styled('div')`
  ${layout}
  ${typography}
  ${color}
  ${background}
  ${padding}
  ${margin}
  ${flexbox}
`
