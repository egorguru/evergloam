import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <div className="container"></div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
