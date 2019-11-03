import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from '../../store'
import { login } from '../../actions/auth'

const Login = ({ history, auth, login}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/')
    }
  }, [auth])

  const onSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <div className="row mt-4">
      <div className="col-4 mx-auto">
        <div className="card">
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    pattern=".{5,30}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    pattern=".{6,30}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-dark btn-block">Login</button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { login })(Login)
