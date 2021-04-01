import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import './Header.css';

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="NavContainer">
        <div className="Navbar">
          <div className="Navbar-Left">
            <h2><a href="/">re:blog</a></h2>
          </div>
          <div className="Navbar-Right">
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/home/posts">Posts</a>
              </li>

              <li>
                <Link to={'/login'}>Login</Link>
              </li>
              <li>
                <a className="Red" href="/home/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
        {console.log(this.props)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(Header);
