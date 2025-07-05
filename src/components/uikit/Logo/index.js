import * as React from 'react'

import { Box } from '../Box'
import { ReactComponent as Svg } from './logo.svg'

export const Logo = props => (
  <Box {...props}>
    <Svg />
  </Box>
)
