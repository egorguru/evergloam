import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { remove } from '../../../actions/post'

import Like from './Like'
import ProfileImage from '../ProfileImage'

class Post extends React.Component {

  componentDidMount() {
    this.refs.body.innerHTML = this.props.post.body
  }

  onDelete = () => this.props.remove(this.props.post._id)

  render() {
    const { post, auth, TYPE } = this.props
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <Link to={'/user/' + post.user._id}>
                  <ProfileImage user={post.user} width="50" />
                </Link>
              </div>
              <div className="ml-2">
                <div className="h5 m-0">{post.user.name}</div>
                <div className="h7 text-muted">
                  <i className="fa fa-clock-o"></i> {new Date(post.createdDate).toDateString()}
                </div>
              </div>
            </div>
            {auth.isAuthenticated && auth.user.name === post.user.name && (
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle" type="button" id="drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="drop">
                  <a className="dropdown-item" role="button" onClick={this.onDelete}>Remove</a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card-body" ref="body"></div>
        <div className="card-footer">
          <Like postId={post._id} likes={post.likes} TYPE={TYPE} />
          <Link to={'/post/' + post._id} className="card-link">
            <i className="fa fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  remove: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  TYPE: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { remove })(Post)