import { combineReducers } from 'redux'

import auth from './auth'
import post from './post'
import subscription from './subscription'
import user from './user'

export default combineReducers({ auth, post, subscription, user })
