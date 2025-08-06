import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { useAuth } from './../components/Modules/Auth'

import { SignUp } from './SignUp'
import { SignIn } from './SignIn'
import { Dashboard } from './Dashboard'

const AuthRoutes = () => (
  <>
    <Route path="/" exact>
      <SignIn />
    </Route>

    <Route path="/signup">
      <SignUp />
    </Route>
  </>
)

const LoggedInRoutes = () => (
  <Route path="/" exact>
    <Dashboard />
  </Route>
)

export const App = () => {
  const [auth] = useAuth()

  return <Router>{auth?.user ? <LoggedInRoutes /> : <AuthRoutes />}</Router>
}
