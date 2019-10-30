import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createLike, removeLike } from '../../../actions/post'

const Like = ({ auth, postId, likes, TYPE, removeLike, createLike }) => {
  const onLikeClick = (e) => {
    e.preventDefault()
    if (auth.isAuthenticated) {
      const existedLike = likes.find((l) => l.user === auth.user.id)
      if (existedLike) {
        removeLike(postId, existedLike._id, TYPE)
      } else {
        createLike(postId, TYPE)
      }
    }
  }
  return (
    <a
      href="#" role="button"
      className="card-link" onClick={onLikeClick}
    >
      <i className="fa fa-heart"></i> {likes.length}
    </a>
  )
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
