import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Signout from './pages/Signout'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

import { AppContent, GlobalStyles, CenteredContainer } from './App.styled'

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Navbar />

      <AppContent>
        <CenteredContainer>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/signout' component={Signout} />
            <Route path='/' component={HomePage} /> // TODO PROTECTED ROUTE
          </Switch>
        </CenteredContainer>
      </AppContent>
    </>
  )
}

/*

*/

export default App
