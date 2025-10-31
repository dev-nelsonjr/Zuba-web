import axios from 'axios'

const endpoints = {
  production: 'http://api.zuba',
  development: 'http://dev.zuba',
  staging: 'http://stg.zuba',
}

export const baseURL =
  endpoints[process.env.REACT_APP_API_ENV] ||
  process.env.REACT_APP_CUSTOM_URL ||
  endpoints.production

const auth = {}

export const setToken = token => {
  auth.token = token
}

export const request = params =>
  axios({
    baseURL,
    ...params,
    headers: {
      ...params.headers,
      ...(auth.token && {
        Authorization: `Bearer ${auth.token}`,
      }),
    },
  })

export const login = async ({ email, password }) => {
  const response = await request({
    method: 'POST',
    url: '/login',
    auth: {
      username: email,
      password,
    },
  })

  return response.data
}

export const signup = async ({ email, password }) => {
  const response = await request({
    method: 'POST',
    url: '/signup',
    data: {
      email,
      password,
    },
  })

  return response.data
}

export const getBalance = async params => {
  try {
    const res = await request({
      method: 'GET',
      url: '/balance',
      params,
    })

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getTransactions = async params => {
  try {
    const res = await request({
      method: 'GET',
      url: '/transactions',
      params,
    })

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
