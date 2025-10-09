import * as React from 'react'

import styled from 'styled-components'

import { margin } from 'styled-system'
import { themeGet } from '@styled-system/theme-get'
import { Spinner } from '../Spinner'

const StyledButton = styled('button')`
  background: ${themeGet('colors.white')};
  border: none;
  border-radius: 200px;
  color: ${themeGet('colors.black')};
  padding: ${themeGet('space.2')}px ${themeGet('space.8')}px;
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
