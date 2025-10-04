import styled from 'styled-components'

import { themeGet } from '@styled-system/theme-get'

export const Label = styled('label')`
  padding: ${props => themeGet('spaces.2')}px ${props => themeGet('spaces.3')}px;
`
