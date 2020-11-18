import React from 'react'
import { PowerOffIcon, IglooIcon, UserShieldIcon, UserIcon, UserPlusIcon } from '../Icons'

export const getLinksConfig = (userId: string) => [
  {
    text: 'Login',
    icon: <UserShieldIcon />,
    to: '/login',
    isLoggedIn: false,
  },
  {
    text: 'Register',
    icon: <UserPlusIcon />,
    to: '/register',
    isLoggedIn: false,
  },
  {
    text: 'Home',
    icon: <IglooIcon />,
    to: '/feed',
    isLoggedIn: true,
  },
  {
    text: 'Profile',
    icon: <UserIcon />,
    to: `/profile/${userId}`,
    isLoggedIn: true,
  },
  {
    text: 'Sign out',
    to: '/signout',
    icon: <PowerOffIcon />,
    isLoggedIn: true,
  },
]
