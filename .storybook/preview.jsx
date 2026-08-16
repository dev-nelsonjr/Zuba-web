import { Theme } from '../src/components/providers/Theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
}

export const decorators = [
  Story => (
    <Theme>
      <div>
        <Story />
      </div>
    </Theme>
  ),
]
