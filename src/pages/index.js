import * as React from 'react'
import { useState, useEffect } from 'react'
import { Theme } from './../components/Theme'

// import { SignUp } from './Signup'
import { SingIn } from './Singin'

const Dashboard = ({onSingOut}) =>{
return( <div>Login Successfull <button onClick={onSingOut}>Sing out</button> </div> )
}

export const App = () => {
  const [state, setState] = useState(() => {
    const data = window.localStorage.getItem('auth')
    return data && JSON.parse(data)
  })

  const SingOut = () => setState(false)

  useEffect(() => {
    window.localStorage.setItem('auth', state && JSON.stringify(state))
  }, [state])

  return (
    <Theme>
    { state?.user ? <Dashboard onSingOut={SingOut} /> : < SingIn onSuccess={setState} />  }
    </Theme>
  )
}
