import styled from 'styled-components'

import { themeGet } from '@styled-system/theme-get'

export const Label = styled('label')`
  padding: ${props => themeGet('space.2')}px ${props => themeGet('space.3')}px;
`
