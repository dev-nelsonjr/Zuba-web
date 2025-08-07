import React from 'react'
import { Label } from './'

export default {
  title: 'UIKit/Label',
  component: Label,
  argTypes: {
    children: { control: 'text' },
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

const Template = args => <Label {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'label',
}
