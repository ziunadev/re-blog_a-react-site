import React from 'react';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return(
      <div className="ContentContainer">
        <div className="Info">
          <h1>re:blog</h1>
          <h2>Place where you can write whatever you thought, it's literally whatever</h2>
          <p>Click Post to see users posts, and login/register if you want to join them</p>
        </div>
      </div>
    )
  }
}
