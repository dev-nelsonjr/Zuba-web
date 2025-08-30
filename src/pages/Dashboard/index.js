import * as React from 'react'
import styled from 'styled-components'
import { th } from '../../components/Theme'

// import { useAuth } from '../../components/Modules'

// export const Dashboard = () => {
//   const [auth, { signOut }] = useAuth()
//   return (
//     <div>
//       Hello <strong>{auth.user.name}</strong> !{' '}
//       <button onClick={signOut}> Sign out </button>
//     </div>
//   )
// }

const Container = styled('div')`
  flex: 1;
  display: flex;
`
const Menu = styled('aside')`
  background: ${th.color('black')};
  padding: ${th.space(2)}px;
`

const Main = styled('main')`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
`

export const Dashboard = () => {
  return (
    <Container>
      <Menu>Menu</Menu>
      <Main>content</Main>
    </Container>
  )
}
