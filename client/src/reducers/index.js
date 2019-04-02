import { combineReducers } from 'redux'

import auth from './authReducer'
import post from './postReducer'
import subscription from './subscriptionReducer'
import user from './userReducer'

export default combineReducers({ auth, post, subscription, user })
