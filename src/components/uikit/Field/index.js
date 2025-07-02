import * as React from 'react'

import { Box } from '../Box'
import { Label } from '../Label'
import { Input } from '../Input'

export const Field = ({ type = "text", name, label, disabled, value, onChange, ...props }) => (
  <Box {...props} flexbox="column">
    <Label htmlFor={name}>{label}</Label>
    <Input
      type={type}
      name={name}
      id={name}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
    />
  </Box>
)
