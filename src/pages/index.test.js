import '@testing-library/jest-dom'
import axios from 'axios'

import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'

import { Router } from 'react-router-dom'

import { Theme } from '../components/Theme'
import { AuthProvider } from '../components/Modules'

import { App } from './index'

jest.mock('axios')

test('should show login form', () => {
  // prepare

  render(
    <Theme>
      <AuthProvider>
      <Router history={createMemoryHistory()}>

        <App />
      </Router>
      </AuthProvider>
    </Theme>
  )

  // execute
  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')
  const submit = screen.getByRole('button', { name: /sign in/i })
  const signupLink = screen.getByRole('link')

  // assert
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  expect(submit).toBeInTheDocument();

  expect(signupLink).toBeInTheDocument();
  expect(signupLink).toHaveAttribute('href', '/signup');

});

test('should login user when submit form with valid credentials' , async() => {
  // prepare
  const credentials = {
    email: 'n2test@gmail.com',
    password: '123456',
  }

  const responseData = {
    user: {
      id: 1,
      name: 'n2test 123',
      email: credentials.email,
    },
    token: '123',
  }

 axios.post.mockImplementation(() => Promise.resolve({data: responseData,}))

  const history = createMemoryHistory()

  render(
    <Theme>
     <AuthProvider>
        <Router history={history}>
          <App />
        </Router>
     </AuthProvider>
    </Theme>
  )

  // execute
  const emailInput = screen.getByLabelText('E-mail')
  await userEvent.type(emailInput, credentials.email)

  const passwordInput = screen.getByLabelText('Password')
  await userEvent.type(passwordInput, credentials.password)

  const submitBtn = screen.getByRole('button', { name: /sign in/i })
  await userEvent.click(submitBtn)

  // assert
  expect(submitBtn).toBeDisabled()

  const expectedToken = btoa(`${credentials.email}:${credentials.password}`)
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:9901/login",
      {},
      { headers: { Authorization: `Basic ${expectedToken}` } },
    )
  })})
