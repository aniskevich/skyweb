import React, { useEffect } from 'react'
import { Input, message } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { actions as productsActions, productsWithCategoriesAndUnitsSelector } from '../store/reducers/products'
import { ProductsTable } from './ProductsTable'
import { actions as categoriesActions } from '../store/reducers/categories'

const { Search } = Input

export const ProductsContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(productsWithCategoriesAndUnitsSelector)
  const isLoading = useAppSelector(state => state.products.isLoading)
  const error = useAppSelector(state => state.products.error)
  const categoriesFilterValue = useAppSelector(state => state.products.categoriesFilter)

  useEffect(() => {
    if (error) {
      message.error('Error occurred, try reload the page', 3)
      dispatch(productsActions.setError(null))
    }
  }, [error])

  const onSearch = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(categoriesActions.setSelectedCategoryId(null))
    dispatch(productsActions.setCategoriesFilter(event.currentTarget.value))
  }

  return (
    <>
      <Search placeholder="input category name" onInput={onSearch} value={categoriesFilterValue} style={{ display: 'block', width: 200, margin: '0 auto' }} />
      <ProductsTable products={products} isLoading={isLoading}/>
    </>
  )
}
