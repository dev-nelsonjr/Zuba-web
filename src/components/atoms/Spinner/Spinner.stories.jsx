import { Spinner } from './'

export default {
  title: 'UIKit/Spinner',
  component: Spinner,
  decorators: [
    Story => (
      <div
        style={{
          color: 'white',
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

const Template = args => <Spinner {...args} />

export const Default = Template.bind({})
Default.args = {}
