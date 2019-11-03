import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from './store'

import PrivateRoute from './components/shared/PrivateRoute'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AllPosts from './components/all-posts/AllPosts'
import SinglePost from './components/single-post/SinglePost'
import UserProfile from './components/user-profile/UserProifle'
import Feed from './components/feed/Feed'
import NotFound from './components/not-found/NotFound'

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <div className="container">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={AllPosts} />
            <Route path="/post/:id" component={SinglePost} />
            <Route path="/user/:id" component={UserProfile} />
            <Switch>
              <PrivateRoute path="/feed" component={Feed} />
            </Switch>
            <Route path="/404" component={NotFound} />
          </div>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  )
}

export default App
