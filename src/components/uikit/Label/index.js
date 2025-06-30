import styled from 'styled-components'

import { th } from '../../Theme/styled'

export const Label = styled('label')`
  padding: ${props => th.space(2)(props)}px ${props => th.space(3)(props)}px;
`
