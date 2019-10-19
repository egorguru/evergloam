import axios from 'axios'

import { GET_USER, USER_LOADING } from './types'

export const getUserById = (id) => (dispatch) => {
  dispatch(setUserLoading(true))
  axios
    .get(`/api/users/${id}`)
    .then((res) => dispatch({
      type: GET_USER,
      payload: res.data
    }))
    .catch(() => dispatch(setUserLoading(false)))
}

const setUserLoading = (isLoading) => ({
  type: USER_LOADING,
  payload: isLoading
})
