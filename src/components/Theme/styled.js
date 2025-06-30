export const theme = prop => value => props => props.theme[prop][value] || value
export const th = {
  space: theme('spaces'),
  size: theme('fontSizes'),
  color: theme('colors'),
}

export const flexbox = props => {
  const direction = typeof props.flexbox === 'string' ? props.flexbox : undefined

  const justifyContent = props.justifyContent || (props.center && 'center' )
  const alignItems = props.alignItems || (props.center && 'center' )

  return `
    ${props.flex ? `flex: ${props.flex};` : ''}
    ${props.flexbox && `display: flex;`}
    ${direction ? `flex-direction: ${direction};` : ''}
    ${justifyContent ? `justify-content: ${justifyContent};` : ''}
    ${alignItems ? `align-items: ${alignItems};` : ''}
  `
}

export const background = props =>
  props.bg && `background: ${props.theme.colors[props.bg]};`

export const color = props =>
  props.color && `color: ${props.theme.colors[props.color] || props.color};`

export const fontSize = props =>
  props.fontSize && `font-size: ${props.theme.fontSizes[props.fontSize]};`

export const padding = props =>
  props.p && `padding: ${props.theme.spaces[props.p]}px;`

export const margin = props => {
  const mb = props.mb ?? props.my ?? props.m
  const mt = props.mt ?? props.my ?? props.m
  const ml = props.ml ?? props.mx ?? props.m
  const mr = props.mr ?? props.mx ?? props.m

  return `
    ${mb !== undefined ? `margin-bottom: ${props.theme.spaces[mb]}px;` : ''}
    ${mt !== undefined ? `margin-top: ${props.theme.spaces[mt]}px;` : ''}
    ${ml !== undefined ? `margin-left: ${props.theme.spaces[ml]}px;` : ''}
    ${mr !== undefined ? `margin-right: ${props.theme.spaces[mr]}px;` : ''}
  `
}


