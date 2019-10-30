import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pagination from "react-js-pagination"

import { UPDATE_POSTS } from '../../actions/types'
import { getAll } from '../../actions/post'

import Post from './Post'
import Loader from './Loader'

const LIMIT = 10

const Posts = ({ getAll, queryParams, post: { isLoading, posts, totalCount } }) => {
  const [activePage, setActivePage] = useState(1)

  useEffect(() => getAll(getQueryParams()), [])

  useEffect(() => getAll(getQueryParams()), [activePage])

  const getQueryParams = () => ({
    ...queryParams,
    skip: (activePage - 1) * LIMIT,
    limit: LIMIT
  })

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
          activePage={activePage}
          itemsCountPerPage={LIMIT}
          totalItemsCount={totalCount}
          onChange={page => setActivePage(page)}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </React.Fragment>
  )
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
