import axios from 'axios'

export const getUserById = (id, history) => ({ state, setState }) => {
  setState({ user: { isLoading: true } })
  axios
    .get(`/api/users/${id}`)
    .then((res) => setState({
      ...state,
      user: {
        ...state.user,
        user: res.data,
        isLoading: false
      }
    }))
    .catch(() => {
      setState({
        ...state,
        user: {
          ...state.user,
          isLoading: false
        }
      })
      history.push('/404')
    })
}
