import { useStorage } from '../Storage'

export const useAuth = () => {
  const [state, setState] = useStorage()

  const signOut = () =>
    setState(prevState => ({
      ...prevState,
      auth: false,
    }))

  const signIn = auth =>
    setState(prevState => ({
      ...prevState,
      auth,
    }))

  return [state?.auth || {}, { signIn, signOut }]
}
