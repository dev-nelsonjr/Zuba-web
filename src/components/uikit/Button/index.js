import styled from "styled-components"

import { th } from '../../Theme/styled'

export const Button = styled('button')`
  background: ${th.color('white')};
  border: none;
  border-radius: 200px;
  color: ${th.color('black')};
  padding: ${th.space(2)}px ${th.space(8)}px;
  font-size: inherit;
  outline: none;
`
