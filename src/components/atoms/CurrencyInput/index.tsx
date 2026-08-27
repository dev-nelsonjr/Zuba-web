import type { ChangeEvent, ReactNode } from 'react'
import { Input, type InputProps } from '../Input'
import { toMoney } from 'vanilla-masker'

export type CurrencyInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  value: string | number
  onChange: (value: string) => void
  error?: ReactNode
}

export const CurrencyInput = ({
  value,
  onChange,
  error: _error,
  ...props
}: CurrencyInputProps) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
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
