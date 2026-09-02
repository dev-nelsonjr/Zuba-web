import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

import { Box, Currency, type CurrencyValue } from '~/components/atoms'
import type { TransactionType } from '~/services/sdk'

const Container = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${themeGet('colors.grayscale.1')};
`

const StatusButton = styled('button')`
  min-width: 0;
  display: flex;
  flex: 1;
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
`

const DeleteButton = styled('button')`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${themeGet('space.2')}px;
  border: 0;
  background: ${themeGet('colors.red')};
  color: ${themeGet('colors.white')};
  font-family: inherit;
  font-size: ${themeGet('fontSizes.6')}px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
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
  onDelete: () => void
}

export const Transaction = ({
  value,
  title,
  type,
  resolved,
  disabled,
  onToggle,
  onDelete,
}: TransactionProps) => (
  <Container>
    <StatusButton
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
    </StatusButton>
    <DeleteButton
      type="button"
      disabled={disabled}
      aria-label={`Delete ${title}`}
      onClick={onDelete}
    >
      ×
    </DeleteButton>
  </Container>
)
