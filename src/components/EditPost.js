import React from 'react';
import Loader from './Loader';


export default class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      isLoading: false,
      title: '',
      content: ''
    }

    this.getEditPost = this.getEditPost.bind(this);
    this.submitContent = this.submitContent.bind(this);
  }

  getEditPost() {
    const token = localStorage.getItem('storedToken');
    this.setState(
      {isLoading: true},
      () => {
        fetch(
          'http://localhost:3030/api/v1/user/post/'+this.props.match.params.id,
          {
            headers: {
              'authorization': `bearer ${token}`
            }
          }
        )
        .then(async (res) => {
          var post;
          if (res.status == 200) {
            const body = await res.json()
            post = body.data;
            console.log(post);
            console.log('ok');
          } else {
            post = null;
            console.log('error');
          }
          this.setState(
            {
              post: post,
              title: post.title,
              content: post.content,
              isLoading: false
            }
          )
        }).catch((er) => this.setState(
          {
            post: null,
            isLoading: false
          }
        ))
      }
    )
  }

  submitContent() {
    const token = localStorage.getItem('storedToken');
    fetch(
      'http://localhost:3030/api/v1/user/post/'+this.props.match.params.id,
      {
        method: 'PUT',
        body: JSON.stringify(
          {
            title: this.state.title,
            content: this.state.content
          }
        ),
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${token}`
        }
      }
    ).then((res) => {
      if (res.status == 200) {
        console.log('ok');
      } else {
        console.log('failed');
      }
    }).catch((err) => {
      console.log('failed')
    })
  }

  componentDidMount() {
    this.getEditPost();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      )
    } else {
      return (
        <div className="add-post">
          {console.log(this.state.post)}
          <form>
            <div className="content-title">
              <label>Title</label>
              <input
                type="text"
                onChange={(ev) => this.setState({title: ev.target.value})}
                value={this.state.title}
              />
            </div>
            <div className="content-body">
              <label>Content</label>
              <textarea
                type="text"
                onChange={(ev) => this.setState({content: ev.target.value})}
                value={this.state.content}
              />
            </div>
            <div className="submit-button">
              <button
                type="button"
                onClick={this.submitContent}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )
    }
  }
}
