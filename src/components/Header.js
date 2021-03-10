import React from 'react';
import './Header.css';

export default class Header extends React.Component {
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
                <a href="/home/login">Login</a>
              </li>
              <li>
                <a className="Red" href="/home/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
