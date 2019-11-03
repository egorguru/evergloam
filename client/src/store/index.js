import React from 'react'

const Context = React.createContext()

export const Provider = ({ initialState, reducer, children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

const wrapActions = (actions, dispatch) => {
  const result = {}
  for (const key in actions) {
    result[key] = (...args) => actions[key](...args)(dispatch)
  }
  return result
}

export const connect = (mapStateToProps, actions) => (Component) => (props) => (
  <Context.Consumer>
    {({ state, dispatch }) => (
      <Component
        {...props}
        {...mapStateToProps(state)}
        {...wrapActions(actions, dispatch)}
      />
    )}
  </Context.Consumer>
)

export const combineReducers = (reducers) => (state, action) => {
  const nextState = {}
  for (const key in reducers) {
    const previousStateForKey = state[key]
    const nextStateForKey = reducers[key](previousStateForKey, action)
    nextState[key] = nextStateForKey
  }
  return nextState
}
