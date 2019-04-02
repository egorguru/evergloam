import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PostForm from '../shared/PostForm'
import Posts from '../shared/Posts'

class AllPosts extends React.Component {

  render() {
    const { auth } = this.props
    return (
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          {auth.isAuthenticated && <PostForm />}
          <Posts queryParams={{}} />
        </div>
      </div>
    )
  }
}

AllPosts.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AllPosts)
