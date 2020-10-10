import React from 'react'
import { useAuthContext } from '../../ContextProviders/AuthProvider'

import { Logo, StyledLink, Wrapper } from './Navbar.styled'

const Navbar = () => {
  const { isLoggedIn } = useAuthContext()

  return (
    <Wrapper>
      <Logo to='/'>Gram</Logo>

      {!isLoggedIn && <StyledLink to='/login'>Login</StyledLink>}
      {!isLoggedIn && <StyledLink to='/register'>Register</StyledLink>}

      {isLoggedIn && <StyledLink to='/signout'>Sign out</StyledLink>}
    </Wrapper>
  )
}

export default Navbar
