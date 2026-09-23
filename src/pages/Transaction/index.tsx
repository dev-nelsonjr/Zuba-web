import { useRef } from 'react'
import styled from 'styled-components'
import { format, isValid as isValidDate, parse } from 'date-fns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { saveTransaction } from '~/services/sdk'
import type { TransactionType } from '~/services/sdk/modules/transactions'

import { themeGet } from '@styled-system/theme-get'
import { Box, Field, Button, CurrencyInput, Layout, Header } from '~/components'

const validationSchema = yup.object().shape({
  value: yup
    .number()
    .typeError('Enter a valid transaction value')
    .required('Transaction value is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup
    .string()
    .test({
      name: 'valid-date',
      message: 'Enter a valid due date',
      test: value =>
        !value ||
        (value.length === 10 &&
          isValidDate(parse(value, 'yyyy-MM-dd', new Date()))),
    })
    .test({
      name: 'future-date',
      message: 'Due date cannot be in the past',
      test: value => !value || value >= format(new Date(), 'yyyy-MM-dd'),
    }),
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
      : themeGet('colors.green')(props)};

  @media (max-width: 560px) {
    font-size: ${themeGet('fontSizes.9')}px;
  }
`

const FormContent = styled(Box)`
  box-sizing: border-box;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;

  @media (max-width: 560px) {
    padding-right: ${themeGet('space.2')}px;
    padding-left: ${themeGet('space.2')}px;
  }
`

const TypeSelector = styled('div')`
  max-width: 320px;
  margin: ${themeGet('space.3')}px auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${themeGet('space.0')}px;
`

const TypeButton = styled('button')<{
  $selected: boolean
  $type: TransactionType
}>`
  padding: ${themeGet('space.1')}px;
  border: 1px solid
    ${props =>
      themeGet(
        props.$selected
          ? props.$type === 'expense'
            ? 'colors.red'
            : 'colors.green'
          : 'colors.grayscale.2'
      )(props)};
  border-radius: ${themeGet('radii.lg')};
  background: ${({ $selected, $type }) =>
    $selected
      ? $type === 'expense'
        ? 'rgb(255 100 124 / 12%)'
        : 'rgb(11 217 179 / 12%)'
      : 'transparent'};
  color: ${props =>
    themeGet(
      props.$selected
        ? props.$type === 'expense'
          ? 'colors.red'
          : 'colors.green'
        : 'colors.grayscale.6'
    )(props)};
  font: inherit;
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`

const FormCard = styled(Box)`
  padding: ${themeGet('space.3')}px;
  background: transparent;

  @media (max-width: 560px) {
    padding: 0;
  }
`

const ButtonActions = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${themeGet('space.1')}px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const PrimaryButton = styled(Button)`
  box-sizing: border-box;
  width: 100%;
  border-radius: ${themeGet('radii.full')};
  cursor: pointer;
`

const SecondaryButton = styled(Button)`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${themeGet('colors.green')};
  border-radius: ${themeGet('radii.full')};
  background: rgb(11 217 179 / 12%);
  color: ${themeGet('colors.white')};
  cursor: pointer;

  &:hover {
    background: rgb(11 217 179 / 20%);
  }
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
    setFieldValue,
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
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      value: '',
      description: '',
    },
  })
  return (
    <Layout>
      <Header icon="graph" title="New transaction" />

      <FormContent px={4} pb={7}>
        <Box display="flex" flexDirection="column" py={7}>
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
            {values.type === 'revenue' ? 'Income amount' : 'Expense amount'}
          </Box>

          <TypeSelector role="group" aria-label="Transaction type">
            <TypeButton
              type="button"
              $type="revenue"
              $selected={values.type === 'revenue'}
              aria-pressed={values.type === 'revenue'}
              disabled={isSubmitting}
              onClick={() => setFieldValue('type', 'revenue')}
            >
              Income
            </TypeButton>
            <TypeButton
              type="button"
              $type="expense"
              $selected={values.type === 'expense'}
              aria-pressed={values.type === 'expense'}
              disabled={isSubmitting}
              onClick={() => setFieldValue('type', 'expense')}
            >
              Expense
            </TypeButton>
          </TypeSelector>
        </Box>

        <FormCard>
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
            type="date"
            name="dueDate"
            label="Due date"
            min={format(new Date(), 'yyyy-MM-dd')}
            value={values.dueDate}
            error={touched.dueDate && errors.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            mb={3}
          />

          <ButtonActions>
            <PrimaryButton
              loading={isSubmitting}
              disabled={!isValid}
              onClick={() => {
                shouldGoBack.current = true
                handleSubmit()
              }}
            >
              Save
            </PrimaryButton>

            <SecondaryButton
              disabled={isSubmitting}
              onClick={() => {
                shouldGoBack.current = false
                handleSubmit()
              }}
            >
              Save &amp; add another
            </SecondaryButton>
          </ButtonActions>

          {mutation.isError && (
            <Box color="red" textAlign="center" mt={3} role="alert">
              Unable to save the transaction. Check the fields and try again.
            </Box>
          )}
        </FormCard>
      </FormContent>
    </Layout>
  )
}
