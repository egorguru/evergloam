import axios from 'axios'

import {
  SUBSCRIPTION_LOADING,
  ADD_SUBSCRIPTION,
  GET_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION
} from './types'

export const create = (like) => (dispatch) => {
  axios
    .post('/api/subscriptions', like)
    .then((res) => dispatch({
      type: ADD_SUBSCRIPTION,
      payload: res.data
    }))
}

export const getAll = (params = {}) => (dispatch) => {
  dispatch(setSubscriptionLoading(true))
  axios
    .get('/api/subscriptions', { params })
    .then((res) => dispatch({
      type: GET_SUBSCRIPTIONS,
      payload: res.data
    }))
    .catch(() => dispatch(setSubscriptionLoading(false)))
}

export const remove = (id) => (dispatch) => {
  axios
    .delete(`/api/subscriptions/${id}`)
    .then(() => dispatch({
      type: DELETE_SUBSCRIPTION,
      payload: id
    }))
}

export const setSubscriptionLoading = (isLoading) => ({
  type: SUBSCRIPTION_LOADING,
  payload: isLoading
})
