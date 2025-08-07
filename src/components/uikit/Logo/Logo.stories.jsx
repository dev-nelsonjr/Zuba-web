import React from 'react'
import { Logo } from './'

export default {
  title: 'UIKit/Logo',
  component: Logo,
  argTypes: {
    p: { control: { type: 'number', min: 0, max: 9 } },
    m: { control: { type: 'number', min: 0, max: 9 } },
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

const Template = args => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}
