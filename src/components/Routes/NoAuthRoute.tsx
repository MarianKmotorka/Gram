import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'
import { useAuth } from '../../contextProviders/AuthProvider'

interface INoAuthRouteProps extends RouteProps {
  component: any
}

const NoAuthRoute = ({ component: Component, ...rest }: INoAuthRouteProps) => {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) return <Redirect to='/' />
  return <Route {...rest} render={props => <Component {...props} />} />
}

export default NoAuthRoute
