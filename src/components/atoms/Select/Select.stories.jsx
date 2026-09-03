import { Select } from './'

export default {
  title: 'UIKit/Select',
  component: Select,
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#16171C', padding: 20 }}>
        <Story />
      </div>
    ),
  ],
}

const children = (
  <>
    <option value="expense">Expense</option>
    <option value="revenue">Revenue</option>
  </>
)

export const Default = {
  args: {
    defaultValue: 'expense',
    children,
  },
}

export const WithError = {
  args: {
    defaultValue: 'expense',
    children,
    $hasError: true,
  },
}
