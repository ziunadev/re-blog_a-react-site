import React from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';
import Loader from './Loader';
// import './../assets/profile-user.svg'

// const userImage = require('./assets/profile-userb.svg');s
// const favouriteButton = require('./assets/heart_baru.svg')

export default class Posts extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      isLoading: false,
      isError: false,
      errorCode: ''
    }

    this.getPosts = this.getPosts.bind(this);
  }

  getPosts() {
    this.setState(
      {isLoading: true},
      () => {
        fetch(
          'http://localhost:3030/api/v1/public/post'
        ).then(async (res) => {
          var posts;
          var error;
          if (res.status == 200) {
            const body = await res.json();

            posts = body.data;
            error = false;
          } else {
            posts = [];
            error = true;
          }
          this.setState(
            {
              posts: posts,
              isLoading: false,
              isError: error,
              errorCode: res.status
            }
          )
        }).catch((err) => this.setState(
            {
              posts: [],
              isLoading: false,
              isError: true
            }
          )
        )
      }
    )
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      )
    } else {
      if (this.state.isError) {
        return (
          <div className="ContentContainer">
            <div className="ErrorMessage">
              <div className="error-code-wrapper">
                <div className="left-error-code">
                  <span className="error-code">{this.state.errorCode}</span>
                  <span className="error-bar">&#124;</span>
                </div>
                <span className="error-code"></span>
              </div>
              <h1 className="header-error">Cannot get Post, check your internet</h1>
            </div>
          </div>
        )
      } else {
        return (
          <div className="ContentContainer">
            <div className="PostContentsContainer">
              <div className="PostsContents">
              <h1>Posts</h1>
              <div className="Spacer"></div>
                {this.state.posts.map((el) => (
                  <div className="PostWrapper">
                    <div className="UserWrapper">
                      <img alt="User" src='/assets/profile-userb.svg' className="UserImage"/>
                      <div className="UserInfo">
                        <h3 className="UserName">user{el.author_id}.login@email.com</h3>
                        <h5 classNane="UploadDate">Some day in March, 2021</h5>
                      </div>
                    </div>
                    <div className="ContentWrapper">
                      <h4>
                        <Link to={"/home/post/"+el.id}>{el.title}</Link>
                      </h4>
                      <p>
                        <Link to={"/home/post/"+el.id}>{el.content}</Link>
                      </p>
                      <div className="ReadMoreWrapper">
                        <h5>
                          <Link to={'/home/post/'+el.id}>Read more...</Link>
                          </h5>
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
  }
}
