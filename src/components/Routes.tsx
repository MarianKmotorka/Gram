import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Signout from '../pages/Signout'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import MyImages from '../pages/MyImages/MyImages'

const Routes = () => (
  <Switch>
    <Route path='/login' component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/signout' component={Signout} />
    <ProtectedRoute path='/my-images' component={MyImages} />
    <ProtectedRoute path='/' component={HomePage} />
  </Switch>
)

export default Routes
