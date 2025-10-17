const baseColors = {
  black: '#0f0f0f',
  white: '#fafafa',
  red: '#FF647C',
  green: '#0BD9B3',
  blue: '#487FD9',
  yellow: '#EBC455',
  gray: '#A0A2AE',
}

const grayscale = [
  baseColors.black,
  `#2d2d2d`,
  `#4a4a4a`,
  `#686868`,
  `#858585`,
  `#a3a3a3`,
  `#c0c0c0`,
  `#dddddd`,
  baseColors.white,
]

const brandColors = {
  raisinBlack: '#16171C',
  caribbeanGreen: baseColors.green,
}

const colors = {
  ...baseColors,
  ...brandColors,
  grayscale,
}

const fontSizes = [10, 12, 14, 16, 18, 21, 24, 27, 30, 36, 42, 48]
const space = [4, 12, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64]

export const definitions = {
  colors,
  fontSizes,
  space,
}
