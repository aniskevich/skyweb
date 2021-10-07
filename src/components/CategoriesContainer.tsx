import React, { useEffect } from 'react'
import { List, message } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { getCategories, actions as categoriesActions, selectedCategoryIdSelector } from '../store/reducers/categories'
import { actions as productsActions } from '../store/reducers/products'
import { CategoryCard } from './CategoryCard'


export const CategoriesContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.categories)
  const isLoading = useAppSelector(state => state.categories.isLoading)
  const error = useAppSelector(state => state.categories.error)
  const selectedCategoryId = useAppSelector(selectedCategoryIdSelector)

  useEffect(() => {
    if (!categories.length) dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (error) {
      message.error('Error occurred, try reload the page', 3)
      dispatch(categoriesActions.setError(null))
    }
  }, [error])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = parseInt(event.currentTarget.dataset.id)
    const categoryId = id === selectedCategoryId ? null : id
    if (categoryId) dispatch(productsActions.setCategoriesFilter(null))
    dispatch(categoriesActions.setSelectedCategoryId(categoryId))
  }

  return (
    <div style={{ padding: '3rem' }}>
      <h2>Categories (click on category card to filter products)</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={categories}
        loading={isLoading}
        renderItem={category => (
          <List.Item onClick={handleClick} data-id={category.id}>
            <CategoryCard {...category} />
          </List.Item>
        )}
      />
    </div>
  )
}
