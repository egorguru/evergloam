import React from 'react'
import PropTypes from 'prop-types'

import { connect } from '../../../store'
import { createLike, removeLike } from '../../../actions/post'

const Like = ({ auth, postId, likes, removeLike, createLike }) => {
  const onLikeClick = (e) => {
    e.preventDefault()
    if (auth.isAuthenticated) {
      const existedLike = likes.find((l) => l.user === auth.user.id)
      if (existedLike) {
        removeLike(postId, existedLike._id)
      } else {
        createLike(postId)
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
  likes: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { createLike, removeLike })(Like)
