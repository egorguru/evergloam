import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { connect } from '../../store'
import { create, getAll, remove } from '../../actions/subscription'

const Subscription = ({
  create, getAll, remove,
  auth, subscription: { subscriptions, isLoading },
  history, userId
}) => {
  useEffect(() => getAll({ profile: userId }), [])

  const onSubClick = (e) => {
    e.preventDefault()
    if (!auth.isAuthenticated) {
      history.push('/login')
    } else {
      const existedSub = subscriptions.find((s) => s.subscriber === auth.user.id)
      if (existedSub) {
        remove(existedSub._id)
      } else {
        create({ profile: userId })
      }
    }
  }

  return !isLoading && (
    <button
      className="btn btn-dark btn-block subscribe-btn"
      onClick={onSubClick}
    >
      Subscribe | <i className="fa fa-users"></i> {subscriptions.length}
    </button>
  )
}

Subscription.propTypes = {
  create: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  subscription: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  subscription: state.subscription
})

export default connect(mapStateToProps, {
  create, getAll, remove
})(withRouter(Subscription))
