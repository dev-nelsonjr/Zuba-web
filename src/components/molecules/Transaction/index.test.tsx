import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { Theme } from '~/components/providers/Theme'
import { Transaction } from '.'

test('should expose transaction actions', () => {
  const onToggle = vi.fn()
  const onDelete = vi.fn()

  render(
    <Theme>
      <Transaction
        title="Electricity bill"
        value="-75.00"
        type="expense"
        dueDate="2026-09-18T03:00:00.000Z"
        resolved={false}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </Theme>
  )

  expect(screen.getByText('Pending')).toBeInTheDocument()
  expect(screen.getByText('Due Sep 18, 2026')).toBeInTheDocument()

  fireEvent.click(
    screen.getByRole('button', {
      name: 'Mark Electricity bill as resolved',
    })
  )

  expect(onToggle).toHaveBeenCalledTimes(1)

  fireEvent.click(
    screen.getByRole('button', { name: 'Delete Electricity bill' })
  )

  expect(onDelete).toHaveBeenCalledTimes(1)
})
