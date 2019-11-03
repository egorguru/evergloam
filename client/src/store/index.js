import React, { createContext, useState, useContext } from 'react'

import initialState from './initialState'

const Context = createContext(initialState)

export const Provider = ({ children }) => {
  const [state, setState] = useState(initialState)
  return (
    <Context.Provider value={{ ...state, setState }}>
      {children}
    </Context.Provider>
  )
}

export const connect = (mapStateToProps, actions) => (Component) => (props) => {
  const context = useContext(Context)
  const { setState } = context
  const wrappedActions = {}
  for (const key in actions) {
    wrappedActions[key] = (...args) => actions[key](...args)({ context, setState })
  }
  return (
    <Component
      {...props}
      {...mapStateToProps(context)}
      {...wrappedActions}
    ></Component>
  )
}
