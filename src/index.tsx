import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import AppContextProvider from './providers/AppContextProvider'

ReactDOM.render(
  <Router>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Router>,
  document.getElementById('root')
)
