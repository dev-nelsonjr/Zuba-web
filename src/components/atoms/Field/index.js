import styled from 'styled-components'

import { themeGet } from '@styled-system/theme-get'

import { Box } from '../Box'
import { Label } from '../Label'
import { Input } from '../Input'

const ErrorMessage = styled(Box)`
  color: ${themeGet('colors.red')};
  padding: ${themeGet('space.1')}px ${themeGet('space.3')}px;
  font-size: ${themeGet('fontSizes.2')}px;
`

export const Field = ({
  type,
  name,
  label,
  placeholder,
  error,
  disabled,
  value,
  onChange,
  onBlur,
  ...props
}) => (
  <Box {...props} display="flex" flexDirection="column">
    <Label htmlFor={name}>{label}</Label>
    <Input
      type={type}
      name={name}
      id={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      $hasError={!!error}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Box>
)
