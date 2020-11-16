import React from 'react'
import { PowerOffIcon, IglooIcon, UserShieldIcon, UserIcon, UserPlusIcon } from '../Icons'

export const getLinksConfig = (userId: string) => [
  {
    text: 'LOGIN',
    icon: <UserShieldIcon />,
    to: '/login',
    isLoggedIn: false,
    isDark: false,
  },
  {
    text: 'REGISTER',
    icon: <UserPlusIcon />,
    to: '/register',
    isLoggedIn: false,
    isDark: false,
  },
  {
    text: 'HOME',
    icon: <IglooIcon />,
    to: '/',
    isLoggedIn: true,
    isDark: false,
  },
  {
    text: 'PROFILE',
    icon: <UserIcon />,
    to: `/profile/${userId}`,
    isLoggedIn: true,
    isDark: false,
  },
  {
    text: 'SIGN OUT',
    to: '/signout',
    icon: <PowerOffIcon />,
    isLoggedIn: true,
    isDark: true,
  },
]
