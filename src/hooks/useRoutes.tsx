import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import { ProductPage } from '../pages/ProductPage'

export const useRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' component={MainPage} exact/>
      <Route path='/product/:id' component={ProductPage} />
      <Redirect to='/' from='**'/>
    </Switch>
  )
}
