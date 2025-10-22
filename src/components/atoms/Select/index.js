import * as React from 'react'

import styled, { css } from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

export const Select = styled('select')`
  background: transparent;
  border: 1px solid #fff;
  border-radius: 200px;
  color: ${props => themeGet(`colors.${props.color || 'white'}`)(props)};
  padding: ${themeGet('space.2')}px ${themeGet('space.12')}px
    ${themeGet('space.2')}px ${themeGet('space.3')}px;
  font-size: inherit;
  outline: none;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-image:
    linear-gradient(
      45deg,
      transparent 50%,
      ${themeGet('colors.grayscale.7')} 50%
    ),
    linear-gradient(
      135deg,
      ${themeGet('colors.grayscale.7')} 50%,
      transparent 50%
    );
  background-position:
    calc(100% - 20px) 50%,
    calc(100% - 15px) 50%;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;

  option {
    background-color: ${themeGet('colors.black')};
    color: ${themeGet('colors.white')};
  }

  ${({ disabled }) => disabled && 'opacity: 0.5;'}

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${themeGet('colors.red')};
    `}
`
