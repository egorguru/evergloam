import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Evergloam</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fa fa-globe"></i>
                  All Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feed">
                  <i className="fa fa-rss"></i>
                  Feed
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {/* Links */}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(Header)
