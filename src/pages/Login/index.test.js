import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { Login } from '.'
import { Theme } from '../../components'

test('should validate and show error in email field on blur', async () => {
  const emailValue = 'abc'

  render(
    <Theme>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Theme>
  )

  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')

  //execute /act
  await userEvent.type(emailInput, emailValue)
  await userEvent.click(passwordInput)

  // assert
  expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
})

test('should validate and show error in password field on blur', async () => {
  render(
    <Theme>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Theme>
  )

  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')

  //execute /act
  await userEvent.click(passwordInput)
  await userEvent.click(emailInput)

  // assert
  const passwordError = screen.getByText('A password is required')
  expect(passwordError).toBeInTheDocument()
})

test('should show required field errors on submit with empty form', async () => {
  render(
    <Theme>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Theme>
  )

  const submitButton = screen.getByRole('button')

  //execute /act
  await userEvent.click(submitButton)

  // assert
  const emailError = screen.getByText('Email is required')
  const passwordError = screen.getByText('A password is required')

  expect(emailError).toBeInTheDocument()
  expect(passwordError).toBeInTheDocument()
  expect(submitButton).toBeDisabled()
})

test('should re-enable form button and hide errors when form is valid', async () => {
  const emailValue = 'test@test.com'
  const passwordValue = '123456'

  render(
    <Theme>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Theme>
  )

  const submitButton = screen.getByRole('button')
  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')

  //execute /act
  await userEvent.click(submitButton)

  await userEvent.type(emailInput, emailValue)
  await userEvent.type(passwordInput, passwordValue)

  await waitFor(() => {
    expect(submitButton).toBeEnabled()
  })

  expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
  expect(screen.queryByText('A password is required')).not.toBeInTheDocument()
})
