import * as React from 'react'

import { Box, Field, Button } from '../../components/uikit'

export const Signup = () => {
  return (
    <Box flex={1} flexbox="column" center>
      <Box style={{width: '380px'}}>
        <Field type="text" name="name" label="Name" mb={3} />
        <Field type="text" name="email" label="E-mail" mb={3} />
        <Field type="password" name="password" label="Password" mb={3} />
        <Box flexbox center>
        <Button>Sign Up</Button>
        </Box>
      </Box>
    </Box>
  )
}
