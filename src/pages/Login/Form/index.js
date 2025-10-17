import * as React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

import { typography, space } from 'styled-system'
import { Box, Field, Button } from '~/components/atoms'

const Link = styled(RouterLink)`
  text-decoration: none;
  ${typography}
  ${space}
`

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: yup.string().required('A password is required'),
})

export const Form = ({ onSubmit }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik({
    onSubmit,
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
  })
  return (
    <form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="email"
        label="E-mail"
        placeholder="Enter your email"
        value={values.email}
        error={touched.email && errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        mb={3}
      />

      <Field
        type="password"
        name="password"
        label="Password"
        placeholder={'Enter your password'}
        value={values.password}
        error={touched.password && errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        mb={3}
      />

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        p={6}
      >
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
          m={1}
        >
          Sign in
        </Button>

        <Box m={1} fontSize={1} color="gray">
          {' '}
          Don&apos;t have an account?{' '}
          <Link to="/signup" color="gray" fontWeight="bold">
            Sign Up!
          </Link>
        </Box>
      </Box>
    </form>
  )
}
