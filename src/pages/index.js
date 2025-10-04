import * as React from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { useAuth } from '../components/providers/Auth'

import { SignUp } from './SignUp'
import { SignIn } from './Login'
import { Dashboard } from './Dashboard'
import { Transaction } from './Transaction'

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
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

  return <Router>{auth?.token ? <LoggedInRoutes /> : <AuthRoutes />}</Router>
}
