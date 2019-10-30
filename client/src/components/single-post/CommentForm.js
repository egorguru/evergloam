import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'react-quill'

import { createComment } from '../../actions/post'

class CommentForm extends React.Component {

  constructor() {
    super()
    this.state = { body: '' }
  }

  onChangeBody = (body) => this.setState({ body })

  onSubmit = (e) => {
    e.preventDefault()
    const { body } = this.state
    this.props.createComment(this.props.postId, { body })
    this.setState({ body: '' })
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Quill
                placeholder="What do you think?"
                theme="snow"
                modules={{ toolbar: false }}
                value={this.state.body}
                onChange={this.onChangeBody}
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
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { createComment })(CommentForm)