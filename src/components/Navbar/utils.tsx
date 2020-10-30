import React from 'react'
import { PowerOffIcon } from '../Icons'

export const getLinksConfig = (userId: string | undefined) => [
  { text: 'Login', to: '/login', isLoggedIn: false, isDark: false },
  { text: 'Register', to: '/register', isLoggedIn: false, isDark: true },
  { text: 'Profile', to: `/profile/${userId}`, isLoggedIn: true, isDark: false },
  {
    to: '/signout',
    icon: <PowerOffIcon fontSize='20px' />,
    isLoggedIn: true,
    isDark: true,
  },
]
