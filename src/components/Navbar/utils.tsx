import React from 'react'
import { PowerOffIcon, IglooIcon, UserShieldIcon, UserIcon, UserPlusIcon } from '../Icons'

export const getLinksConfig = (userId: string) => [
  {
    text: 'LOGIN',
    icon: <UserShieldIcon />,
    to: '/login',
    isLoggedIn: false,
  },
  {
    text: 'REGISTER',
    icon: <UserPlusIcon />,
    to: '/register',
    isLoggedIn: false,
  },
  {
    text: 'FEED',
    icon: <IglooIcon />,
    to: '/feed',
    isLoggedIn: true,
  },
  {
    text: 'PROFILE',
    icon: <UserIcon />,
    to: `/profile/${userId}`,
    isLoggedIn: true,
  },
  {
    text: 'SIGN OUT',
    to: '/signout',
    icon: <PowerOffIcon />,
    isLoggedIn: true,
  },
]
