import styled from 'styled-components'

import {
  background,
  space,
  flexbox,
  typography,
  color,
  layout,
  border,
} from 'styled-system'

export const Box = styled('div')`
  ${layout}
  ${border}
  ${typography}
  ${color}
  ${background}
  ${space}
  ${flexbox}
`
