import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return(
      <div className="FtContainer">
        <div className="FtContent">
          <p>Made in <span className="React"><a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a></span> by <span className="Github"><a href="https://github.com/ziunadev" target="_blank" rel="noreferrer">ziunadev</a></span></p>
        </div>
      </div>
    )
  }
}
