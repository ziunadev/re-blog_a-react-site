import React from 'react';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return(
      <div className="LandingPage NewLabel">
        <div className="Link">
          <a href="/home">Welcome to <span className="SiteName">re:blog</span></a>
        </div>
      </div>
    )
  }
}
