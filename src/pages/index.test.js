import '@testing-library/jest-dom'
import axios from 'axios'
import { vi } from 'vitest'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onRehydrateAuthMiddleware } from '../components/providers/Auth'

import { baseURL, setToken } from '../services/sdk'
import { Theme } from '../components/providers/Theme'
import { StorageProvider } from '../components/providers/Storage/'
import * as localStoragePersistenceAdapter from '../components/providers/Storage/persistence-adapters/local-storage'

import { App } from './index'

vi.mock('axios')

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <Theme>
      <QueryClientProvider client={queryClient}>
        <StorageProvider
          persistenceAdapter={localStoragePersistenceAdapter}
          onRehydrate={onRehydrateAuthMiddleware}
        >
          <App />
        </StorageProvider>
      </QueryClientProvider>
    </Theme>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  setToken(false)
  localStoragePersistenceAdapter.clear()
  window.history.pushState({}, '', '/')
})

test('should show login form', () => {
  renderApp()

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
  renderApp()

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
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL,
        method: 'POST',
        url: '/login',
        auth: { password: credentials.password, username: credentials.email },
      })
    )
  })

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /dashboard/i })
    ).toBeInTheDocument()
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

  renderApp()

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
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL,
        method: 'POST',
        url: '/login',
        auth: { password: credentials.password, username: credentials.email },
      })
    )
  })

  await waitFor(() => expect(submitBtn).not.toBeDisabled())

  expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
})

test('should send user name when signing up', async () => {
  const userData = {
    name: 'New User',
    email: 'new-user@test.com',
    password: '123456',
  }

  axios.mockResolvedValueOnce({
    data: {
      user: { id: 1, name: userData.name, email: userData.email },
      token: '123',
    },
  })
  window.history.pushState({}, '', '/signup')
  renderApp()

  await userEvent.type(await screen.findByLabelText('Name'), userData.name)
  await userEvent.type(screen.getByLabelText('E-mail'), userData.email)
  await userEvent.type(screen.getByLabelText('Password'), userData.password)
  await userEvent.click(screen.getByRole('button', { name: /create account/i }))

  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL,
        method: 'POST',
        url: '/signup',
        data: userData,
      })
    )
  })
})
