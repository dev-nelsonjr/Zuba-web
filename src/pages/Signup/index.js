import * as React from 'react'
import styled from 'styled-components'

import { Form } from './Form'

import { Logo, Box, font, } from '../../components/'

import { ReactComponent as Illus } from './illus.svg'

const Title = styled('h2')`
${font}
`
const CenteredBox = ({ children, ...props }) => (
        <Box {...props} flex={1} flexbox="column" center>
        <Box style={{width: '442px'}}>
         {childrean}
        </Box>
      </Box>
)

export const Signup = () => {

  return (
    <Box flex={1} flexbox>
    <CenteredBox bg="black">
      <Logo p={6} />
      <Illus />
    </CenteredBox>

    <CenteredBox>
      <Title textAlign="center">Create Account</Title>
      <Form />
    </CenteredBox>
    </Box>
  )
}
