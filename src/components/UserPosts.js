import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './Loader';

const token = localStorage.getItem('storedToken');
export class UserPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      getPostsResult: null,
      isLoading: false
    }

    this.getUserPosts = this.getUserPosts.bind(this);
    this.deleteUserPost = this.deleteUserPost.bind(this);
  }

  getUserPosts() {
    this.setState(
      {isLoading: true},
      () => {
        fetch(
          'http://localhost:3030/api/v1/user/post',
          {
            headers: {
              'authorization': 'bearer '+token
            }
          }
        )
        .then(async (res) => {
          var posts;
          var result;
          var loading;
          if (res.status == 200) {
            const body = await res.json();
            posts = body.data;
            result = 'success';
            loading = false;
          } else {
            posts = [];
            result = 'failed';
            loading = false;
          }
          this.setState(
            {
              posts: posts,
              getPostsResult: result,
              isLoading: loading
            }
          )
        }).catch((err) => this.setState(
          {
            getPostsResult: 'failed',
            posts: [],
            isLoading: false
          }
        ))
      }
    )
  }

  deleteUserPost(index) {
    fetch(
      'http://localhost:3030/api/v1/user/post/'+index,
      {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${token}`
        }
      }
    ).then((res) => {
      if (res.status == 200 || res.status == 204) {
        this.getUserPosts();

      } else {
        console.log('failed');
      }
    }).catch((err) => console.log('failed'))
  }

  componentDidMount() {
    this.getUserPosts();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      )
    } else {
      if (this.state.getPostsResult == 'success') {
        return (
          <div>
            {this.state.posts.map((el) => (
              <div className="user-posts-contents">
                <div className="every-post-content">
                  <div  className="main-posts-wrapper">
                    <div className="content-id">
                      <span>{el.id}</span>
                    </div>
                    <div className="per-post-content-title">
                      <div className="per-post-title">
                        <h3>Title</h3>
                        <Link to={'/home/post/'+el.id}>{el.title}</Link>
                      </div>
                      <div className="content">
                        <h3>Content</h3>
                        <Link to={'/home/post/'+el.id}>{el.content}</Link>
                      </div>
                    </div>
                  </div>
                  <div className="delete-edit-button">
                    <Link className="edit-button" to={'/dashboard/userposts/edit/'+el.id}>Edit</Link>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => this.deleteUserPost(el.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="add-button-wrapper">
              <button
              className="add-button"
              onClick={() => this.props.history.push('/dashboard/userposts/add')}
              >
              New
              </button>
            </div>
          </div>
        )
      } else {
        return (
          <h1>Gagal</h1>
        )
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(UserPosts);
