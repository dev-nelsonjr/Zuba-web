import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { mask } from 'remask'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { saveTransactions } from '~/services/sdk'

import { themeGet } from '@styled-system/theme-get'
import { Box, Field, Button, CurrencyInput, Layout, Select } from '~/components'

const validationSchema = yup.object().shape({
  value: yup.number().required(),
  description: yup.string().required('put your description'),
})

const ValueInput = styled(CurrencyInput)`
  border: 0;
  text-align: center;
  font-size: ${themeGet('fontSizes.10')}px;
  color: ${props =>
    props['data-type'] === 'expense'
      ? themeGet('colors.red')(props)
      : themeGet('colors.blue')(props)};
`

export const Transaction = () => {
  const navigate = useNavigate()
  const [isGoBack, setIsGoBack] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: saveTransactions,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['dashboard'] })
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
    onSubmit: (values, form) => {
      mutation.mutate(values)
      form.resetForm()
      isGoBack && navigate(-1)
    },
    validationSchema,
    initialValues: {
      type: 'revenue',
      dueDate: '',
      value: '',
      description: '',
    },
  })
  return (
    <Layout>
      <Box display="flex" flexDirection="column" px={4} py={7}>
        <Select
          name="type"
          value={values.type}
          onChange={handleChange}
          disabled={isSubmitting}
          mb={4}
          style={{ width: 150 }}
        >
          <option value="revenue">Revenue</option>
          <option value="expense">Expense</option>
        </Select>

        <ValueInput
          data-type={values.type}
          type="text"
          $transactionType={values.type}
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
          Value of {values.type}
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
          onClick={() => {
            setIsGoBack(true)
            handleSubmit()
          }}
          m={1}
        >
          save
        </Button>

        <Button
          bg="transparent"
          color="white"
          onClick={isSubmitting || handleSubmit}
        >
          save add another transaction
        </Button>
      </Box>
    </Layout>
  )
}
