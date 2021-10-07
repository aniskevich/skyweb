import React from 'react'
import { Button, Row, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../hooks/storeHooks'
import { actions as productsActions, Product } from '../store/reducers/products'

export const ProductsTable: React.FC<{products: Product[], isLoading: boolean}> = ({products, isLoading}) => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Ccal\'s',
      dataIndex: 'ccal'
    },
    {
      title: 'Units',
      dataIndex: 'unit'
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center' as const,
      render: (text: string, record: Product) => (
        <Row justify='space-around'>
          <Button onClick={() => history.push(`/product/${record.id}`)}>Show</Button>
          <Button onClick={() => dispatch(productsActions.deleteProduct(record.id))} danger>Delete</Button>
        </Row>
      ),
    }
  ]

  return (
    <div style={{padding: '3rem'}}>
      <h2>Products</h2>
      <Table
        dataSource={products}
        columns={columns}
        loading={isLoading}
        bordered
        rowKey='id'
      />
    </div>
  )
}
