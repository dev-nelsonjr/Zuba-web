import { useSearchParams } from 'react-router-dom'
import type { ChangeEvent } from 'react'

import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { getDashboard } from '~/services/sdk'

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
  text-decoration: none;
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
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPeriod = getCurrentPeriod()
  const month = Number(searchParams.get('month')) || currentPeriod.month
  const year = Number(searchParams.get('year')) || currentPeriod.year

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['dashboard', year, month],
    queryFn: () => getDashboard({ month, year }),
  })

  const transactions = data?.docs || []

  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ month: ev.target.value, year: String(year) })
  }

  return (
    <Layout>
      <Header icon="dash" title="Dashboard">
        <Select
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
        </Select>

        <AddLink to="/transaction" aria-label="Add transaction">
          <Box
            bg="green"
            borderRadius="full"
            size={45}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Icon name="plus" color="white" width={30} />
          </Box>
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

            <Card icon="resume" title="Transactions">
              {transactions.length > 0 ? (
                <div>
                  {transactions.map(({ id, description, value }) => (
                    <Transaction key={id} title={description} value={value} />
                  ))}
                </div>
              ) : (
                <EmptyState color="grayscale.5">
                  No transactions registered for this month.
                </EmptyState>
              )}
            </Card>
          </>
        )}
      </Content>
    </Layout>
  )
}
