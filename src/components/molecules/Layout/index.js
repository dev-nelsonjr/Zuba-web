import { useState } from 'react'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Logo, Icon, Box } from '~/components/atoms'
import { useAuth } from '~/components/providers'

const pageTitles = {
  '/': 'Dashboard',
  '/transaction': 'New transaction',
}

const Container = styled('div')`
  flex: 1;
  display: flex;
  overflow: hidden;
`

const Menu = styled('aside')`
  background: ${themeGet('colors.black')};
  display: flex;
  flex-direction: column;

  @media (max-width: 760px) {
    position: fixed;
    inset: 0 auto 0 0;
    width: 200px;
    z-index: 30;
    transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
    transition: transform 180ms ease;
    box-shadow: 12px 0 28px rgb(0 0 0 / 35%);
  }
`

const MenuToggle = styled('button')`
  display: none;

  @media (max-width: 760px) {
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${themeGet('colors.white')};
    background: transparent;
    border: 0;
    cursor: pointer;
  }
`

const Backdrop = styled('div')`
  display: none;

  @media (max-width: 760px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 20;
    background: rgb(0 0 0 / 55%);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    transition:
      opacity 180ms ease,
      visibility 180ms ease;
  }
`

const Scroll = styled('div')`
  flex: 1;
  overflow-y: auto;
`

const MobileHeader = styled('header')`
  display: none;

  @media (max-width: 760px) {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: ${themeGet('space.2')}px;
    display: flex;
    align-items: center;
    gap: ${themeGet('space.2')}px;
    background: ${themeGet('colors.raisinBlack')};
  }
`

const MobileTitle = styled('h1')`
  margin: 0;
  font-size: ${themeGet('fontSizes.6')}px;
`

const Main = styled('main')`
  padding: ${themeGet('space.2')}px;
  max-width: 1200px;
  margin: 0 auto;
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${themeGet('space.2')}px;
  color: ${themeGet('colors.white')};
  text-decoration: none;

  &:not(:last-child) {
    border-bottom: 1px solid ${themeGet('colors.grayscale.1')};
  }

  @media (max-width: 760px) {
    box-sizing: border-box;
    width: 200px;
    justify-content: flex-start;
    gap: ${themeGet('space.2')}px;
  }
`

const ItemLabel = styled('span')`
  display: none;

  @media (max-width: 760px) {
    display: block;
  }
`

const Logout = styled('button')`
  padding: ${themeGet('space.2')}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeGet('colors.white')};
  background: transparent;
  border: 0;
  cursor: pointer;

  @media (max-width: 760px) {
    width: 200px;
    justify-content: flex-start;
    gap: ${themeGet('space.2')}px;
  }
`

const Brand = styled(Box)`
  @media (max-width: 760px) {
    display: none;
  }
`

const Navigation = styled(Box)`
  @media (max-width: 760px) {
    padding-top: ${themeGet('space.2')}px;
  }
`

const Item = ({ icon, label, to, onClick }) => (
  <NavItem to={to} onClick={onClick} aria-label={label}>
    <Icon name={icon} color="white" />
    <ItemLabel>{label}</ItemLabel>
  </NavItem>
)

const LogoutButton = ({ onNavigate }) => {
  const navigate = useNavigate()

  const [, { logout }] = useAuth()

  const handleLogout = () => {
    logout()
    onNavigate()
    navigate('/')
  }

  return (
    <Logout type="button" aria-label="Logout" onClick={handleLogout}>
      <Icon name="logout" />
      <ItemLabel>Logout</ItemLabel>
    </Logout>
  )
}

export const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const closeMenu = () => setMenuOpen(false)

  return (
    <Container>
      <Menu id="main-menu" $open={menuOpen}>
        <Brand px={4} py={9}>
          <Logo height={40} onlyIcon />
        </Brand>

        <Navigation
          as="nav"
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box flex={1}>
            <Item icon="dash" label="Dashboard" to="/" onClick={closeMenu} />
            <Item
              icon="graph"
              label="New transaction"
              to="/transaction"
              onClick={closeMenu}
            />
          </Box>

          <LogoutButton onNavigate={closeMenu} />
        </Navigation>
      </Menu>

      <Backdrop $open={menuOpen} onClick={closeMenu} />

      <Scroll>
        <MobileHeader>
          <MenuToggle
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen(open => !open)}
          >
            <Icon name="menu" width={40} />
          </MenuToggle>
          <MobileTitle>{pageTitles[location.pathname]}</MobileTitle>
        </MobileHeader>
        <Main>{children}</Main>
      </Scroll>
    </Container>
  )
}
