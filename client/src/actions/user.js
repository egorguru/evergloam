import axios from 'axios'

export const getUserById = (id, history) => ({ setState }) => {
  setState({ user: { isLoading: true } })
  axios
    .get(`/api/users/${id}`)
    .then((res) => setState({
      user: {
        user: res.data,
        isLoading: false
      }
    }))
    .catch(() => {
      setState({ user: { isLoading: false } })
      history.push('/404')
    })
}
