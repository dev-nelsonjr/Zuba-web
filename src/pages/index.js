import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useAuth } from './../components/Modules'

import { SignUp } from './SignUp'
import { SignIn } from './SignIn'
import { Dashboard } from './Dashboard'

const AuthRoutes = () => (
  <Routes>
    <Route path='/'  element={ <SignIn /> } />
    <Route path='/signup' element={ <SignUp /> } />
  </Routes>
)

const LoggedInRoutes = () => (
  <Routes>
    <Route path='/' element={<Dashboard />} />
  </Routes>
)

export const App = () => {
  const [auth] = useAuth()
  return (
      <Router>
        {auth?.user ? <LoggedInRoutes /> : <AuthRoutes /> }
      </Router>
  )
}
