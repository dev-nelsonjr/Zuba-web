import * as React from 'react'
import styled from 'styled-components'
import { toMoney } from 'vanilla-masker'

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

export const Transaction = ({ value, title, resolved }) => (
  <Container>
    <Title>{title}</Title>
    <Value>
      <Currency negative={value < 0}>{toMoney(value, { unit: '$' })}</Currency>
      <small>{resolved ? 'Paid' : 'Unpaid'}</small>
    </Value>
  </Container>
)
