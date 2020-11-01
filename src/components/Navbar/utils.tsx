import React from 'react'
import { PowerOffIcon } from '../Icons'

export const getLinksConfig = (userId: string | undefined) => [
  { text: 'LOGIN', to: '/login', isLoggedIn: false, isDark: false },
  { text: 'REGISTER', to: '/register', isLoggedIn: false, isDark: true },
  { text: 'FEED', to: '/', isLoggedIn: true, isDark: false },
  { text: 'PROFILE', to: `/profile/${userId}`, isLoggedIn: true, isDark: false },
  {
    to: '/signout',
    icon: <PowerOffIcon fontSize='20px' />,
    isLoggedIn: true,
    isDark: true,
  },
]
