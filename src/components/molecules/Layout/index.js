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
`
const Menu = styled('aside')`
  background: ${themeGet('colors.black')};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Main = styled('main')`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
`

const Item = ({ icon, to }) => (
  <Link to={to}>
    <Box p={1}>
      <Icon name={icon} color="white" width={30} />
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
      <Box p={1}>
        <Logo width={40} onlyIcon />
      </Box>

      <Box as="nav" flex={1} display="flex" flexDirection="column">
        <Box flex={1}>
          <Item icon="dash" to="/" />
          <Item icon="graph" to="/transaction" />
        </Box>

        <LogoutButton />
      </Box>
    </Menu>
    <Main>{children}</Main>
  </Container>
)
