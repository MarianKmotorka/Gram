import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Feed from '../../pages/Feed/Feed'
import Signout from '../../pages/Signout'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../../pages/LoginPage/LoginPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'
import NoAuthRoute from './NoAuthRoute'

const Routes = () => (
  <Switch>
    <NoAuthRoute path='/login' component={LoginPage} />
    <NoAuthRoute path='/register' component={RegisterPage} />
    <Route path='/signout' component={Signout} />
    <ProtectedRoute path='/profile/:userId' component={ProfilePage} />
    <ProtectedRoute path='/feed' exact component={Feed} />
    <Redirect to='/feed' />
  </Switch>
)

export default Routes
