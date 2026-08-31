import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

import { typography, type TypographyProps } from 'styled-system'
import { Logo, Box, type BoxProps } from '~/components/atoms'
import { useAuth } from '~/components/providers'
import { signup } from '~/services/sdk'
import type { SignupData } from '~/services/sdk/modules/auth'

import { Form } from './Form'
import { ReactComponent as Illus } from '~/assets/auth.svg'

type LocationState = {
  from?: { pathname: string }
}

type CenteredBoxProps = BoxProps & {
  children: ReactNode
}

const Title = styled('h2')<TypographyProps>`
  ${typography}
`

const CenteredBox = ({ children, ...props }: CenteredBoxProps) => (
  <Box
    {...props}
    flex={1}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Box style={{ width: '442px' }}>{children}</Box>
  </Box>
)

export const SignUp = () => {
  const history = useNavigate()
  const location = useLocation()
  const [, { login: setAuth }] = useAuth()

  const { from = { pathname: '/' } } =
    (location.state as LocationState | null) || {}

  const onSubmit = async (values: SignupData) => {
    try {
      const data = await signup(values)

      setAuth(data)
      history(from, { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box flex={1} display="flex">
      <CenteredBox bg="black">
        <Logo
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={6}
        />
        <Illus />
      </CenteredBox>

      <CenteredBox>
        <Title textAlign="center">Create Your Zuba Account</Title>
        <Form onSubmit={onSubmit} />
      </CenteredBox>
    </Box>
  )
}
