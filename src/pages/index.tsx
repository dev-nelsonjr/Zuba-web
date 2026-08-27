import * as React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useAuth } from '../components/providers/Auth'

import { Login } from './Login'

const SignUp = React.lazy(() =>
  import('./SignUp').then(module => ({ default: module.SignUp }))
)
const Dashboard = React.lazy(() =>
  import('./Dashboard').then(module => ({ default: module.Dashboard }))
)
const Transaction = React.lazy(() =>
  import('./Transaction').then(module => ({ default: module.Transaction }))
)

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

const LoggedInRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/transaction" element={<Transaction />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export const App = () => {
  const [auth] = useAuth()
  const isAuthenticated = 'token' in auth && Boolean(auth.token)

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        {isAuthenticated ? <LoggedInRoutes /> : <AuthRoutes />}
      </React.Suspense>
    </BrowserRouter>
  )
}
