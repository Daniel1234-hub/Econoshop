'use client'

import { useEffect, useState } from 'react'
import { Typography, Table, Button, Modal, Form, Input, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CustomersPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [customers, setCustomers] = useState<Model.Customer[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState<Model.Customer | null>(
    null,
  )
  const [form] = Form.useForm()

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const customersFound = await Api.Customer.findMany()
      setCustomers(customersFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch customers', { variant: 'error' })
    }
  }

  const handleAddCustomer = () => {
    setIsEditMode(false)
    setCurrentCustomer(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditCustomer = (customer: Model.Customer) => {
    setIsEditMode(true)
    setCurrentCustomer(customer)
    form.setFieldsValue(customer)
    setIsModalVisible(true)
  }

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await Api.Customer.deleteOne(customerId)
      enqueueSnackbar('Customer deleted successfully', { variant: 'success' })
      fetchCustomers()
    } catch (error) {
      enqueueSnackbar('Failed to delete customer', { variant: 'error' })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (isEditMode && currentCustomer) {
        await Api.Customer.updateOne(currentCustomer.id, values)
        enqueueSnackbar('Customer updated successfully', { variant: 'success' })
      } else {
        await Api.Customer.createOne(values)
        enqueueSnackbar('Customer added successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      fetchCustomers()
    } catch (error) {
      enqueueSnackbar('Failed to save customer', { variant: 'error' })
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Information',
      dataIndex: 'contactInformation',
      key: 'contactInformation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Model.Customer) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCustomer(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCustomer(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Customer Management</Title>
      <Text>
        Manage customer information by adding, editing, or deleting customers.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddCustomer}
        style={{ margin: '20px 0' }}
      >
        Add Customer
      </Button>
      <Table dataSource={customers} columns={columns} rowKey="id" />
      <Modal
        title={isEditMode ? 'Edit Customer' : 'Add Customer'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please input the customer name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="contactInformation" label="Contact Information">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
