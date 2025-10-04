import * as React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { getTransactions } from '~/components/Modules/Auth/transaction.js'

import { th } from '../../components/Theme'
import { Logo } from '../../components'
import { Transaction } from '../../components/system/Transaction/'

import { useAuth } from '~/components/Modules'

const Container = styled('div')`
  flex: 1;
  display: flex;
`
const Menu = styled('aside')`
  background: ${th.color('black')};
  padding: ${th.space(2)}px;
`

const Main = styled('main')`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
`

const Layout = ({ children }) => (
  <Container>
    <Menu>
      <Logo height={50} onlyIcon />
    </Menu>
    <Main>{children}</Main>
  </Container>
)

const Section = styled('section')`
  background: ${th.color('black')};
  border-radius: ${th.space(1)}px;
`

const SectionHeader = styled('div')`
  display: flex;
`

const SectionTitle = styled('h2')`
  flex: 1;
  font-size: ${th.size(2)}px;
  margin: 0;
  font-weight: 400;
  padding: ${th.space(2)}px;
`

const AddButton = styled(Link)`
  background: #a0a2ae;
  border-radius: 0 ${th.space(1)}px 0 ${th.space(1)}px;
  border: 0;
  font-size: ${th.size(3)}px;
  padding: ${th.space(2)}px ${th.space(4)}px;
  text-decoration: none,
  color: ${th.color('black')};
`

const TransactionsList = styled('div')`
  padding: ${th.space(2)}px;
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
      <h1>Dashboard</h1>
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
