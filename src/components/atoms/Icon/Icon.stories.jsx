import { Icon } from './'

export default {
  title: 'UIKit/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: ['dash', 'graph', 'menu', 'resume', 'logout', 'plus'],
    },
    color: { control: 'text' },
    width: { control: 'number' },
  },
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#16171C', padding: 20 }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: {
    name: 'graph',
    color: 'green',
    width: 36,
  },
}
