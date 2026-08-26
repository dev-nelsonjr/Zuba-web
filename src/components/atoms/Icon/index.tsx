import styled from 'styled-components'
import type { SVGProps } from 'react'

import { color, type ColorProps } from 'styled-system'
import { ReactComponent as dash } from './svgs/dash.svg'
import { ReactComponent as graph } from './svgs/graph.svg'
import { ReactComponent as menu } from './svgs/menu.svg'
import { ReactComponent as resume } from './svgs/resume.svg'
import { ReactComponent as logout } from './svgs/logout.svg'
import { ReactComponent as plus } from './svgs/plus.svg'

const icons = {
  dash,
  graph,
  menu,
  resume,
  logout,
  plus,
}

export type IconName = keyof typeof icons

export type IconProps = SVGProps<SVGSVGElement> &
  ColorProps & {
    name: IconName
    width?: number | string
  }

const StyledIcon = styled('svg')<ColorProps>`
  ${color}
  fill: none;
`

export const Icon = ({ name, width = 30, ...props }: IconProps) => {
  return <StyledIcon as={icons[name]} {...props} width={width} />
}
