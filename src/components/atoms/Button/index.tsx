import styled from 'styled-components'
import type { ComponentPropsWithoutRef } from 'react'

import { margin, color, type ColorProps, type MarginProps } from 'styled-system'
import { themeGet } from '@styled-system/theme-get'
import { Spinner } from '../Spinner'

export type ButtonProps = ComponentPropsWithoutRef<'button'> &
  ColorProps &
  MarginProps & {
    loading?: boolean
  }

const StyledButton = styled('button')<ButtonProps>`
  background: ${themeGet('colors.white')};
  border: none;
  border-radius: 200px;
  padding: ${themeGet('space.2')}px ${themeGet('space.8')}px;
  font-size: inherit;
  outline: none;

  ${({ disabled }) => disabled && 'opacity: 0.5'}

  ${color}
  ${margin}
`

export const Button = ({
  disabled,
  loading,
  children,
  ...props
}: ButtonProps) => (
  <StyledButton {...props} disabled={disabled || loading}>
    {loading ? <Spinner /> : children}
  </StyledButton>
)
