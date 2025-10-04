import * as React from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

import { login } from '~/services/sdk'

import { typography } from 'styled-system'
import { Logo, Box } from '~/components/atoms'
import { useAuth } from '~/components/providers'

import { Form } from './Form'
import { ReactComponent as Illus } from './illus.svg'

const Title = styled('h2')`
  ${typography}
`
const CenteredBox = ({ children, ...props }) => (
  <Box {...props} flex={1} flexbox="column" center>
    <Box style={{ width: '442px' }}>{children}</Box>
  </Box>
)

export const SignIn = () => {
  const history = useNavigate()
  const location = useLocation()
  const [, { login: setAuth }] = useAuth()

  const { from } = location.state || { from: { pathname: '/' } }

  const onSubmit = async values => {
    try {
      const data = await login(values)
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
        <Title textAlign="center">Access Your Zuba Account</Title>
        <Form onSubmit={onSubmit} />
      </CenteredBox>
    </Box>
  )
}
