import '@testing-library/jest-dom'
import axios from 'axios'
import { vi } from 'vitest'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Theme } from '~/components/providers/Theme'
import { Transaction } from '.'

const Location = () => {
  const location = useLocation()

  return <span data-testid="location">{location.pathname}</span>
}

const renderTransaction = queryClient =>
  render(
    <Theme>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/', '/transaction']} initialIndex={1}>
          <Transaction />
          <Location />
        </MemoryRouter>
      </QueryClientProvider>
    </Theme>
  )

beforeEach(() => {
  vi.clearAllMocks()
})

test('should wait for transaction creation before returning', async () => {
  let resolveRequest
  const request = new Promise(resolve => {
    resolveRequest = resolve
  })
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
    },
  })
  const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')

  axios.mockReturnValueOnce(request)
  const view = renderTransaction(queryClient)

  fireEvent.change(screen.getByPlaceholderText('0.00'), {
    target: { value: '100.00' },
  })
  fireEvent.change(screen.getByPlaceholderText('Describe the transaction'), {
    target: { value: 'Salary' },
  })
  fireEvent.click(screen.getByRole('button', { name: /^save$/i }))

  await waitFor(() =>
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/transactions',
        data: {
          description: 'Salary',
          type: 'revenue',
          value: '100.00',
        },
      })
    )
  )
  expect(screen.getByTestId('location')).toHaveTextContent('/transaction')

  resolveRequest({ data: { id: 'transaction-id' } })

  await waitFor(() => {
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['dashboard'],
    })
    expect(screen.getByTestId('location')).toHaveTextContent('/')
  })

  view.unmount()
  queryClient.clear()
})
