import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Signout from '../../pages/Signout'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../../pages/HomePage/HomePage'
import LoginPage from '../../pages/LoginPage/LoginPage'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'
import MyImages from '../../pages/ProfilePage/ProfilePage'
import NoAuthRoute from './NoAuthRoute'

const Routes = () => (
  <Switch>
    <NoAuthRoute path='/login' component={LoginPage} />
    <NoAuthRoute path='/register' component={RegisterPage} />
    <Route path='/signout' component={Signout} />
    <ProtectedRoute path='/profile/:userId' component={MyImages} />
    <ProtectedRoute path='/' component={HomePage} />
  </Switch>
)

export default Routes
