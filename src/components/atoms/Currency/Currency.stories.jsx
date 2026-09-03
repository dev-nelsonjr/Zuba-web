import { Currency } from './'

export default {
  title: 'UIKit/Currency',
  component: Currency,
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#16171C', padding: 20 }}>
        <Story />
      </div>
    ),
  ],
}

export const Revenue = {
  args: { value: '1250.40' },
}

export const Expense = {
  args: { value: '-75.90' },
}

export const Empty = {
  args: { value: null },
}
