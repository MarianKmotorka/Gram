export const getLinksConfig = (userId: string | undefined) => [
  { text: 'Login', to: '/login', isLoggedIn: false, isDark: false },
  { text: 'Register', to: '/register', isLoggedIn: false, isDark: true },
  { text: 'Profile', to: `/profile/${userId}`, isLoggedIn: true, isDark: false },
  { text: 'Sign out', to: '/signout', isLoggedIn: true, isDark: true },
]
