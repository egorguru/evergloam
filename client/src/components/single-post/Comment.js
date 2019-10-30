import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { removeComment } from '../../actions/post'

import ProfileImage from '../shared/ProfileImage'

class Comment extends React.Component {

  componentDidMount() {
    this.refs.body.innerHTML = this.props.comment.body
  }

  onDelete = () => {
    this.props.removeComment(this.props.postId, this.props.comment._id)
  }

  render() {
    const { comment, auth } = this.props
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-10">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mr-2">
                    <ProfileImage user={comment.user} width="50" />
                  </div>
                  <div className="ml-2">
                    <div className="h5 m-0">{comment.user.name}</div>
                    <div className="h7 text-muted">
                      <i className="fa fa-clock-o"></i> {new Date(comment.createdDate).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 text-right">
              {auth.isAuthenticated && auth.user.name === comment.user.name && (
                <div className="dropdown">
                  <button className="btn btn-link dropdown-toggle" type="button" id="drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="drop">
                    <a className="dropdown-item" role="button" onClick={this.onDelete}>Remove</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12" ref="body"></div>
          </div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  removeComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { removeComment })(Comment)
