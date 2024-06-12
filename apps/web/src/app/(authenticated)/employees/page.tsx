'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Typography,
  Popconfirm,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EmployeesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [employees, setEmployees] = useState<Model.Employee[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Model.Employee | null>(
    null,
  )
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchEmployees()
    }
  }, [userId])

  const fetchEmployees = async () => {
    try {
      const employeesFound = await Api.Employee.findManyByUserId(userId, {
        includes: ['user'],
      })
      setEmployees(employeesFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch employees', { variant: 'error' })
    }
  }

  const handleAdd = () => {
    setIsModalVisible(true)
    setIsEditing(false)
    form.resetFields()
  }

  const handleEdit = (employee: Model.Employee) => {
    setIsModalVisible(true)
    setIsEditing(true)
    setEditingEmployee(employee)
    form.setFieldsValue(employee)
  }

  const handleDelete = async (employeeId: string) => {
    try {
      await Api.Employee.deleteOne(employeeId)
      enqueueSnackbar('Employee deleted successfully', { variant: 'success' })
      fetchEmployees()
    } catch (error) {
      enqueueSnackbar('Failed to delete employee', { variant: 'error' })
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (isEditing && editingEmployee) {
        await Api.Employee.updateOne(editingEmployee.id, values)
        enqueueSnackbar('Employee updated successfully', { variant: 'success' })
      } else {
        await Api.Employee.createOneByUserId(userId, values)
        enqueueSnackbar('Employee added successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      fetchEmployees()
    } catch (error) {
      enqueueSnackbar('Failed to save employee', { variant: 'error' })
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Model.Employee) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Employee Management</Title>
      <Text>
        Manage your employees here. You can add, edit, or delete employees as
        needed.
      </Text>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Employee
        </Button>
      </Space>
      <Table dataSource={employees} columns={columns} rowKey="id" />
      <Modal
        title={isEditing ? 'Edit Employee' : 'Add Employee'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Input />
          </Form.Item>
          {!isEditing && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input the password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </PageLayout>
  )
}
