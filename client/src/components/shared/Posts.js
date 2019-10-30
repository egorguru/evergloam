import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pagination from "react-js-pagination"

import { UPDATE_POSTS } from '../../actions/types'
import { getAll } from '../../actions/post'

import Post from './Post'
import Loader from './Loader'

const LIMIT = 10

class Posts extends React.Component {

  constructor() {
    super()
    this.state = { activePage: 1 }
  }

  componentDidMount() {
    this.props.getAll(this.getQueryParams())
  }

  onPageChange = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.getAll(this.getQueryParams())
    })
  }

  getQueryParams() {
    return Object.assign(
      {
        skip: (this.state.activePage - 1) * LIMIT,
        limit: LIMIT
      },
      this.props.queryParams
    )
  }

  render() {
    const { isLoading, posts, totalCount } = this.props.post
    return (
      <React.Fragment>
        {isLoading && <Loader />}
        {!isLoading && totalCount === 0 && (
          <div className="text-center">
            <h2>There is nothing</h2>
          </div>
        )}
        {posts.map((p) => <Post post={p} key={p._id} TYPE={UPDATE_POSTS} />)}
        {!isLoading && totalCount > posts.length && (
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={LIMIT}
            totalItemsCount={totalCount}
            onChange={this.onPageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
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
