import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from '../../store'
import { UPDATE_POST } from '../../actions/types'
import { getById as getPostById } from '../../actions/post'

import Loader from '../shared/Loader'
import Post from '../shared/Post'
import Comment from './Comment'
import CommentForm from './CommentForm'

const SinglePost = ({ getPostById, match, post, auth, history }) => {
  useEffect(() => getPostById(match.params.id, history), [])

  return !post.isLoading && post.post !== null ? (
    <div className="row mt-5">
      <div className="col-md-6 mx-auto">
        <Post post={post.post} TYPE={UPDATE_POST} />
        <div className="col-md-12 mx-auto">
          {auth.isAuthenticated && <CommentForm postId={post.post._id} />}
          {post.post.comments.map((c) => (
            <Comment comment={c} postId={post.post._id} key={c._id} />
          ))}
        </div>
      </div>
    </div>
  ) : <Loader />
}

SinglePost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getPostById })(SinglePost)