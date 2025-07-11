import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { SignIn } from './'
import { Theme } from '../../components'

test('should validate and show error in email field on blur', async() => {
   const emailValue = 'abc'
   const history = createMemoryHistory()

  render(
    <Theme>
      <Router history={history}>
        <SignIn />
      </Router>

    </Theme>
  )
  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')

  //execute /act
  await userEvent.type(emailInput, emailValue)
  await userEvent.click(passwordInput)


  // assert
  expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
})

test('should show required field errors on submit with empty form', async() => {
 const history = createMemoryHistory()

  render(
    <Theme>
      <Router history={history}>
        <SignIn />
      </Router>

    </Theme>
  )

  //execute /act
  const submitBtn = screen.getByRole('button')
  await userEvent.click(submitBtn)

  // assert
  expect(screen.getByText('Email is required.')).toBeInTheDocument()
  expect(screen.getByText('A password is required.')).toBeInTheDocument()
  expect(submitBtn).toBeDisabled()
 })

test('should re-enable form button and hide errors when form is valid', async() => {
       const history = createMemoryHistory()

  render(
    <Theme>
      <Router history={history}>
        <SignIn />
      </Router>
    </Theme>
  )

  //execute /act
  const submitBtn = screen.getByRole('button')
  await userEvent.click(submitBtn)

  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')

  await userEvent.type(emailInput, 'a@a.com')
  await userEvent.type(passwordInput, '123456')

  expect(screen.queryByText('Email is required.')).not.toBeInTheDocument()
  expect(screen.queryByText('A password is required.')).not.toBeInTheDocument()

  // assert
  expect(submitBtn).toBeEnabled()
})
