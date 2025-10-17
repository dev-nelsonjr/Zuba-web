import * as React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getTransactions } from '~/components/providers/Auth/transaction.js'

import { useAuth } from '~/components/providers'

import { themeGet } from '@styled-system/theme-get'
import { Layout, Transaction, Header, Box, Card } from '~/components'

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
      <Header icon="dash" title="Dashboard" />

      <Content display="flex">
        <Box flex={1 / 2}>
          <Card mb={6}> account balance </Card>
          <Card icon="graph" title="Monthly Balance" />
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
