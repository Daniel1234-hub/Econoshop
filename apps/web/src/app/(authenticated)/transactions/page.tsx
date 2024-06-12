'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd'
import { PlusOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TransactionsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [transactions, setTransactions] = useState<Model.Transaction[]>([])
  const [employees, setEmployees] = useState<Model.Employee[]>([])
  const [customers, setCustomers] = useState<Model.Customer[]>([])
  const [products, setProducts] = useState<Model.Product[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await Api.Transaction.findMany({
          includes: ['employee', 'customer', 'transactionProducts'],
        })
        const employees = await Api.Employee.findMany()
        const customers = await Api.Customer.findMany()
        const products = await Api.Product.findMany()
        setTransactions(transactions)
        setEmployees(employees)
        setCustomers(customers)
        setProducts(products)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }
    fetchData()
  }, [])

  const handleAddTransaction = async (values: any) => {
    try {
      const transaction = await Api.Transaction.createOneByEmployeeId(userId, {
        totalPrice: values.totalPrice,
        transactionDate: values.transactionDate.format('YYYY-MM-DD'),
        customerId: values.customerId,
        employeeId: values.employeeId,
      })
      await Promise.all(
        values.products.map((product: any) =>
          Api.TransactionProduct.createOneByTransactionId(transaction.id, {
            productId: product.productId,
            quantity: product.quantity,
            price: product.price,
          }),
        ),
      )
      setTransactions([...transactions, transaction])
      setIsModalVisible(false)
      form.resetFields()
      enqueueSnackbar('Transaction added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add transaction', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Employee',
      dataIndex: ['employee', 'name'],
      key: 'employee',
    },
    {
      title: 'Customer',
      dataIndex: ['customer', 'name'],
      key: 'customer',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Model.Transaction) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => router.push(`/transactions/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Transactions</Title>
      <Text>
        Monitor sales and purchases, add new transactions, and view transaction
        details.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ margin: '20px 0' }}
      >
        Add Transaction
      </Button>
      <Table dataSource={transactions} columns={columns} rowKey="id" />

      <Modal
        title="Add New Transaction"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTransaction}>
          <Form.Item
            name="transactionDate"
            label="Transaction Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="totalPrice"
            label="Total Price"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="employeeId"
            label="Employee"
            rules={[{ required: true }]}
          >
            <Select>
              {employees.map(employee => (
                <Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="customerId"
            label="Customer"
            rules={[{ required: true }]}
          >
            <Select>
              {customers.map(customer => (
                <Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="products">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'productId']}
                      fieldKey={[fieldKey, 'productId']}
                      rules={[{ required: true, message: 'Missing product' }]}
                    >
                      <Select placeholder="Select product">
                        {products.map(product => (
                          <Option key={product.id} value={product.id}>
                            {product.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      fieldKey={[fieldKey, 'quantity']}
                      rules={[{ required: true, message: 'Missing quantity' }]}
                    >
                      <Input placeholder="Quantity" type="number" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <Input placeholder="Price" type="number" />
                    </Form.Item>
                    <Button
                      type="link"
                      onClick={() => remove(name)}
                      icon={<UserOutlined />}
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Product
                </Button>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
