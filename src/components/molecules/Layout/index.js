import * as React from 'react'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Link } from 'react-router-dom'

import { Logo, Icon, Box } from '~/components/atoms'
import { useAuth } from '~/components/providers'
import { useNavigate } from 'react-router-dom'

const Container = styled('div')`
  flex: 1;
  display: flex;
  overflow: hidden;
`

const Menu = styled('aside')`
  background: ${themeGet('colors.black')};
  display: flex;
  flex-direction: column;
`

const Scroll = styled('div')`
  flex: 1;
  overflow-y: auto;
`

const Main = styled('main')`
  padding: ${themeGet('space.2')}px;
  max-width: 1200px;
  margin: 0 auto;
`

const Item = ({ icon, to }) => (
  <Link to={to}>
    <Box p={1}>
      <Icon name={icon} color="white" />
    </Box>
  </Link>
)

const LogoutButton = () => {
  const navigate = useNavigate()

  const [, { logout }] = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Box p={2} onClick={handleLogout}>
      <Icon name="logout" />
    </Box>
  )
}

export const Layout = ({ children }) => (
  <Container>
    <Menu>
      <Box px={4} py={9}>
        <Logo height={40} onlyIcon />
      </Box>

      <Box
        as="nav"
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box flex={1}>
          <Item icon="dash" to="/" />
          <Item icon="graph" to="/transaction" />
        </Box>

        <LogoutButton />
      </Box>
    </Menu>
    <Scroll>
      <Main>{children}</Main>
    </Scroll>
  </Container>
)
