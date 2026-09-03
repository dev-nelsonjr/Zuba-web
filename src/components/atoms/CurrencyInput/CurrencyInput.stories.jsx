import { CurrencyInput } from './'

export default {
  title: 'UIKit/CurrencyInput',
  component: CurrencyInput,
  argTypes: {
    onChange: { action: 'changed' },
  },
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#16171C', padding: 20, width: 300 }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: {
    value: '42.50',
    'aria-label': 'Transaction value',
  },
}

export const Disabled = {
  args: {
    value: '42.50',
    disabled: true,
    'aria-label': 'Transaction value',
  },
}
