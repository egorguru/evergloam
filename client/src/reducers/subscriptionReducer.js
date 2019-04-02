import {
  SUBSCRIPTION_LOADING,
  ADD_SUBSCRIPTION,
  GET_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION
} from '../actions/types'

const initialState = {
  subscriptions: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
        isLoading: false
      }
    case ADD_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: [action.payload, ...state.subscriptions]
      }
    case DELETE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.filter((s) => s._id !== action.payload)
      }
    default:
      return state
  }
}
