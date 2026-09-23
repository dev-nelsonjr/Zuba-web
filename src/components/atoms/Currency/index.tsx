import { toMoney } from 'vanilla-masker'
import { Box, type BoxProps } from '~/components/atoms/Box'

export type CurrencyValue = string | number | null | undefined

export type CurrencyProps = BoxProps & {
  value: CurrencyValue
}

export const Currency = ({ value, color, ...props }: CurrencyProps) => {
  const numberValue = Number(value || 0)
  const moneyValue = Math.abs(numberValue).toFixed(2).replace('.', '')

  return (
    <Box {...props} color={color || (numberValue < 0 ? 'red' : 'green')}>
      {toMoney(moneyValue, { unit: numberValue < 0 ? '-$' : '$' })}
    </Box>
  )
}
