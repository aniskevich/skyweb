import { ThunkAction } from 'redux-thunk'
import { InferValueTypes, RootState } from '../store'
import { categoriesAPI } from '../../api/api'
import { recursivelyGetAllProducts } from './products'

export type Category = {
  id: number
  name: string
  unit: string
  count: number
}

type InitialStateType = typeof initialState

type ActionsType = ReturnType<InferValueTypes<typeof actions>>

const initialState = {
  categories: [] as Category[],
  isLoading: false,
  error: null as string,
  selectedCategoryId: null as number
}

export const categoriesReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: [...action.payload],
      }
    case 'IS_LOADING_TOGGLE':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return {...state, error: action.payload}
    case 'SET_SELECTED_CATEGORY_ID':
      return {...state, selectedCategoryId: action.payload}
    default:
      return state
  }
}

export const actions = {
  setCategories: (payload: Category[]) =>
    ({ type: 'SET_CATEGORIES', payload } as const),
  setIsLoading: (payload: boolean) =>
    ({ type: 'IS_LOADING_TOGGLE', payload } as const),
  setError: (payload: string) =>
    ({type: 'SET_ERROR', payload} as const),
  setSelectedCategoryId: (payload: number | null) => ({type: 'SET_SELECTED_CATEGORY_ID', payload} as const)
}

export const getCategories = (): ThunkAction<void, RootState, unknown, ActionsType> => async dispatch => {
  try {
    dispatch(actions.setIsLoading(true))
    const response = await categoriesAPI.getCategories()
    if (!response || !response.ok) throw Error('Server or network error occurred')
    const data: {data: Category[]} = await response.json()
    if (!data.data) throw Error('No data loaded')
    dispatch(actions.setCategories(data.data))
    dispatch(recursivelyGetAllProducts())
  } catch (e) {
    const error = e.message ? e.message : e
    dispatch(actions.setError(error))
  } finally {
    dispatch(actions.setIsLoading(false))
  }
}

export const selectedCategoryIdSelector = (state: RootState) => state.categories.selectedCategoryId
