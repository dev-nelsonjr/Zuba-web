import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { format, parseISO } from 'date-fns'

import { Currency, type CurrencyValue } from '~/components/atoms'
import type { TransactionType } from '~/services/sdk'

const Container = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${themeGet('colors.grayscale.1')};
`

const StatusButton = styled('button')`
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-areas: 'details date value';
  flex: 1;
  gap: ${themeGet('space.1')}px;
  padding: ${themeGet('space.1')}px;
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

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      'details value'
      'date value';
    gap: ${themeGet('space.0')}px ${themeGet('space.1')}px;
  }
`

const DeleteButton = styled('button')`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${themeGet('space.1')}px;
  border: 0;
  background: transparent;
  color: ${themeGet('colors.grayscale.5')};
  font-family: inherit;
  font-size: ${themeGet('fontSizes.6')}px;
  cursor: pointer;

  &:hover {
    background: rgb(255 100 124 / 12%);
    color: ${themeGet('colors.red')};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`

const Left = styled('div')`
  grid-area: details;
  min-width: 0;
`

const Details = styled('div')`
  min-width: 0;
`

const Title = styled('div')`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TypeLabel = styled('div')`
  margin-top: ${themeGet('space.0')}px;
  color: ${themeGet('colors.grayscale.5')};
  font-size: ${themeGet('fontSizes.1')}px;
`

const DueDate = styled('div')`
  grid-area: date;
  justify-self: center;
  text-align: center;
  color: ${themeGet('colors.grayscale.5')};
  font-size: ${themeGet('fontSizes.0')}px;
  white-space: nowrap;

  @media (max-width: 760px) {
    justify-self: start;
    text-align: left;
  }
`

const Value = styled('div')`
  grid-area: value;
  justify-self: end;
  min-width: 90px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Status = styled('div')<{ $resolved: boolean }>`
  display: inline-flex;
  margin-top: ${themeGet('space.0')}px;
  padding: 2px 8px;
  border-radius: ${themeGet('radii.full')};
  background: ${({ $resolved }) =>
    $resolved ? 'rgb(11 217 179 / 14%)' : 'rgb(235 196 85 / 14%)'};
  color: ${props =>
    themeGet(props.$resolved ? 'colors.green' : 'colors.yellow')(props)};
  font-size: ${themeGet('fontSizes.0')}px;
  font-weight: 600;
`

type TransactionProps = {
  value: CurrencyValue
  title: string
  type: TransactionType | null
  dueDate: string | null
  resolved: boolean
  disabled?: boolean
  onToggle: () => void
  onDelete: () => void
}

export const Transaction = ({
  value,
  title,
  type,
  dueDate,
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
      <Left>
        <Details>
          <Title>{title}</Title>
          <TypeLabel>
            {type === 'revenue'
              ? 'Income'
              : type === 'expense'
                ? 'Expense'
                : 'Transaction'}
          </TypeLabel>
        </Details>
      </Left>
      {dueDate && (
        <DueDate>
          DUE {format(parseISO(dueDate), 'dd MMM yyyy').toUpperCase()}
        </DueDate>
      )}
      <Value>
        <Currency value={value} />
        <Status $resolved={resolved}>
          {resolved
            ? type === 'revenue'
              ? 'Received'
              : type === 'expense'
                ? 'Paid'
                : 'Resolved'
            : 'Pending'}
        </Status>
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
