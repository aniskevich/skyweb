const API_URL = 'http://62.109.7.98/api'

export const categoriesAPI = {
  getCategories(): Promise<Response> {
    return fetch(`${API_URL}/categories`)
  }
}

export const productsAPI = {
  getProducts(id: number): Promise<Response> {
    return fetch(`${API_URL}/product/category/${id}`)
  },
  getProductById(id: string): Promise<Response> {
    return fetch(`${API_URL}/product/${id}`)
  }
}
