import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

import { Box, Currency } from '~/components/atoms'

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

export const Transaction = ({ value, title, resolved }) => (
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
