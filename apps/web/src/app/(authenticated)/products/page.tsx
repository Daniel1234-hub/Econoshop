'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Popconfirm,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProductsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [products, setProducts] = useState<Model.Product[]>([])
  const [suppliers, setSuppliers] = useState<Model.Supplier[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Model.Product | null>(
    null,
  )
  const [form] = Form.useForm()

  useEffect(() => {
    fetchProducts()
    fetchSuppliers()
  }, [])

  const fetchProducts = async () => {
    try {
      const productsFound = await Api.Product.findMany({
        includes: ['supplier'],
      })
      setProducts(productsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch products', { variant: 'error' })
    }
  }

  const fetchSuppliers = async () => {
    try {
      const suppliersFound = await Api.Supplier.findMany()
      setSuppliers(suppliersFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch suppliers', { variant: 'error' })
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalVisible(true)
  }

  const handleEditProduct = (product: Model.Product) => {
    setEditingProduct(product)
    setIsModalVisible(true)
    form.setFieldsValue(product)
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await Api.Product.deleteOne(productId)
      enqueueSnackbar('Product deleted successfully', { variant: 'success' })
      fetchProducts()
    } catch (error) {
      enqueueSnackbar('Failed to delete product', { variant: 'error' })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingProduct) {
        await Api.Product.updateOne(editingProduct.id, values)
        enqueueSnackbar('Product updated successfully', { variant: 'success' })
      } else {
        await Api.Product.createOneBySupplierId(values.supplierId, values)
        enqueueSnackbar('Product added successfully', { variant: 'success' })
      }
      fetchProducts()
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to save product', { variant: 'error' })
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'name'],
      key: 'supplier',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Model.Product) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDeleteProduct(record.id)}
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
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Title level={2}>Product Inventory Management</Title>
        <Text>Manage the products available in the supermarket</Text>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddProduct}
        style={{ marginBottom: '20px' }}
      >
        Add Product
      </Button>
      <Table dataSource={products} columns={columns} rowKey="id" />
      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please enter the product name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter the quantity' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item
            name="supplierId"
            label="Supplier"
            rules={[{ required: true, message: 'Please select a supplier' }]}
          >
            <Select>
              {suppliers.map(supplier => (
                <Option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
