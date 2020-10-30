import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useHistory } from 'react-router-dom'

import { IUser } from '../../domain'
import { getLinksConfig } from './utils'
import { useWindowSize } from '../../hooks'
import noPhotoPng from '../../images/no-photo.png'
import SearchInput from '../SearchInput/SearchInput'
import { useAuthContext } from '../../contextProviders/AuthProvider'

import {
  Logo,
  Wrapper,
  StyledLink,
  DropdownRow,
  LinksContainer,
  StyledMenuIcon,
} from './Navbar.styled'

const Navbar = () => {
  const [menuExpanded, setMenuExpanded] = useState(false)
  const { isLoggedIn, authUser } = useAuthContext()
  const history = useHistory()
  const { width } = useWindowSize()

  const rowRenderer = (user: IUser) => (
    <DropdownRow>
      <img src={user.photoUrl || noPhotoPng} alt='user' />
      <p>{user.nick}</p>
    </DropdownRow>
  )

  return (
    <Wrapper>
      <Logo to='/'>@GRAM</Logo>

      {isLoggedIn && (
        <SearchInput<IUser>
          searchPrefix='@'
          filterBy='nick'
          collectionName='users'
          rowRenderer={rowRenderer}
          onSelected={user => history.push(`/profile/${user.id}`)}
        />
      )}

      <AnimatePresence>
        {(width > 900 || menuExpanded) && (
          <LinksContainer
            initial={{ right: -400 }}
            animate={{ right: 0 }}
            exit={{ right: -400 }}
            transition={{ type: 'spring', mass: 0.1 }}
          >
            {getLinksConfig(authUser?.uid).map(
              x =>
                x.isLoggedIn === isLoggedIn && (
                  <StyledLink
                    isDark={x.isDark}
                    onClick={() => setMenuExpanded(false)}
                    to={x.to}
                    key={x.to}
                  >
                    {x.icon}
                    {x.text}
                  </StyledLink>
                )
            )}
          </LinksContainer>
        )}
      </AnimatePresence>

      <StyledMenuIcon
        menuExpanded={menuExpanded}
        onClick={() => setMenuExpanded(x => !x)}
      />
    </Wrapper>
  )
}

export default Navbar
