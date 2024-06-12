'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
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

export default function SuppliersPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [suppliers, setSuppliers] = useState<Model.Supplier[]>([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Model.Supplier | null>(
    null,
  )
  const [form] = Form.useForm()

  const fetchSuppliers = async () => {
    setLoading(true)
    try {
      const suppliersFound = await Api.Supplier.findMany()
      setSuppliers(suppliersFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch suppliers', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (values: Partial<Model.Supplier>) => {
    try {
      const supplierCreated = await Api.Supplier.createOne(values)
      setSuppliers([...suppliers, supplierCreated])
      enqueueSnackbar('Supplier added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add supplier', { variant: 'error' })
    }
  }

  const handleEdit = async (values: Partial<Model.Supplier>) => {
    if (!editingSupplier) return
    try {
      const supplierUpdated = await Api.Supplier.updateOne(
        editingSupplier.id,
        values,
      )
      setSuppliers(
        suppliers.map(supplier =>
          supplier.id === supplierUpdated.id ? supplierUpdated : supplier,
        ),
      )
      enqueueSnackbar('Supplier updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update supplier', { variant: 'error' })
    }
  }

  const handleDelete = async (supplierId: string) => {
    try {
      await Api.Supplier.deleteOne(supplierId)
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId))
      enqueueSnackbar('Supplier deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete supplier', { variant: 'error' })
    }
  }

  const showModal = (supplier?: Model.Supplier) => {
    setEditingSupplier(supplier || null)
    form.setFieldsValue(supplier || { name: '', contactInformation: '' })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        if (editingSupplier) {
          handleEdit(values)
        } else {
          handleAdd(values)
        }
        setIsModalVisible(false)
        form.resetFields()
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

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
      render: (text: any, record: Model.Supplier) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this supplier?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Suppliers Management</Title>
      <Text>Manage your suppliers' information efficiently.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Supplier
      </Button>
      <Table
        columns={columns}
        dataSource={suppliers}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingSupplier ? 'Edit Supplier' : 'Add Supplier'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please input the supplier name!' },
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
