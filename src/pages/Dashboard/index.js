import * as React from 'react'

import { useAuth } from '../../components/Modules'

export const Dashboard = () => {
  const [auth, { SignOut }] = useAuth()
  return (
  <div>
    Hello {auth.user.name}! <button onClick={SignOut}> Sign out </button>
  </div>
  )
}
