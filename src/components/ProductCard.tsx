import React from 'react'
import { Button, Card } from 'antd'
import { Product } from '../store/reducers/products'
import { useHistory } from 'react-router-dom'

const { Meta } = Card

export const ProductCard: React.FC<Product> = ({id, name, ccal, date}) => {
  const history = useHistory()
  const CARD_WIDTH = 240
  const img = `https://via.placeholder.com/${CARD_WIDTH}/${id}.jpg`

  return (
    <Card
      style={{ width: CARD_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      cover={<img alt="example" src={img} />}
    >
      <Meta
        title={name}
        description={`Ccal\'s: ${ccal}`}
      />
      <Meta
        description={`Date: ${date}`}
        style={{ marginBottom: '1rem', textAlign: 'center' }}
      />
      <Button onClick={() => history.push('/')}>Back to main</Button>
    </Card>
  )
}
