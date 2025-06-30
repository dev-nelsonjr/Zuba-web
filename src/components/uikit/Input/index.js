import styled from "styled-components"

import { th } from '../../Theme/styled'

export const Input = styled('input')`
  background: transparent;
  border: 1px solid #fff;
  border-radius: 200px;
  color: ${props => th.color('white')(props)};
  padding: ${th.space(2)}px ${th.space(1)}px;
  font-size: inherit;
`
