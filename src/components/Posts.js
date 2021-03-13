import React from 'react';
import './Posts.css';
// import './../assets/profile-user.svg'

export default class Posts extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: ['post1', 'post2', 'post3', 'post4', 'post5', 'post6']
    }
  }
  render() {
    return(
      <div className="ContentContainer">
        <div className="PostContentsContainer">
          <div className="PostsContents">
          <h1>Posts</h1>
          <div className="Spacer"></div>
            {this.state.posts.map((el, index) => (
              <div className="PostWrapper">
                <div className="UserWrapper">
                  <img alt="User" src='/assets/profile-userb.svg' className="UserImage"/>
                  <div className="UserInfo">
                    <h3 className="UserName">user{index+1}.login@email.com</h3>
                    <h5 classNane="UploadDate">March {6+index}, 2021</h5>
                  </div>
                </div>
                <div className="ContentWrapper">
                  <h4><a href={'/home/posts/'+el}>{el}</a></h4>
                  <p><a href={'/home/posts/'+el}>
                    Content description here, for every posts. This is content description for posts{index+1}
                  </a>
                  </p>
                  <div className="ReadMoreWrapper">
                    <h5><a href={'/home/posts/'+el}>Read more...</a></h5>
                    <div className="FavouriteBox">
                      <img src="/assets/heart.svg" type="image/svg+xml" alt="Favourite Button"/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
