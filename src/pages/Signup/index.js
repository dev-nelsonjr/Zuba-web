import * as React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { Box, Field, Button } from '../../components/uikit'

export const Signup = () => {
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = ev => {
     setValues(prev => ({
      ...prev,
      [ev.target.name]: ev.target.value,
     }))
  }

  const onSubmit = async ev => {
    ev.preventDefault()
    setLoading(true)
  try{
    await axios.post('http://localhost:9901/users', values)
  } catch(error) {
    console.error(error)
  } finally {
    setLoading(false)
  }



  }

  return (
    <Box flex={1} flexbox="column" center>
      <Box style={{width: '380px'}}>
        <form onSubmit={onSubmit}>
          <Field
            type="text"
            name="name"
            label="Name"
            value={values.name || ''}
            onChange={onChange}
            disabled={loading}
            mb={3}
          />

          <Field
            type="text"
            name="email"
            label="E-mail"
            value={values.email || ''}
            onChange={onChange}
            disabled={loading}
            mb={3}
          />

          <Field
            type="password"
            name="password"
            label="Password"
            value={values.password || ''}
            onChange={onChange}
            disabled={loading}
            mb={3}
          />

        <Box flexbox center>
        <Button type="submit" loading={loading}> Sign Up </Button>
        </Box>
        </form>
      </Box>
    </Box>
  )
}
