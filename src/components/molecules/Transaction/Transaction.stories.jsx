import { Transaction } from './'

export default {
  title: 'Components/Transaction',
  component: Transaction,
  argTypes: {
    onToggle: { action: 'toggled' },
    onDelete: { action: 'deleted' },
  },
  decorators: [
    Story => (
      <div
        style={{
          backgroundColor: '#0f0f0f',
          color: '#fafafa',
          padding: 20,
          width: 420,
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export const PendingExpense = {
  args: {
    title: 'Electricity bill',
    value: '-75.90',
    type: 'expense',
    resolved: false,
  },
}

export const ReceivedRevenue = {
  args: {
    title: 'Salary',
    value: '2500.00',
    type: 'revenue',
    resolved: true,
  },
}

export const Loading = {
  args: {
    title: 'Internet bill',
    value: '-89.90',
    type: 'expense',
    resolved: false,
    disabled: true,
  },
}
