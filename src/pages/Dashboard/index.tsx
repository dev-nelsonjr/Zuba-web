import { useSearchParams } from 'react-router-dom'
import type { ChangeEvent } from 'react'

import styled from 'styled-components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import {
  deleteTransaction,
  getDashboard,
  updateTransaction,
} from '~/services/sdk'

import { themeGet } from '@styled-system/theme-get'
import {
  Layout,
  Transaction,
  Header,
  Box,
  Card,
  Currency,
  Icon,
  Select,
  Button,
} from '~/components'

const getCurrentPeriod = () => {
  const now = new Date()
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  }
}

const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

const Content = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
  padding: ${themeGet('space.2')}px;
  gap: ${themeGet('space.8')}px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: ${themeGet('space.4')}px;
  }
`

const AddLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${themeGet('space.0')}px;
  padding: 10px ${themeGet('space.2')}px;
  border: 1px solid ${themeGet('colors.green')};
  border-radius: ${themeGet('radii.full')};
  background: rgb(11 217 179 / 12%);
  color: ${themeGet('colors.white')};
  text-decoration: none;

  &:hover {
    background: rgb(11 217 179 / 20%);
  }
`

const AddLabel = styled('span')`
  font-size: ${themeGet('fontSizes.2')}px;

  @media (max-width: 760px) {
    display: none;
  }
`

const PeriodSelect = styled(Select)`
  border-color: ${themeGet('colors.grayscale.2')};
  border-radius: ${themeGet('radii.lg')};
  background-color: ${themeGet('colors.grayscale.1')};
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: ${themeGet('fontSizes.2')}px;
`

const DashboardState = styled(Card)`
  grid-column: 1 / -1;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${themeGet('colors.grayscale.5')};
`

const EmptyState = styled(Box)`
  padding: ${themeGet('space.6')}px ${themeGet('space.2')}px;
  text-align: center;
`

export const Dashboard = () => {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPeriod = getCurrentPeriod()
  const month = Number(searchParams.get('month')) || currentPeriod.month
  const year = Number(searchParams.get('year')) || currentPeriod.year

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['dashboard', year, month],
    queryFn: () => getDashboard({ month, year }),
  })

  const transactions = data?.docs || []

  const refreshDashboard = () =>
    queryClient.invalidateQueries({ queryKey: ['dashboard'] })

  const statusMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: refreshDashboard,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: refreshDashboard,
  })

  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ month: ev.target.value, year: String(year) })
  }

  return (
    <Layout>
      <Header icon="dash" title="Dashboard">
        <PeriodSelect
          name="month"
          aria-label="Dashboard month"
          value={month}
          onChange={onChange}
        >
          {months.map((label, index) => (
            <option key={label} value={index + 1}>
              {label}
            </option>
          ))}
        </PeriodSelect>

        <AddLink to="/transaction" aria-label="Add transaction">
          <Icon name="plus" color="green" width={18} />
          <AddLabel>New transaction</AddLabel>
        </AddLink>
      </Header>

      <Content>
        {isPending && (
          <DashboardState aria-live="polite">
            Loading dashboard...
          </DashboardState>
        )}

        {isError && (
          <DashboardState>
            <Box>
              <Box mb={3}>Unable to load your dashboard.</Box>
              <Button onClick={() => refetch()}>Try again</Button>
            </Box>
          </DashboardState>
        )}

        {!isPending && !isError && (
          <>
            <Box>
              <Card mb={6}>
                <Currency value={data?.total} fontSize={9} />
                <Box fontSize={2} color="grayscale.5">
                  Current balance
                </Box>
              </Card>
              <Card icon="graph" title="Monthly Balance">
                <Box display="flex" p={1}>
                  <Box fontSize={2} color="grayscale.5" flex={1}>
                    Income
                  </Box>
                  <Currency value={data?.revenue} />
                </Box>

                <Box display="flex" p={1}>
                  <Box fontSize={2} color="grayscale.5" flex={1}>
                    Expenses
                  </Box>
                  <Currency value={data?.expense} />
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  px={0}
                  py={3}
                  mt={3}
                  borderTopStyle="solid"
                  borderTopWidth={1}
                  borderTopColor="grayscale.1"
                >
                  <Currency value={data?.balance} color="white" />
                </Box>
              </Card>
            </Box>

            <Card title="Transactions">
              {(statusMutation.isError || deleteMutation.isError) && (
                <Box color="red" p={2} aria-live="polite">
                  Unable to complete this action. Please try again.
                </Box>
              )}

              {transactions.length > 0 ? (
                <div>
                  {transactions.map(
                    ({ id, description, value, type, dueDate, resolved }) => (
                      <Transaction
                        key={id}
                        title={description}
                        value={value}
                        type={type}
                        dueDate={dueDate}
                        resolved={resolved}
                        disabled={
                          statusMutation.isPending || deleteMutation.isPending
                        }
                        onToggle={() =>
                          statusMutation.mutate({ id, resolved: !resolved })
                        }
                        onDelete={() => deleteMutation.mutate(id)}
                      />
                    )
                  )}
                </div>
              ) : (
                <EmptyState color="grayscale.5">
                  No transactions for this month.
                </EmptyState>
              )}
            </Card>
          </>
        )}
      </Content>
    </Layout>
  )
}
