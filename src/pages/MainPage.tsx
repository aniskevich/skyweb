import React from 'react'
import { CategoriesContainer } from '../components/CategoriesContainer'
import { ProductsContainer } from '../components/ProductsContainer'

export const MainPage: React.FC = () => {
  return (
    <>
      <CategoriesContainer />
      <ProductsContainer />
    </>
  )
}
