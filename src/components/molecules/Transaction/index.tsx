import styled from 'styled-components'
import type { ReactNode } from 'react'
import { themeGet } from '@styled-system/theme-get'

import { Box, Currency, type CurrencyValue } from '~/components/atoms'

const Container = styled('div')`
  display: flex;
  padding: ${themeGet('space.2')}px;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid ${themeGet('colors.grayscale.1')};
  }
`

const Title = styled('div')`
  flex: 1;
`

const Value = styled('div')`
  text-align: right;
`

type TransactionProps = {
  value: CurrencyValue
  title: ReactNode
  resolved?: boolean
}

export const Transaction = ({ value, title, resolved }: TransactionProps) => (
  <Container>
    <Title>{title}</Title>
    <Value>
      <Currency value={value} />
      <Box fontSize={1} color="grayscale.5">
        {resolved ? 'Paid' : 'Unpaid'}
      </Box>
    </Value>
  </Container>
)
