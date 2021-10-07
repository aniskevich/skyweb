import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { categoriesReducer } from './reducers/categories'
import { productsReducer } from './reducers/products'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
