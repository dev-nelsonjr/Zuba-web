import * as React from 'react'
import { Input } from '../Input'
import { toMoney } from 'vanilla-masker'

export const CurrencyInput = ({ value, onChange, ...props }) => {
  const handleChange = ev => {
    const value = ev.target.value.replace('$', '')
    onChange(value ? `${value}` : '0.00')
  }

  return (
    <Input
      {...props}
      value={toMoney(value, { unit: '$' })}
      onChange={handleChange}
    />
  )
}
