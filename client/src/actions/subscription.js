import axios from 'axios'

export const create = (like) => ({ state, setState }) => {
  axios
    .post('/api/subscriptions', like)
    .then((res) => setState({
      ...state,
      subscription: {
        ...state.subscription,
        subscriptions: [res.data, ...state.subscription.subscriptions]
      }
    }))
}

export const getAll = (params = {}) => ({ state, setState }) => {
  setState({ subscription: { isLoading: true } })
  axios
    .get('/api/subscriptions', { params })
    .then((res) => setState({
      ...state,
      subscription: {
        ...state.subscription,
        subscriptions: res.data,
        isLoading: false
      }
    }))
    .catch(() => setState({
      ...state,
      subscription: {
        ...state.subscription,
        isLoading: false
      }
    }))
}

export const remove = (id) => ({ state, setState }) => {
  axios
    .delete(`/api/subscriptions/${id}`)
    .then(() => setState({
      ...state,
      subscription: {
        ...state.subscription,
        subscriptions: state.subscription.subscriptions.filter((s) => s._id !== id)
      }
    }))
}
