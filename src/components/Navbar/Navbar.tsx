import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useHistory } from 'react-router-dom'

import { IUser } from '../../domain'
import { getLinksConfig } from './utils'
import NavbarSearch from './NavbarSearch'
import { useOnClickOutside, useWindowSize } from '../../hooks'
import noPhotoPng from '../../images/no-photo.png'
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
  const navbarRef = useOnClickOutside<HTMLDivElement>(() => setMenuExpanded(false))

  const isWideScreen = width > 900

  const rowRenderer = (user: IUser) => (
    <DropdownRow>
      <img src={user.photoUrl || noPhotoPng} alt='user' />
      <p>{user.nick}</p>
    </DropdownRow>
  )

  return (
    <Wrapper ref={navbarRef}>
      <Logo to='/'>@GRAM</Logo>

      {isLoggedIn && (
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
