import { request } from '../request'
import { parse, formatISO } from 'date-fns'

export const getDashboard = async params => {
  try {
    const res = await request({
      method: 'GET',
      url: '/dashboard',
      params,
    })

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
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

export const saveTransactions = async ({ dueDate, ...data }) => {
  try {
    const response = await request({
      method: 'POST',
      url: '/transactions',
      data: {
        ...data,
        ...(dueDate && {
          dueDate: formatISO(parse(dueDate, 'MM/dd/yyyy', new Date())),
        }),
      },
    })

    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
