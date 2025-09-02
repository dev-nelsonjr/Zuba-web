import * as React from 'react'
import styled from 'styled-components'

import { th } from '../../Theme'

const Container = styled('div')`
  display: flex;
  padding: ${th.space(2)}px;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`

const Title = styled('div')`
  flex: 1;
`

const Value = styled('div')`
  text-align: right;
`
const Currency = styled('div')`
  color: ${props => (props.negative ? th.color('red') : th.color('green'))};
`

const formatCurrency = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    value
  )

export const Transaction = ({ value, title, resolved }) => (
  <Container>
    <Title>{title}</Title>
    <Value>
      <Currency negative={value < 0}>{formatCurrency(value)}</Currency>
      <small>{resolved ? 'Paid' : 'Unpaid'}</small>
    </Value>
  </Container>
)
