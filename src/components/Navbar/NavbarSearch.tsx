import React, { useState } from 'react'
import { IUser } from '../../domain'
import { useWindowSize } from '../../hooks'
import SearchInput, { ISearchInputProps } from '../Inputs/SearchInput/SearchInput'

import { Backdrop, Wrapper } from './NavbarSearch.styled'

interface IProps extends Omit<ISearchInputProps<IUser>, 'onFocus' | 'onBlur'> {}

const NavbarSearch = ({ onSelected, ...rest }: IProps) => {
  const [focused, setFocused] = useState(false)
  const { width } = useWindowSize()

  const handleSelected = (user: IUser) => {
    onSelected(user)
    setFocused(false)
  }

  return (
    <Wrapper focused={focused}>
      <SearchInput
        {...rest}
        onSelected={handleSelected}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        exitAnimation={width > 600}
      />

      {focused && <Backdrop />}
    </Wrapper>
  )
}

export default NavbarSearch
