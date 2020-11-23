import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'
import { useAuth } from '../../contextProviders/AuthProvider'

interface INoAuthRouteProps extends RouteProps {
  component: any
}

const NoAuthRoute = ({ component: Component, location, ...rest }: INoAuthRouteProps) => {
  const { isLoggedIn } = useAuth()

  const returnUrl = location?.state && (location.state as any).returnUrl

  if (isLoggedIn) return <Redirect to={returnUrl || '/'} />
  return <Route {...rest} render={props => <Component {...props} />} />
}

export default NoAuthRoute
