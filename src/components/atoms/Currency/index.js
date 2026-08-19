import { toMoney } from 'vanilla-masker'
import { Box } from '~/components/atoms/Box'

export const Currency = ({ value, color, ...props }) => {
  const moneyValue = Number(value || 0)
    .toFixed(2)
    .replace('.', '')

  return (
    <Box {...props} color={color || (value < 0 ? 'red' : 'green')}>
      {toMoney(moneyValue, { unit: '$' })}
    </Box>
  )
}
