import axios, { type AxiosRequestConfig } from 'axios'

const endpoints = {
  production: 'http://api.zuba',
  development: 'http://dev.zuba',
  staging: 'http://stg.zuba',
}

export const baseURL =
  endpoints[process.env.REACT_APP_API_ENV as keyof typeof endpoints] ||
  process.env.REACT_APP_CUSTOM_URL ||
  endpoints.production

const auth: { token?: string | false } = {}

export const setToken = (token: string | false) => {
  auth.token = token
}

export const request = <ResponseData = unknown>(params: AxiosRequestConfig) =>
  axios<ResponseData>({
    baseURL,
    ...params,
    headers: {
      ...params.headers,
      ...(auth.token && {
        Authorization: `Bearer ${auth.token}`,
      }),
    },
  })
