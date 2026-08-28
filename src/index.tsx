import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Theme } from '~/components/providers/Theme'
import { StorageProvider } from '~/components/providers/Storage'
import { onRehydrateAuthMiddleware } from '~/components/providers/Auth'

import * as localStorage from '~/components/providers/Storage/persistence-adapters/local-storage'

import { App } from './pages'
import './index.css'

const queryClient = new QueryClient()

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)

root.render(
  <StrictMode>
    <Theme>
      <QueryClientProvider client={queryClient}>
        <StorageProvider
          persistenceAdapter={localStorage}
          onRehydrate={onRehydrateAuthMiddleware}
        >
          <App />
        </StorageProvider>
      </QueryClientProvider>
    </Theme>
  </StrictMode>
)
