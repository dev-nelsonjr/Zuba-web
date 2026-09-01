import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

import { Box, Currency, type CurrencyValue } from '~/components/atoms'
import type { TransactionType } from '~/services/sdk'

const Container = styled('button')`
  width: 100%;
  display: flex;
  padding: ${themeGet('space.2')}px;
  align-items: center;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${themeGet('colors.grayscale.1')};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }

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
  title: string
  type: TransactionType | null
  resolved: boolean
  disabled?: boolean
  onToggle: () => void
}

export const Transaction = ({
  value,
  title,
  type,
  resolved,
  disabled,
  onToggle,
}: TransactionProps) => (
  <Container
    type="button"
    disabled={disabled}
    aria-pressed={resolved}
    aria-label={`Mark ${title} as ${resolved ? 'pending' : 'resolved'}`}
    onClick={onToggle}
  >
    <Title>{title}</Title>
    <Value>
      <Currency value={value} />
      <Box fontSize={1} color="grayscale.5">
        {resolved
          ? type === 'revenue'
            ? 'Received'
            : type === 'expense'
              ? 'Paid'
              : 'Resolved'
          : 'Pending'}
      </Box>
    </Value>
  </Container>
)
