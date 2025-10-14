import * as React from 'react'
import styled from 'styled-components'

import { color } from 'styled-system'
import { ReactComponent as dash } from './svgs/dash.svg'
import { ReactComponent as graph } from './svgs/graph.svg'
import { ReactComponent as menu } from './svgs/menu.svg'
import { ReactComponent as resume } from './svgs/resume.svg'
import { ReactComponent as logout } from './svgs/logout.svg'

const icons = {
  dash,
  graph,
  menu,
  resume,
  logout,
}

const StyledIcon = styled('svg')`
  ${color}
`

export const Icon = ({ name, width = 35, ...props }) => {
  return <StyledIcon as={icons[name]} {...props} width={width} />
}
