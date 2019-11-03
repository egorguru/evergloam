import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Quill from 'react-quill'

import { connect } from '../../store'
import { createComment } from '../../actions/post'

const CommentForm = ({ postId, createComment }) => {
  const [body, setBody] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    createComment(postId, { body })
    setBody('')
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <Quill
              placeholder="What do you think?"
              theme="snow"
              modules={{ toolbar: false }}
              value={body}
              onChange={value => setBody(value)}
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Comment</button>
          </div>
        </form>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { createComment })(CommentForm)