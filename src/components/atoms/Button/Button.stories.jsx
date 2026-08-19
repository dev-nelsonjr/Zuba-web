import { Button } from './'

export default {
  title: 'UIKit/Button',
  component: Button,
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

const Template = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'click here',
}

export const Loading = Template.bind({})
Loading.args = {
  children: 'click here',
  loading: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'click here',
  disabled: true,
}
