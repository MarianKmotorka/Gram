import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useHistory } from 'react-router-dom'

import { IUser } from '../../domain'
import { getLinksConfig } from './utils'
import NavbarSearch from './NavbarSearch'
import { useOnClickOutside, useWindowSize } from '../../hooks'
import noPhotoPng from '../../images/no-photo.png'
import { useAuth } from '../../contextProviders/AuthProvider'

import {
  Logo,
  Wrapper,
  StyledLink,
  DropdownRow,
  LinksContainer,
  StyledMenuIcon,
  NAVBAR_BREAKPOINT,
} from './Navbar.styled'

const Navbar = () => {
  const [menuExpanded, setMenuExpanded] = useState(false)
  const auth = useAuth()
  const history = useHistory()
  const { width } = useWindowSize()
  const navbarRef = useOnClickOutside<HTMLDivElement>(() => setMenuExpanded(false))

  const isWideScreen = width > NAVBAR_BREAKPOINT
  const userId = auth.isLoggedIn ? auth.authUser.uid : ''

  const rowRenderer = (user: IUser) => (
    <DropdownRow>
      <img src={user.photoUrl || noPhotoPng} alt='user' />
      <p>{user.nick}</p>
    </DropdownRow>
  )

  return (
    <Wrapper ref={navbarRef}>
      <Logo to='/'>@GRAM</Logo>

      {auth.isLoggedIn && (
        <NavbarSearch
          searchPrefix='@'
          rowRenderer={rowRenderer}
          query={{ filterBy: 'nick', collectionName: 'users' }}
          onSelected={user => history.push(`/profile/${user.id}`)}
        />
      )}

      <AnimatePresence>
        {(isWideScreen || menuExpanded) && (
          <LinksContainer
            initial={{ right: -500 }}
            animate={{ right: 0 }}
            exit={{ right: -500 }}
            transition={{ type: 'spring', mass: 0.1 }}
          >
            {getLinksConfig(userId).map(
              x =>
                x.isLoggedIn === auth.isLoggedIn && (
                  <StyledLink onClick={() => setMenuExpanded(false)} to={x.to} key={x.to}>
                    {x.icon}
                    <span>{x.text}</span>
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
