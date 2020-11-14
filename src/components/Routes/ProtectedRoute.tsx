import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'
import { useAuth } from '../../contextProviders/AuthProvider'

interface IProps extends RouteProps {
  component: any
}

const ProtectedRoute = ({ component: Component, location, ...rest }: IProps) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn)
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location?.pathname || '' },
        }}
      />
    )

  return <Route {...rest} render={props => <Component {...props} />} />
}

export default ProtectedRoute
