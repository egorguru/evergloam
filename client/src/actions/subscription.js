import axios from 'axios'

export const create = (like) => ({ state, setState }) => {
  axios
    .post('/api/subscriptions', like)
    .then((res) => setState({
      subscription: {
        subscriptions: [res.data, ...state.subscription.subscriptions]
      }
    }))
}

export const getAll = (params = {}) => ({ setState }) => {
  setState({ subscription: { isLoading: true } })
  axios
    .get('/api/subscriptions', { params })
    .then((res) => setState({
      subscription: {
        subscriptions: res.data,
        isLoading: false
      }
    }))
    .catch(() => setState({ subscription: { isLoading: false } }))
}

export const remove = (id) => ({ state, setState }) => {
  axios
    .delete(`/api/subscriptions/${id}`)
    .then(() => setState({
      subscription: {
        subscriptions: state.subscription.subscriptions.filter((s) => s._id !== id)
      }
    }))
}
