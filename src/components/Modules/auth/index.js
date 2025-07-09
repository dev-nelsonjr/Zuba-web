import { useContext, useState, useEffect, createContext } from 'react'

const AuthContext = createContext([{}, () => {}])

export const useAuth = () => {
  const [state, setState] = useContext (AuthContext)
  const SignOut = () => setState(false)
  return [state, { SignIn: setState, SignOut }]
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const data = window.localStorage.getItem('auth')
    return data && JSON.parse(data)
  })
   useEffect(() => {
    window.localStorage.setItem('auth', state && JSON.stringify(state))
  }, [state])

  return <AuthContext.Provider value={[state, setState]}>
    {children}
    </AuthContext.Provider>
}

