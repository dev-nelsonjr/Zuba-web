import axios from 'axios'

const endpoints = {
  production: 'http://api.zuba',
  development: 'http://dev.zuba',
  staging: 'http://stg.zuba',
}

export const baseURL =
  endpoints?.[process.env.API_ENV] ||
  process.env.CUSTOM_URL ||
  endpoints.production

const fetch = ({ method, url, data, ...config }) =>
  axios[method](`${baseURL}${url}`, data, config)

export const login = async ({ email, password }) => {
  try {
    const res = await fetch({
      method: 'post',
      url: '/login',
      data: null,
      auth: { username: email, password },
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
