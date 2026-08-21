import styled from 'styled-components'
import themeGet from '@styled-system/theme-get'

import { Box, Icon } from '~/components/atoms'

const Container = styled(Box)`
  padding: ${themeGet('space.2')}px;
  display: flex;
  align-items: center;
  gap: ${themeGet('space.2')}px;

  @media (max-width: 760px) {
    display: ${({ $hasActions }) => ($hasActions ? 'flex' : 'none')};
    justify-content: flex-end;
    padding-top: 0;
  }
`

const PageIcon = styled(Icon)`
  @media (max-width: 760px) {
    display: none;
  }
`

const Title = styled('h1')`
  flex: 1;
  margin: 0;
  font-size: ${themeGet('fontSizes.6')}px;

  @media (max-width: 760px) {
    display: none;
  }
`

export const Header = ({ icon, title, children }) => (
  <Container $hasActions={Boolean(children)}>
    {icon && <PageIcon name={icon} />}
    <Title>{title}</Title>
    {children}
  </Container>
)
