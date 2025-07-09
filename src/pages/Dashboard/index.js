import * as React from 'react'

import { useAuth } from '../../components/Modules'

export const Dashboard = () => {
  const [auth, { SignOut }] = useAuth()
  return (
  <div>
    Hello <strong>{auth.user.name}</strong> ! <button onClick={SignOut}> Sign out </button>
  </div>
  )
}
