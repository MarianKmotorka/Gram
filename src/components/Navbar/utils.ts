export const getLinksConfig = (userId: string | undefined) => [
  { text: 'Login', to: '/login', isLoggedIn: false },
  { text: 'Register', to: '/register', isLoggedIn: false },
  { text: 'Profile', to: `/profile/${userId}`, isLoggedIn: true },
  { text: 'Sign out', to: '/signout', isLoggedIn: true },
]
