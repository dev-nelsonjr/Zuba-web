import * as React from 'react'

import styled from 'styled-components'

import { th, margin } from '../../Theme/styled'
import { Spinner } from '../Spinner'

const StyledButton = styled('button')`
  background: ${th.color('white')};
  border: none;
  border-radius: 200px;
  color: ${th.color('black')};
  padding: ${th.space(2)}px ${th.space(8)}px;
  font-size: inherit;
  outline: none;

  ${({ disabled }) => disabled && 'opacity: 0.5'}

  ${margin}
`

export const Button = ({ disabled, loading, children, ...props }) => (
  <StyledButton {...props} disabled={disabled || loading}>
    {loading ? <Spinner /> : children}
  </StyledButton>
)
