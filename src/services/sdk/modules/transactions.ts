import { request } from '../request'
import { parse, formatISO } from 'date-fns'

export type TransactionType = 'revenue' | 'expense'

export type Transaction = {
  id: string
  userId: string
  description: string
  value: string
  dueDate: string | null
  type: TransactionType | null
  resolved: boolean
}

export type DashboardPeriod = {
  month: number
  year: number
}

export type Dashboard = {
  total: string | number | null
  revenue: string | number
  expense: string | number
  balance: number
  docs: Transaction[]
}

export type TransactionData = {
  type: TransactionType
  value: string
  description: string
  dueDate?: string
}

export const getDashboard = async (params: DashboardPeriod) => {
  const response = await request<Dashboard>({
    method: 'GET',
    url: '/dashboard',
    params,
  })

  return response.data
}

export const saveTransaction = async ({
  dueDate,
  ...data
}: TransactionData) => {
  const response = await request<Transaction>({
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
}
