import { Field } from './'

export default {
  title: 'UIKit/Field',
  component: Field,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'number'],
      },
    },
  },
  decorators: [
    Story => (
      <div
        style={{ backgroundColor: '#16171C', padding: '20px', width: '300px' }}
      >
        <Story />
      </div>
    ),
  ],
}

const Template = args => <Field {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'default-field',
  label: 'default',
  placeholder: 'put some value here',
}

export const WithValue = Template.bind({})
WithValue.args = {
  name: 'value-field',
  label: 'field with value',
  value: 'pre-filled value',
}

export const WithError = Template.bind({})
WithError.args = {
  name: 'error-field',
  label: 'field with error',
  value: 'invalid value',
  error: 'this field has an error',
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: 'disabled-field',
  label: 'disabled Field',
  placeholder: 'disabled',
  disabled: true,
}
