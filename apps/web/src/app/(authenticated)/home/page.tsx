'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Statistic, Spin } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Model.Transaction[]>([])

  useEffect(() => {
    if (userId) {
      Api.Employee.findManyByUserId(userId, { includes: ['transactions'] })
        .then(employees => {
          const allTransactions = employees.flatMap(
            employee => employee.transactions || [],
          )
          setTransactions(allTransactions)
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch transactions', { variant: 'error' })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [userId])

  const renderTransactions = () => {
    if (loading) {
      return <Spin size="large" />
    }

    if (transactions.length === 0) {
      return <Text>No transactions found</Text>
    }

    return (
      <Row gutter={[16, 16]}>
        {transactions.map(transaction => (
          <Col key={transaction.id} xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
                title="Total Price"
                value={transaction.totalPrice}
                prefix="$"
                valueStyle={{ color: '#3f8600' }}
              />
              <Text>
                {dayjs(transaction.transactionDate).format('MMMM D, YYYY')}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col>
          <Title level={2}>
            <LineChartOutlined /> Sales Trends
          </Title>
          <Paragraph>
            As an employee, you can view sales trends to analyze purchasing
            patterns.
          </Paragraph>
        </Col>
      </Row>
      {renderTransactions()}
    </PageLayout>
  )
}
