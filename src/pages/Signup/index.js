import * as React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Box, Field, Button } from '../../components/uikit'

const  validationSchema = yup.object().shape({
  name: yup.string().required('Your name is required.'),
  email: yup.string().required('Email is required.').email('Enter a valid email address.'),
  password: yup.string().required('A password is required.')
})

export const Signup = () => {

  const onSubmit = async ()=> {
   // ev.preventDefault()
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

  return (
    <Box flex={1} flexbox="column" center>
      <Box style={{width: '380px'}}>
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

        <Box flexbox center>
        <Button type="submit" loading={isSubmitting}> Sign Up </Button>
        </Box>
        </form>
      </Box>
    </Box>
  )
}
