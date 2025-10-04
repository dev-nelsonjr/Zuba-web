import '@testing-library/jest-dom'
import axios from 'axios'

import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'

import { Router } from 'react-router-dom'

import { baseURL } from '../Services/sdk/index'
import { Theme } from '../components/providers/Theme'
import { StorageProvider } from '../components/providers/Storage/'
import * as localStoragePersistenceAdapter from '../components/providers/Storage/persistence-adapters/local-storage'

import { App } from './index'

jest.mock('axios')

beforeEach(() => {
  localStoragePersistenceAdapter.clear()
})

test('should show login form', () => {
  const history = createMemoryHistory()

  render(
    <Theme>
      <StorageProvider persistenceAdapter={localStoragePersistenceAdapter}>
        <Router history={history}>
          <App />
        </Router>
      </StorageProvider>
    </Theme>
  )

  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')
  const submit = screen.getByRole('button', { name: /sign in/i })
  const signupLink = screen.getByRole('link')

  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()

  expect(submit).toBeInTheDocument()

  expect(signupLink).toBeInTheDocument()
  expect(signupLink).toHaveAttribute('href', '/signup')
})

test('should login user and redirect when API return success', async () => {
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

  axios.mockImplementationOnce(() => Promise.resolve({ data: responseData }))

  const history = createMemoryHistory()
  render(
    <Theme>
      <StorageProvider persistenceAdapter={localStoragePersistenceAdapter}>
        <Router history={history}>
          <App />
        </Router>
      </StorageProvider>
    </Theme>
  )

  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button', { name: /sign in/i })

  await userEvent.type(emailInput, credentials.email)
  await userEvent.type(passwordInput, credentials.password)

  await waitFor(() => {
    expect(submitBtn).not.toBeDisabled()
  })

  await userEvent.click(submitBtn)

  await waitFor(() => {
    expect(submitBtn).toBeDisabled()
  })

  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith({
      baseURL,
      method: 'post',
      url: '/login',
      auth: { password: credentials.password, username: credentials.email },
    })
  })

  await waitFor(() => {
    expect(screen.getByText(responseData.user.name)).toBeInTheDocument()
  })
})

test('should not redirect user when API returns error', async () => {
  const credentials = {
    email: 'error@gmail.com',
    password: '123456',
  }

  axios.mockImplementationOnce(() =>
    Promise.reject({
      response: { status: 401 },
    })
  )

  const history = createMemoryHistory()

  render(
    <Theme>
      <StorageProvider persistenceAdapter={localStoragePersistenceAdapter}>
        <Router history={history}>
          <App />
        </Router>
      </StorageProvider>
    </Theme>
  )

  const emailInput = screen.getByLabelText('E-mail')
  const passwordInput = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button')

  await userEvent.type(emailInput, credentials.email)
  await userEvent.type(passwordInput, credentials.password)

  await waitFor(() => {
    expect(submitBtn).not.toBeDisabled()
  })
  await userEvent.click(submitBtn)

  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith({
      baseURL,
      method: 'post',
      url: '/login',
      auth: { password: credentials.password, username: credentials.email },
    })
  })

  await waitFor(() => expect(submitBtn).not.toBeDisabled())

  expect(history.location.pathname).toBe('/')
  expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
})
