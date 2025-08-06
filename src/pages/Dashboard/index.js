import * as React from 'react'

import { useAuth } from '../../components/Modules'

export const Dashboard = () => {
  const [auth, { signOut }] = useAuth()
  return (
    <div>
      Hello <strong>{auth.user.name}</strong> !{' '}
      <button onClick={signOut}> Sign out </button>
    </div>
  )
}
