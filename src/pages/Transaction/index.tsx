import { useRef } from 'react'
import styled from 'styled-components'
import { mask } from 'remask'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { saveTransaction } from '~/services/sdk'
import type { TransactionType } from '~/services/sdk/modules/transactions'

import { themeGet } from '@styled-system/theme-get'
import {
  Box,
  Field,
  Button,
  CurrencyInput,
  Layout,
  Select,
  Header,
} from '~/components'

const validationSchema = yup.object().shape({
  value: yup.number().required(),
  description: yup.string().required('put your description'),
})

type TransactionFormValues = {
  type: TransactionType
  dueDate: string
  value: string
  description: string
}

const ValueInput = styled(CurrencyInput)<{
  $transactionType: TransactionType
}>`
  border: 0;
  text-align: center;
  font-size: ${themeGet('fontSizes.10')}px;
  color: ${props =>
    props.$transactionType === 'expense'
      ? themeGet('colors.red')(props)
      : themeGet('colors.blue')(props)};
`

export const Transaction = () => {
  const navigate = useNavigate()
  const shouldGoBack = useRef(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: saveTransaction,
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
  } = useFormik<TransactionFormValues>({
    onSubmit: async (values, form) => {
      try {
        await mutation.mutateAsync(values)
        form.resetForm()

        if (shouldGoBack.current) {
          navigate(-1)
        }
      } catch {
        return
      } finally {
        shouldGoBack.current = false
      }
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
      <Header icon="graph" title="New transaction" />

      <Box display="flex" flexDirection="column" px={4} py={7}>
        <Select
          name="type"
          value={values.type}
          onChange={handleChange}
          disabled={isSubmitting}
          style={{ width: 150 }}
        >
          <option value="revenue">Revenue</option>
          <option value="expense">Expense</option>
        </Select>

        <ValueInput
          type="text"
          $transactionType={values.type}
          inputMode="decimal"
          placeholder="0.00"
          value={values.value}
          error={touched.value && errors.value}
          onChange={handleChange('value')}
          onBlur={handleBlur('value')}
          disabled={isSubmitting}
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
            shouldGoBack.current = true
            handleSubmit()
          }}
          m={1}
        >
          save
        </Button>

        <Button
          bg="transparent"
          color="white"
          disabled={isSubmitting}
          onClick={() => {
            shouldGoBack.current = false
            handleSubmit()
          }}
        >
          save add another transaction
        </Button>

        {mutation.isError && (
          <Box color="red" textAlign="center" mt={3} role="alert">
            Unable to save the transaction. Check the fields and try again.
          </Box>
        )}
      </Box>
    </Layout>
  )
}
