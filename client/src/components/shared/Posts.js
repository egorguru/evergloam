import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { UPDATE_POSTS } from '../../actions/types'
import { getAll } from '../../actions/postActions'

import Post from './Post'
import Loader from './Loader'

class Posts extends React.Component {

  constructor() {
    super()
    this.state = {
      skip: 0,
      limit: 10
    }
  }

  componentDidMount() {
    this.props.getAll(this.getQueryParams())
  }

  onClickBack(e) {
    e.preventDefault()
    this.setState({ skip: this.state.skip - this.state.limit }, () => {
      this.props.getAll(this.getQueryParams())
    })
  }

  onClickLoadMore(e) {
    e.preventDefault()
    this.setState({ skip: this.state.skip + this.state.limit }, () => {
      this.props.getAll(this.getQueryParams())
    })
  }

  getQueryParams() {
    return Object.assign(
      {
        skip: this.state.skip,
        limit: this.state.limit
      },
      this.props.queryParams
    )
  }

  roundTo10(num) {
    return Math.ceil(num / 10) * 10;
  }

  render() {
    const { isLoading, posts, totalCount } = this.props.post
    const { skip, limit } = this.state
    return (
      <React.Fragment>
        {isLoading && <Loader />}
        {!isLoading && posts.length === 0 && (
          <div className="text-center">
            <h2>There is nothing</h2>
          </div>
        )}
        {posts.map((p) => <Post post={p} key={p._id} TYPE={UPDATE_POSTS} />)}
        {skip !== 0 && !isLoading && totalCount > posts.length && (
          <button className="btn btn-dark" onClick={this.onClickBack.bind(this)}>
            Newer
          </button>
        )}
        {!isLoading && totalCount > posts.length &&
          this.roundTo10(posts.length * (skip / limit + 1)) < this.roundTo10(totalCount) && (
          <button
            className="btn btn-dark float-right"
            onClick={this.onClickLoadMore.bind(this)}
          >
            Older
          </button>
        )}
      </React.Fragment>
    )
  }
}

Posts.propTypes = {
  getAll: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getAll })(Posts)
