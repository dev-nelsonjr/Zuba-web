import * as yup from 'yup'
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
import type { SignupData } from '~/services/sdk/modules/auth'

type FormProps = {
  onSubmit: FormikConfig<SignupData>['onSubmit']
}

const Link = styled(RouterLink)<TypographyProps & SpaceProps>`
  text-decoration: none;
  ${typography}
  ${space}
`

const validationSchema = yup.object().shape({
  name: yup.string().required('Your name is required.'),
  email: yup
    .string()
    .required('Email is required.')
    .email('Enter a valid email address.'),
  password: yup.string().required('A password is required.'),
})

export const Form = ({ onSubmit }: FormProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik<SignupData>({
    onSubmit,
    validationSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  return (
    <form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="name"
        label="Name"
        placeholder="Your name"
        value={values.name}
        error={touched.name && errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        mb={3}
      />

      <Field
        type="text"
        name="email"
        label="E-mail"
        placeholder={'Your e-mail'}
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
        placeholder={'Your password'}
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
        <Button type="submit" loading={isSubmitting} m={1}>
          {' '}
          Create Account{' '}
        </Button>

        <Link to="/" m={1} fontSize={1} color="gray" fontWeight="bold">
          I&apos;m already signed up!{' '}
        </Link>
      </Box>
    </form>
  )
}
