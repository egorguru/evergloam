import jwtDecode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'

const initialState = {
  auth: {
    isAuthenticated: false,
    user: {}
  },
  post: {
    posts: [],
    totalCount: 0,
    post: null,
    isLoading: false
  },
  subscription: {
    subscriptions: [],
    isLoading: false
  },
  user: {
    user: null,
    isLoading: false
  }
}

if (localStorage.access_token) {
  const { access_token } = localStorage
  setAuthToken(access_token)
  const decoded = jwtDecode(access_token)
  initialState.auth.user = decoded
  initialState.auth.isAuthenticated = true
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    localStorage.removeItem('access_token')
    setAuthToken(false)
    initialState.auth.user = {}
    initialState.auth.isAuthenticated = false
    window.location.href = '/login'
  }
}

export default initialState
