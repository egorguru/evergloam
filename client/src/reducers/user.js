import { USER_LOADING, GET_USER } from '../actions/types'

export default (state, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
