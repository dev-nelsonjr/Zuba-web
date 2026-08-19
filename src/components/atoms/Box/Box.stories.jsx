import { Box } from './'

export default {
  title: 'UIKit/Box',
  component: Box,
  argTypes: {
    p: { control: { type: 'number', min: 0, max: 9 } },
    m: { control: { type: 'number', min: 0, max: 9 } },
    bg: { control: 'text' },
    color: { control: 'text' },
    flexbox: { control: 'text' },
    center: { control: 'boolean' },
    children: { control: 'text' },
  },
}

const Template = args => <Box {...args} />

export const Default = Template.bind({})
Default.args = {
  p: 4,
  bg: 'blue',
  color: 'white',
  children: 'Box.',
}

export const Flexbox = Template.bind({})
Flexbox.args = {
  p: 4,
  bg: 'green',
  color: 'black',
  flexbox: 'column',
  center: true,
  children: 'box to align items',
}
