import axios from 'axios'
import jwtDecode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'

export const register = (userData, history) => () => {
  axios
    .post('/api/auth/register', userData)
    .then(() => history.push('/login'))
}

export const login = (userData) => ({ state, setState }) => {
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const { token } = res.data
      localStorage.setItem('access_token', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      setState({
        ...state,
        auth: {
          ...state.auth,
          user: decoded,
          isAuthenticated: true
        }
      })
    })
}

export const logout = () => ({ state, setState }) => {
  localStorage.removeItem('access_token')
  setAuthToken(false)
  setState({
    ...state,
    auth: {
      ...state.auth,
      user: {},
      isAuthenticated: false
    }
  })
}
