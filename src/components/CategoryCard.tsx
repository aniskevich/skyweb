import React from 'react'
import { Card } from 'antd'
import { Category, selectedCategoryIdSelector } from '../store/reducers/categories'
import { useAppSelector } from '../hooks/storeHooks'

export const CategoryCard: React.FC<Category> = ({id, name, unit, count}) => {
  const selected: boolean = useAppSelector(selectedCategoryIdSelector) === id

  return (
    <Card
      title={name}
      hoverable
      style={{borderColor: selected && 'lightblue'}}
    >
      Unit: {unit}
      <br/>
      Count: {count}
    </Card>
  )
}
