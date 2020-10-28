import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { IUser } from '../../domain'
import SearchInput from '../SearchInput/SearchInput'

import { LinksContainer, Logo, StyledLink, Wrapper } from './Navbar.styled'

const Navbar = () => {
  const { isLoggedIn, user } = useAuthContext()
  const history = useHistory()

  return (
    <Wrapper>
      <Logo to='/'>Gram</Logo>

      {isLoggedIn && (
        <SearchInput<IUser>
          searchPrefix='@'
          rowRenderer={user => <p>{user.nick}</p>}
          onSelected={user => history.push(`/profile/${user.id}`)}
          getFirestoreQuery={(text, db) =>
            db.collection('users').where('nick', '>=', text).limit(5)
          }
        />
      )}

      <LinksContainer>
        {!isLoggedIn && <StyledLink to='/login'>Login</StyledLink>}
        {!isLoggedIn && <StyledLink to='/register'>Register</StyledLink>}

        {isLoggedIn && <StyledLink to={`/profile/${user!.uid}`}>Profile</StyledLink>}
        {isLoggedIn && <StyledLink to='/signout'>Sign out</StyledLink>}
      </LinksContainer>
    </Wrapper>
  )
}

export default Navbar
