import axios from 'axios'

const endpoints = {
  production: 'http://api.zuba',
  development: 'http://dev.zuba',
  staging: 'http://stg.zuba',
}

export const baseURL =
  endpoints?.[process.env.REACT_APP_API_ENV] ||
  process.env.REACT_APP_CUSTOM_URL ||
  endpoints.production

const fetch = params =>
  axios({
    baseURL,
    ...params,
  })

export const login = async ({ email, password }) => {
  try {
    const res = await fetch({
      method: 'post',
      url: '/login',
      auth: { username: email, password },
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const signUp = async data => {
  try {
    const res = await fetch({
      method: 'post',
      url: '/signup',
      data,
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
