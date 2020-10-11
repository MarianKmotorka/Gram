import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Signout from '../pages/Signout'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'

const Routes = () => (
  <Switch>
    <Route path='/login' component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/signout' component={Signout} />
    <ProtectedRoute path='/' component={HomePage} />
  </Switch>
)

export default Routes
