import React from 'react'
import { Input } from './'

export default {
  title: 'UIKit/Input',
  component: Input,
  argTypes: {
    disabled: { control: 'boolean' },
    $hasError: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  decorators: [
    Story => (
      <div
        style={{
          backgroundColor: '#16171C',
          padding: '20px',
          display: 'inline-block',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

const Template = args => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'text here',
}

export const Disabled = Template.bind({})
Disabled.args = {
  placeholder: 'cannot enter text',
  disabled: true,
}

export const WithError = Template.bind({})
WithError.args = {
  placeholder: 'text here',
  value: 'invalid-email.com',
  $hasError: true,
}
