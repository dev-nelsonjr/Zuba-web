import { Card } from './'
import { Currency } from '../Currency'

export default {
  title: 'UIKit/Card',
  component: Card,
  argTypes: {
    icon: {
      control: 'select',
      options: ['dash', 'graph', 'menu', 'resume', 'logout', 'plus'],
    },
    title: { control: 'text' },
  },
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#16171C', padding: 20, width: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: {
    icon: 'graph',
    title: 'Monthly balance',
    children: <Currency value="1250.40" />,
  },
}
