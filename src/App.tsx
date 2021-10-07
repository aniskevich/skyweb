import 'antd/dist/antd.css'

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './hooks/useRoutes'

export const App: React.FC = () => {
  const routes = useRoutes({})

  return (
    <Router>
      {routes}
    </Router>
  )
}
