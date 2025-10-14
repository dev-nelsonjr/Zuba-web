import * as React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { getTransactions } from '~/components/providers/Auth/transaction.js'

import { useAuth } from '~/components/providers'

import { themeGet } from '@styled-system/theme-get'
import { Layout, Transaction, Header } from '../../components/molecules/'

const Section = styled('section')`
  background: ${themeGet('colors.black')};
  border-radius: ${themeGet('space.1')}px;
`

const SectionHeader = styled('div')`
  display: flex;
`

const SectionTitle = styled('h2')`
  flex: 1;
  font-size: ${themeGet('fontSizes.2')}px;
  margin: 0;
  font-weight: 400;
  padding: ${themeGet('space.2')}px;
`

const AddButton = styled(Link)`
  background: #a0a2ae;
  border-radius: 0 ${themeGet('space.1')}px 0 ${themeGet('space.1')}px;
  border: 0;
  font-size: ${themeGet('fontSizes.3')}px;
  padding: ${themeGet('space.2')}px ${themeGet('space.4')}px;
  text-decoration: none,
  color: ${themeGet('colors.black')};
`

const TransactionsList = styled('div')`
  padding: ${themeGet('space.2')}px;
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

      <Section>
        <SectionHeader>
          <SectionTitle>Transactions</SectionTitle>
          <AddButton to="/transaction">+</AddButton>
        </SectionHeader>

        <TransactionsList>
          {data.map(({ id, description, value }) => (
            <Transaction key={id} title={description} value={value} />
          ))}
        </TransactionsList>
      </Section>
    </Layout>
  )
}
