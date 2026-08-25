import { request } from '../request'

export type Credentials = {
  email: string
  password: string
}

export type SignupData = Credentials & {
  name: string
}

export type User = {
  id: string
  name: string | null
  email: string
  firebaseToken: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type AuthResponse = {
  user: User
  token: string
}

export const login = async ({ email, password }: Credentials) => {
  const response = await request<AuthResponse>({
    method: 'POST',
    url: '/login',
    auth: {
      username: email,
      password,
    },
  })

  return response.data
}

export const signup = async ({ name, email, password }: SignupData) => {
  const response = await request<AuthResponse>({
    method: 'POST',
    url: '/signup',
    data: {
      name,
      email,
      password,
    },
  })

  return response.data
}
