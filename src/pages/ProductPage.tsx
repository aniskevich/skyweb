import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { message, Spin, Row } from 'antd'
import { Product } from '../store/reducers/products'
import { productsAPI } from '../api/api'
import { ProductCard } from '../components/ProductCard'

export const ProductPage: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const history = useHistory()
  const [product, setProduct] = useState(null as Product)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    productsAPI.getProductById(id)
      .then(response => response.json())
      .then((data: {data: Product}) => data.data)
      .then(product => setProduct(product))
      .catch(() => {
        message.error('Error occurred, redirecting to main', 3)
        setTimeout(() => history.push('/'), 3000)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
   <Row style={{display: 'flex', justifyContent: 'center'}}>
     {isLoading
     ? <Spin />
     : <ProductCard {...product} />}
   </Row>
  )
}
