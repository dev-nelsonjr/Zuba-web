import styled, { css } from 'styled-components'

import { themeGet } from '@styled-system/theme-get'

export const Input = styled('input')`
  background: transparent;
  border: 1px solid #fff;
  border-radius: 200px;
  color: ${props => themeGet(`colors.${props.color || 'white'}`)(props)};
  padding: ${themeGet('space.2')}px ${themeGet('space.3')}px;
  font-size: inherit;
  outline: none;

  ${({ disabled }) => disabled && 'opacity: 0.5;'}

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${themeGet('colors.red')};
    `}
`
