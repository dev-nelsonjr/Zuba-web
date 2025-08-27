import * as React from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

import { Logo, Box, font } from '../../components'
import { useAuth } from '../../components/Modules'

import { signUp } from '../../Services/sdk'

import { Form } from './Form'
import { ReactComponent as Illus } from './illus.svg'

const Title = styled('h2')`
  ${font}
`
const CenteredBox = ({ children, ...props }) => (
  <Box {...props} flex={1} flexbox="column" center>
    <Box style={{ width: '442px' }}>{children}</Box>
  </Box>
)

export const SignUp = () => {
  const history = useHistory()
  const location = useLocation()
  const [, { signIn: setAuth }] = useAuth()

  const { from } = location.state || { from: { pathname: '/' } }

  const onSubmit = async values => {
    try {
      const data = await signUp(values)
      setAuth(data)
      history.replace(from)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Box flex={1} flexbox>
      <CenteredBox bg="black">
        <Logo p={6} />
        <Illus />
      </CenteredBox>

      <CenteredBox>
        <Title textAlign="center">Create Your Zuba Account</Title>
        <Form onSubmit={onSubmit} />
      </CenteredBox>
    </Box>
  )
}
