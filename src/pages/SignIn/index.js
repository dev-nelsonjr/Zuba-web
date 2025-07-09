import * as React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import { Logo, Box, font,} from '../../components'
import { useAuth } from '../../components/Modules'

import { Form } from './Form'
import { ReactComponent as Illus } from './illus.svg'

const Title = styled('h2')`
${font}
`
const CenteredBox = ({ children, ...props }) => (
        <Box {...props} flex={1} flexbox="column" center>
        <Box style={{width: '442px'}}>
         {children}
        </Box>
      </Box>
)

  export const SignIn = () => {
      const history = useHistory()
      const location = useLocation()
      const [, { SignIn: setAuth }] = useAuth()

      const { from } = location.state || { from: { pathname: '/' } }
      
      const onSubmit = async (values) => {
       try{
        const token = btoa(`${values.email}:${values.password}`);
    const res = await axios.post(
      'http://localhost:9901/login',
      {},
      {
        headers: {
          Authorization: `Basic ${token}`,
        },})
           setAuth(res.data)
            history.replace(from);
       } catch(error) {
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
