import '@testing-library/jest-dom'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import { format, subDays } from 'date-fns'

import { Theme } from '~/components'
import { Transaction } from '.'

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
        gcTime: Infinity,
      },
    },
  })

const renderTransaction = (queryClient = createQueryClient()) => ({
  queryClient,
  ...render(
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
  ),
})

const fillTransaction = () => {
  fireEvent.change(screen.getByPlaceholderText('0.00'), {
    target: { value: '100.00' },
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

test('should wait for transaction creation before returning', async () => {
  let resolveRequest!: (value: { data: { id: string } }) => void
  const request = new Promise<{ data: { id: string } }>(resolve => {
    resolveRequest = resolve
  })
  const queryClient = createQueryClient()
  const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')

  vi.mocked(axios).mockReturnValueOnce(request)
  renderTransaction(queryClient)
  fillTransaction()

  fireEvent.click(screen.getByRole('button', { name: /^save$/i }))

  await waitFor(() =>
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/transactions',
        data: {
          description: 'Test transaction',
          dueDate: expect.any(String),
          type: 'revenue',
          value: '100.00',
        },
      })
    )
  )
  expect(screen.queryByText('Dashboard page')).not.toBeInTheDocument()

  resolveRequest({ data: { id: 'transaction-id' } })

  expect(await screen.findByText('Dashboard page')).toBeInTheDocument()
  expect(invalidateQueries).toHaveBeenCalledWith({
    queryKey: ['dashboard'],
  })
})

test('should remain on form when adding another transaction', async () => {
  renderTransaction()
  fillTransaction()

  fireEvent.click(screen.getByRole('button', { name: /save and add another/i }))

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

test('should keep form values and show error when transaction fails', async () => {
  vi.mocked(axios).mockRejectedValueOnce(new Error('Request failed'))
  renderTransaction()
  fillTransaction()

  fireEvent.click(screen.getByRole('button', { name: /^save$/i }))

  expect(
    await screen.findByText(
      'Unable to save the transaction. Check the fields and try again.'
    )
  ).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Describe the transaction')).toHaveValue(
    'Test transaction'
  )
  expect(screen.queryByText('Dashboard page')).not.toBeInTheDocument()
})

test("should use today's date by default", () => {
  renderTransaction()

  const dueDate = screen.getByLabelText('Due date')

  expect(dueDate).toHaveAttribute('type', 'date')
  expect(dueDate).toHaveAttribute('min', format(new Date(), 'yyyy-MM-dd'))
  expect(dueDate).toHaveValue(format(new Date(), 'yyyy-MM-dd'))
})

test('should reject a past due date', async () => {
  renderTransaction()
  fillTransaction()

  const dueDate = screen.getByLabelText('Due date')
  fireEvent.change(dueDate, {
    target: { value: format(subDays(new Date(), 1), 'yyyy-MM-dd') },
  })
  fireEvent.blur(dueDate)

  expect(
    await screen.findByText('Due date cannot be in the past')
  ).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /^save$/i })).toBeDisabled()
  expect(axios).not.toHaveBeenCalled()
})
