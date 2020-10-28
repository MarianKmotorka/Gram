import React from 'react'
import { useHistory } from 'react-router-dom'

import { IUser } from '../../domain'
import SearchInput from '../SearchInput/SearchInput'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import noPhotoPng from '../../images/no-photo.png'

import { DropdownRow, LinksContainer, Logo, StyledLink, Wrapper } from './Navbar.styled'

const Navbar = () => {
  const { isLoggedIn, user } = useAuthContext()
  const history = useHistory()

  const rowRenderer = (user: IUser) => (
    <DropdownRow>
      <img src={user.photoUrl || noPhotoPng} alt='user' />
      <p>{user.nick}</p>
    </DropdownRow>
  )

  return (
    <Wrapper>
      <Logo to='/'>Gram</Logo>

      {isLoggedIn && (
        <SearchInput<IUser>
          searchPrefix='@'
          filterBy='nick'
          collectionName='users'
          rowRenderer={rowRenderer}
          onSelected={user => history.push(`/profile/${user.id}`)}
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
