import '@testing-library/jest-dom'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'

import { Theme } from '~/components'
import { Transaction } from '.'

const renderTransaction = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  })

  return render(
    <Theme>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/', '/transaction']} initialIndex={1}>
          <Routes>
            <Route path="/" element={<div>Dashboard page</div>} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Theme>
  )
}

const fillTransaction = () => {
  fireEvent.change(screen.getByPlaceholderText('0.00'), {
    target: { value: '100' },
  })
  fireEvent.change(screen.getByPlaceholderText('Describe the transaction'), {
    target: { value: 'Test transaction' },
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(axios).mockResolvedValue({
    data: {
      id: 'transaction-id',
      description: 'Test transaction',
      value: '100.00',
      type: 'revenue',
    },
  })
})

test('should navigate back after saving transaction', async () => {
  renderTransaction()
  fillTransaction()

  fireEvent.click(screen.getByRole('button', { name: /^save$/i }))

  expect(await screen.findByText('Dashboard page')).toBeInTheDocument()
  expect(axios).toHaveBeenCalledWith(
    expect.objectContaining({
      method: 'POST',
      url: '/transactions',
    })
  )
})

test('should remain on form when adding another transaction', async () => {
  renderTransaction()
  fillTransaction()

  fireEvent.click(
    screen.getByRole('button', { name: /save add another transaction/i })
  )

  await waitFor(() => {
    expect(axios).toHaveBeenCalled()
  })

  await waitFor(() => {
    expect(screen.getByPlaceholderText('Describe the transaction')).toHaveValue(
      ''
    )
  })
  expect(screen.queryByText('Dashboard page')).not.toBeInTheDocument()
})
