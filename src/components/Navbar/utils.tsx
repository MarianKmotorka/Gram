import React from 'react'
import { PowerOffIcon, IglooIcon, OpenLockIcon, PlusIcon, UserIcon } from '../Icons'

export const getLinksConfig = (userId: string | undefined) => [
  {
    text: 'LOGIN',
    icon: <OpenLockIcon />,
    to: '/login',
    isLoggedIn: false,
    isDark: false,
  },
  {
    text: 'REGISTER',
    icon: <PlusIcon />,
    to: '/register',
    isLoggedIn: false,
    isDark: true,
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
