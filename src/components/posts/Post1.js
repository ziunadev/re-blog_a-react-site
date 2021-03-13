import React from 'react';
import './Post12.css';

export default class Post1 extends React.Component {
  render() {
    return(
      <div className="ContentContainer">
        <div className="TitleContainer">
          <div className="UserandTitle">
            <h1>Post 1</h1>
            <div className="ContentUser">
              <img src='/assets/profile-userw.svg' alt="Content User"/>
              <div className="UserInfoPosts">
                <h3>user1.login@email.com</h3>
                <h5>March 6, 2021</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="PostContainer">

        </div>
      </div>
    )
  }
}
