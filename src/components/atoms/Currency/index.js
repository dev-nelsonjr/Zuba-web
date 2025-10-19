import * as React from 'react'
import { toMoney } from 'vanilla-masker'
import { Box } from '~/components/atoms/Box'

export const Currency = ({ value, ...props }) => (
  <Box {...props} color={value < 0 ? 'red' : 'green'}>
    {toMoney(value, { unit: '$' })}
  </Box>
)
