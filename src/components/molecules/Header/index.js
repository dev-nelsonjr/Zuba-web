import styled from 'styled-components'
import themeGet from '@styled-system/theme-get'

import { Box, Icon } from '~/components/atoms'

const Container = styled(Box)`
  padding: ${themeGet('space.2')}px;
  display: flex;
  align-items: center;
  gap: ${themeGet('space.2')}px;
`

const Title = styled('h1')`
  flex: 1;
  font-size: ${themeGet('fontSizes.6')}px;
`

export const Header = ({ icon, title, children }) => (
  <Container>
    {icon && <Icon name={icon} />}
    <Title>{title}</Title>
    {children}
  </Container>
)
