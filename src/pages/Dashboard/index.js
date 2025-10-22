import * as React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { getTransactions } from '~/components/providers/Auth/transaction.js'

import { useAuth } from '~/components/providers'

import { themeGet } from '@styled-system/theme-get'
import {
  Layout,
  Transaction,
  Header,
  Box,
  Card,
  Currency,
  Icon,
} from '~/components'

const Content = styled(Box)`
  padding: ${themeGet('space.2')}px;
  gap: ${themeGet('space.8')}px;
`

export const Dashboard = () => {
  const [auth] = useAuth()
  const [data, setData] = useState([])

  const getData = async () => {
    const result = await getTransactions({ token: auth?.token })
    setData(result)
  }

  useEffect(() => {
    if (auth?.token) {
      getData()
    }
  }, [auth?.token])

  return (
    <Layout>
      <Header icon="dash" title="Dashboard">
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
            <Currency value="10.10" fontSize={9} />
            <Box fontSize={2} color="grayscale.5">
              Current balance
            </Box>
          </Card>
          <Card icon="graph" title="Monthly Balance">
            <Box display="flex" p={1}>
              <Box fontSize={2} color="grayscale.5" flex={1}>
                Income
              </Box>
              <Currency value="10.10" />
            </Box>

            <Box display="flex" p={1}>
              <Box fontSize={2} color="grayscale.5" flex={1}>
                Expanses
              </Box>
              <Currency value="-10.10" />
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
              <Currency value="10.10" color="white" />
            </Box>
          </Card>
        </Box>

        <Card icon="resume" title="transaction" flex={2 / 3}>
          <div>
            {data.map(({ id, description, value }) => (
              <Transaction key={id} title={description} value={value} />
            ))}
          </div>
        </Card>
      </Content>
    </Layout>
  )
}
