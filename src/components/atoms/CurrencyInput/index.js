import * as React from 'react'
import { Input } from '../Input'
import { toMoney } from 'vanilla-masker'

export const CurrencyInput = ({ value, onChange, ...props }) => {
  const handleChange = ev => {
    const value = ev.target.value.replace('R$', '').replace(',', '.').trim()
    const currency = toMoney(value, { unit: 'R$', precision: 2 })
    const newValue = currency.replace('R$', '').replace(',', '.').trim()

    onChange(newValue ? `${newValue}` : '0.00')
  }

  return (
    <Input
      {...props}
      value={toMoney(value, { unit: '$', precision: 2 })}
      onChange={handleChange}
    />
  )
}
