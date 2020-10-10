import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Signout from './pages/Signout'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

import { GlobalStyles, Wrapper } from './App.styled'

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Wrapper>
        <Navbar />

        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/signout' component={Signout} />
          <Route path='/' component={HomePage} /> // TODO PROTECTED ROUTE
        </Switch>
      </Wrapper>
    </>
  )
}

export default App
