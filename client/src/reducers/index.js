import { combineReducers } from 'redux'

import auth from './authReducer'
import post from './postReducer'

export default combineReducers({ auth, post })
