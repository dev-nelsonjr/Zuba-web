import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('axios', () => ({
  default: vi.fn(),
}))

global.jest = vi
