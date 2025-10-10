import * as React from 'react'
import styled from 'styled-components'
import { mask } from 'remask'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { saveTransactions } from '~/components/providers/Auth/transaction'

import { themeGet } from '@styled-system/theme-get'
import { Box, Field, Button, CurrencyInput, Layout } from '~/components'

const validationSchema = yup.object().shape({
  value: yup.number().required(),
  description: yup.string().required('put your description'),
})

const ValueInput = styled(CurrencyInput)`
  border: 0;
  text-align: center;
  font-size: ${themeGet('fontSizes.10')}px;
  color: ${props =>
    Number(props.value) > 0
      ? themeGet('colors.blue')(props)
      : themeGet('colors.red')(props)};
`

export const Transaction = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: saveTransactions,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['Transactions'] })
    },
  })

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    isValid,
    handleSubmit,
  } = useFormik({
    onSubmit: formValues => mutation.mutateAsync(formValues),
    validationSchema,
    initialValues: {
      dueDate: '',
      value: '',
      description: '',
    },
  })
  return (
    <Layout>
      <Box display="flex" flexDirection="column" px={4} py={7}>
        <ValueInput
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={values.value}
          error={touched.value && errors.value}
          onChange={handleChange('value')}
          onBlur={handleBlur('value')}
          disabled={isSubmitting}
          mb={3}
        />
        <Box p={2} textAlign="center" fontSize={3} color="gray">
          Value of {values.value > 0 ? 'revenue' : 'expense'}
        </Box>
      </Box>
      <Box p={4}>
        <Field
          type="text"
          label="Description"
          placeholder="Describe the transaction"
          value={values.description}
          error={touched.description && errors.description}
          onChange={handleChange('description')}
          onBlur={handleBlur('description')}
          disabled={isSubmitting}
          mb={3}
        />

        <Field
          type="text"
          label="Expiry date"
          placeholder="mm/dd/yyyy"
          value={mask(values.dueDate, '99/99/9999')}
          error={touched.dueDate && errors.dueDate}
          onChange={handleChange('dueDate')}
          onBlur={handleBlur('dueDate')}
          disabled={isSubmitting}
          mb={3}
        />

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          onClick={handleSubmit}
          m={1}
        >
          save
        </Button>
      </Box>
    </Layout>
  )
}
