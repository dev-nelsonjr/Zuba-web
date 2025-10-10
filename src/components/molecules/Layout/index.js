import * as React from 'react'
import styled from 'styled-components'

import { themeGet } from '@styled-system/theme-get'
import { Logo } from '~/components/atoms'

const Container = styled('div')`
  flex: 1;
  display: flex;
`
const Menu = styled('aside')`
  background: ${themeGet('colors.black')};
  padding: ${themeGet('space.2')}px;
`

const Main = styled('main')`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
`

export const Layout = ({ children }) => (
  <Container>
    <Menu>
      <Logo height={50} onlyIcon />
    </Menu>
    <Main>{children}</Main>
  </Container>
)
