import * as React from 'react'
import { useSearchParams } from 'react-router-dom'

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
} from '~/components'

const getCurrentMonth = () => {
  const now = new Date()
  return now.getMonth() + 1
}

const Content = styled(Box)`
  padding: ${themeGet('space.2')}px;
  gap: ${themeGet('space.8')}px;
`

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const month = searchParams.get('month') || getCurrentMonth()

  const { data } = useQuery({
    queryKey: ['dashboard', month],
    queryFn: () => getDashboard({ month }),
  })

  const onChange = ev => {
    setSearchParams({ month: ev.target.value })
  }

  return (
    <Layout>
      <Header icon="dash" title="Dashboard">
        {month}
        <Select name="month" onChange={onChange}>
          <option value={1} selected={month === '1'}>
            JAN
          </option>
          <option value={2} selected={month === '2'}>
            FEB
          </option>
          <option value={3} selected={month === '3'}>
            MAR
          </option>
          <option value={4} selected={month === '4'}>
            APR
          </option>
          <option value={5} selected={month === '5'}>
            MAY
          </option>
          <option value={6} selected={month === '6'}>
            JUN
          </option>
          <option value={7} selected={month === '7'}>
            JUL
          </option>
          <option value={8} selected={month === '8'}>
            AUG
          </option>
          <option value={9} selected={month === '9'}>
            SEP
          </option>
          <option value={10} selected={month === '10'}>
            OCT
          </option>
          <option value={11} selected={month === '11'}>
            NOV
          </option>
          <option value={12} selected={month === '12'}>
            DEC
          </option>
        </Select>

        <Link to="/transaction">
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
        </Link>
      </Header>

      <Content display="flex">
        <Box flex={1 / 2}>
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
                Expanses
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

        <Card icon="resume" title="transaction" flex={2 / 3}>
          <div>
            {data?.docs?.map(({ id, description, value }) => (
              <Transaction key={id} title={description} value={value} />
            ))}
          </div>
        </Card>
      </Content>
    </Layout>
  )
}
