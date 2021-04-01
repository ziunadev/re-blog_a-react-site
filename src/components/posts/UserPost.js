import React from 'react';
import Loader from '../Loader';
// import { connect } from 'react-redux';
import './Post12.css';

export default class UserPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      isLoading: true,
      result: null,
      errorCode: null
    }
    this.getPostContent = this.getPostContent.bind(this);
    this.isAuthor = this.isAuthor.bind(this);
  }

  getPostContent() {
    this.setState(
      {isLoading: true},
      () => {
        fetch(
          'http://localhost:3030/api/v1/public/post/'+this.props.match.params.id
        )
        .then(async (res) => {
          var post;
          var result;
          if (res.status == 200) {
            const body = await res.json();
            post = body.data;
            result = 'ok';
          } else {
            post = null
            result = 'error';
          }
          this.setState(
            {
              post: post,
              isLoading: false,
              result: result,
              errorCode: res.status
            }
          )
        })
        .catch((err) => this.setState(
          {
            post: null,
            isLoading: false,
            result: null,
            errorCode: err.status
          }
        ))
      }
    )
  }

  componentDidMount() {
    this.getPostContent();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      )
    } else {
      if (this.state.result == null || this.state.post == null) {
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
        if (this.state.result == 'ok') {
          return (
            <div className="ContentContainer">
              <div className="TitleContainer">
                <div className="UserandTitle">
                  <h1>{this.state.post.title}</h1>
                  <div className="ContentUser">
                    <img
                      src='/assets/profile-userw.svg'
                      alt="Content User"
                    />
                    <div className="UserInfoPosts">
                      <h3>user{this.state.post.author_id}.login@email.com</h3>
                      <h5>Some day in March, 2021</h5>
                    </div>
                   </div>
                </div>
              </div>
              {/*<h4>{this.isAuthor()}</h4>*/}
              <div className="post-container">
                <div className="main-content">
                  <p>{this.state.post.content}</p>
                </div >
                <div className="content-comment">
                  <form>
                    <label>Comment</label>
                    <div className="comment-and-submit">
                      <input
                        type="text"
                      />
                      <button
                        type="button"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )
        } else if (this.state.result == 'error') {
          return (
            <div>
              <span>{this.state.errorCode}</span>
              <h1>Could not resolve data</h1>
            </div>
          )
        }
      }
    }
  }

  isAuthor() {
    var author;
    switch (this.state.post.author_id) {
      case 1:
        author = "User 1";
        break;
      case 2:
        author = "User 2";
        break;
      default:
        author = "No User listed";
        break;
    }
    return author;
  }
}
