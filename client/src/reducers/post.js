import {
  POST_LOADING,
  ADD_POST,
  UPDATE_POST,
  UPDATE_POSTS,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  CLEAR_POSTS
} from '../actions/types'

const initialState = {
  posts: [],
  totalCount: 0,
  post: null,
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        totalCount: 0
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalCount: action.payload.totalCount,
        isLoading: false
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case UPDATE_POSTS:
      return {
        ...state,
        posts: state.posts.map((p) => p._id === action.payload._id ? action.payload : p)
      }
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      }
    default:
      return state
  }
}
