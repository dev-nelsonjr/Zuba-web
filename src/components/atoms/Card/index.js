import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

import { Box } from '~/components/atoms/Box'
import { Icon } from '~/components/atoms/Icon'

const Header = styled('div')`
  display: flex;
  gap: ${themeGet('space.2')}px;
  align-items: center;
  padding: ${themeGet('space.2')}px;
  color: ${themeGet('colors.grayscale.4')};
`

const Container = styled(Box)`
  border-radius: ${themeGet('space.1')}px;
  padding: ${themeGet('space.2')}px;
`

export const Card = ({ icon, title, bg = 'black', children, ...props }) => (
  <Container {...props} bg={bg}>
    {title && (
      <Header>
        {icon && <Icon name={icon} />}
        {title}
      </Header>
    )}

    {children && <Box p={2}>{children}</Box>}
  </Container>
)
