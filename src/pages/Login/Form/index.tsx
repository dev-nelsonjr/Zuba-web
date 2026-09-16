import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik, type FormikConfig } from 'formik'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

import {
  typography,
  space,
  type TypographyProps,
  type SpaceProps,
} from 'styled-system'
import { Box, Field, Button } from '~/components/atoms'
import type { Credentials } from '~/services/sdk/modules/auth'

type FormProps = {
  onSubmit: FormikConfig<Credentials>['onSubmit']
}

const Link = styled(RouterLink)<TypographyProps & SpaceProps>`
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

export const Form = ({ onSubmit }: FormProps) => {
  const [showServerNotice, setShowServerNotice] = useState(false)
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<Credentials>({
    onSubmit,
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (!isSubmitting) {
      setShowServerNotice(false)
      return undefined
    }

    const timeout = setTimeout(() => setShowServerNotice(true), 5000)

    return () => clearTimeout(timeout)
  }, [isSubmitting])

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

        {showServerNotice && (
          <Box color="gray" textAlign="center" fontSize={1} role="status">
            Starting the server. The first access may take up to a minute.
          </Box>
        )}

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
