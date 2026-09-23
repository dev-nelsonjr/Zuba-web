import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Theme } from '~/components/providers/Theme'
import { Currency } from '.'

test('should show the negative sign for an expense', () => {
  render(
    <Theme>
      <Currency value="-75.90" />
    </Theme>
  )

  expect(screen.getByText('-$ 75,90')).toBeInTheDocument()
})
