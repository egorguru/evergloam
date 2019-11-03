import React, { createContext, useState, useContext } from 'react'

import initialState from './initialState'

const Context = createContext(initialState)

export const Provider = ({ children }) => {
  const [state, setState] = useState(initialState)
  const wrappedSetState = (newState) => setState({ ...state, ...newState })
  return (
    <Context.Provider value={{ ...state, setState: wrappedSetState }}>
      {children}
    </Context.Provider>
  )
}

export const connect = (mapStateToProps, actions) => (Component) => (props) => {
  const context = useContext(Context)
  const { setState } = context
  const state = mapStateToProps(context)
  const wrappedActions = {}
  for (const key in actions) {
    wrappedActions[key] = (...args) => actions[key](...args)({ state, setState })
  }
  return <Component {...props} {...state} {...wrappedActions}></Component>
}
