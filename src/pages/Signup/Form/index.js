import * as React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'

import { Box, Field, Button, font, margin } from '../../../components'

const Link = styled('a')`
text-decoration: none;
${font}
${margin}
`

const  validationSchema = yup.object().shape({
  name: yup.string().required('Your name is required.'),
  email: yup.string().required('Email is required.').email('Enter a valid email address.'),
  password: yup.string().required('A password is required.')
})

export const Form =() => {


   const onSubmit = async (values) => {
    try{
      await axios.post('http://localhost:9901/users', values)
    } catch(error) {
      console.error(error)
    }
  }
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    onSubmit,
    validationSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
    }
  })
  return(

        <form onSubmit={handleSubmit}>
          <Field
            type="text"
            name="name"
            label="Name"
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
            value={values.password}
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            mb={3}
          />

        <Box flexbox="column" center>
        <Button type="submit" loading={isSubmitting} m={1}> Create Account </Button>

        <Link href="#" m={1} fontSize={1} color="gray" fontWeight="bold">Já sou inscrito!</Link>
        </Box>
        </form>
)}
