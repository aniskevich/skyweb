import { ThunkAction } from 'redux-thunk'
import { InferValueTypes, RootState } from '../store'
import { productsAPI } from '../../api/api'

export type Product = {
  id: number
  name: string
  ccal: number
  date: string
  category_id: number
  created_at: Date
  updated_at: Date
  category?: string
  unit?: string
}

type InitialStateType = typeof initialState

type ActionsType = ReturnType<InferValueTypes<typeof actions>>

const initialState = {
  products: [] as Product[],
  isLoading: false,
  error: null as string,
  categoriesFilter: null as string
}

export const productsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'ADD_PRODUCTS':
      return {...state, products: state.products.concat(action.payload)}
    case 'IS_LOADING_TOGGLE':
      return {...state, isLoading: action.payload}
    case 'SET_ERROR':
      return {...state, error: action.payload}
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload)
      }
    case 'SET_CATEGORIES_FILTER':
      return {...state, categoriesFilter: action.payload }
    default:
      return state
  }
}

export const actions = {
  addProducts: (payload: Product[]) =>
    ({type: 'ADD_PRODUCTS', payload} as const),
  setIsLoading: (payload: boolean) =>
    ({type: 'IS_LOADING_TOGGLE', payload} as const),
  setError: (payload: string) =>
    ({type: 'SET_ERROR', payload} as const),
  deleteProduct: (payload: number) =>
    ({type: 'DELETE_PRODUCT', payload} as const),
  setCategoriesFilter: (payload: string | null) =>
    ({type: 'SET_CATEGORIES_FILTER', payload} as const)
}

export const recursivelyGetAllProducts = (): ThunkAction<void, RootState, unknown, ActionsType> => async (dispatch, getState) => {
  try {
    dispatch(actions.setIsLoading(true))
    const categoriesIds = categoriesIdsSelector(getState())
    for (let id of categoriesIds) {
      const response = await productsAPI.getProducts(id)
      if (!response || !response.ok) throw Error('Server or network error occurred')
      const data: { data: Product[] } = await response.json()
      if (!data.data) throw Error('No data loaded')
      dispatch(actions.addProducts(data.data))
    }
  } catch (e) {
    const error = e.message ? e.message : e
    dispatch(actions.setError(error))
  } finally {
    dispatch(actions.setIsLoading(false))
  }
}

const categoriesIdsSelector = (state: RootState) => state.categories.categories.map(c => c.id)

export const productsWithCategoriesAndUnitsSelector = (state: RootState) => {
  let products = state.products.products
  let filter = state.products.categoriesFilter
  if (state.categories.selectedCategoryId) products = products.filter(p => p.category_id === state.categories.selectedCategoryId)
  products = products.map(p => {
    const category = state.categories.categories.find(c => c.id === p.category_id)
    p.category = category.name
    p.unit = category.unit
    return p
  })
  if (filter) products = products.filter(p => p.category.toLowerCase().includes(filter))
  return products
}
