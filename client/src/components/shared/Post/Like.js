import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createLike, removeLike } from '../../../actions/post'

class Like extends React.Component {

  onLikeClick = (e) => {
    e.preventDefault()
    const { auth, postId, likes, TYPE } = this.props
    if (auth.isAuthenticated) {
      const existedLike = likes.find((l) => l.user === auth.user.id)
      if (existedLike) {
        this.props.removeLike(postId, existedLike._id, TYPE)
      } else {
        this.props.createLike(postId, TYPE)
      }
    }
  }

  render() {
    const { likes } = this.props
    return (
      <a
        href="#" role="button"
        className="card-link" onClick={this.onLikeClick}
      >
        <i className="fa fa-heart"></i> {likes.length}
      </a>
    )
  }
}

Like.propTypes = {
  createLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  TYPE: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { createLike, removeLike })(Like)
