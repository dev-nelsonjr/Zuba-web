import * as React from 'react'
import ReactDOM from 'react-dom'

import { Theme } from '~/components/Theme'
import { StorageProvider } from '~/components/Modules/Storage'
import { onRehydrateAuthMiddleware } from '~/components/Modules/Auth'

import * as localStorage from '~/components/Modules/Storage/persistence-adapters/local-storage'

import reportWebVitals from './reportWebVitals'
import { App } from './pages'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <StorageProvider
        persistenceAdapter={localStorage}
        onRehydrate={onRehydrateAuthMiddleware}
      >
        <App />
      </StorageProvider>
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
