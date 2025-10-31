import { request } from '~/services/sdk'
import { parse, formatISO } from 'date-fns'

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
