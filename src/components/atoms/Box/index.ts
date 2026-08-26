import styled from 'styled-components'
import type { ComponentPropsWithoutRef } from 'react'

import {
  background,
  space,
  flexbox,
  typography,
  color,
  layout,
  border,
  type BackgroundProps,
  type BorderProps,
  type ColorProps,
  type FlexboxProps,
  type LayoutProps,
  type SpaceProps,
  type TypographyProps,
} from 'styled-system'

export type BoxProps = ComponentPropsWithoutRef<'div'> &
  LayoutProps &
  BorderProps &
  TypographyProps &
  ColorProps &
  BackgroundProps &
  SpaceProps &
  FlexboxProps

export const Box = styled('div')<BoxProps>`
  ${layout}
  ${border}
  ${typography}
  ${color}
  ${background}
  ${space}
  ${flexbox}
`
