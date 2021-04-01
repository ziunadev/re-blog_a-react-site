import React from 'react';

export default class Fetch extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      content: '',
      token: '',
      listResult: []
    }
    this.loginData = this.loginData.bind(this);
    this.addData = this.addData.bind(this);
    this.getData = this.getData.bind(this);
    this.getUserPost = this.getUserPost.bind(this);
    this.isAuthor = this.isAuthor.bind(this);
  }

  getUserPost() {
    fetch(
      'http://localhost:3030/api/v1/user/post',
      {
        headers: {
          'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4iLCJpYXQiOjE2MTU3Nzc5NjN9.JslKSp4r7sj4ImGzE0ekKyWr0NVwoth0KM2KA5FjTRI'
        }
      }
    )
    .then(async (res) => {
      if (res.status == 200) {
        const body = await res.json();

        console.log(body.data);
      } else {
        console.log('err');
      }
    })
    .catch((err) => {
      console.trace();
    })
  }

  getData() {
    fetch(
      'http://localhost:3030/api/v1/public/post'
    )
    .then(async (res) => {
      var listResult;
      if (res.status == 200) {
        const body = await res.json();
        listResult = body.data;
        } else {
        console.log('err');
      }
      this.setState({
        listResult: listResult
      })
    })
    .catch((err) => {
      console.trace();
    })
  }

  addData() {
    const data = JSON.stringify({
        title: this.state.title,
        content: this.state.content
      })
    fetch(
      'http://localhost:3030/api/v1/user/post',
      {
        method: 'POST',
        body: data,
        headers: {
          'content-type': 'application/json',
          'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4iLCJpYXQiOjE2MTU3Nzc5NjN9.JslKSp4r7sj4ImGzE0ekKyWr0NVwoth0KM2KA5FjTRI'
        }
      }
    )
    .then((res) => {
      if (res.status == 200) {
        console.log('ok');
      } else {
        console.log('!ok');
      }
    })
    .catch((err) => {
      console.trace();
    })
    this.setState({
      title: '',
      content: ''
    })
  }

  loginData() {
    fetch(
      'http://localhost:3030/api/v1/account/token',
      {
        method: 'POST',
        body: JSON.stringify({
          username: 'frontend_dev',
          password: 'react'
        }),
        headers: {
          'content-type': 'application/json'
        }
      }
    )
    .then(async (res) => {
      if (res.status == 200) {
        const body = await res.json();
        console.log(body);
      } else {
        console.log('error');
      }
    })
    .catch((err) => {
      console.trace();
    })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <button onClick={this.loginData}>Login</button>

        <div>
          <form>
            <label>Title</label>
            <input
              type="text"
              onChange={(ev) => this.setState({title: ev.target.value})}
              value={this.state.title}
            />
            <label>Content</label>
            <input
              type="text"
              onChange={(ev) => this.setState({content: ev.target.value})}
              value={this.state.content}
            />
            <button
              type="button"
              onClick={this.addData}
            >
              add
            </button>
            <button
              type="button"
              onClick={this.getData}
            >
              get
            </button>
            <button
              type="button"
              onClick={this.getUserPost}
            >
              get user post
            </button>
          </form>
          <ol>
            {this.state.listResult.map(
              (el) => <li>
                        <div>
                          <h1>{el.title}</h1>
                          <h3>{this.isAuthor(el)}</h3>
                          <p>{el.content}</p>
                        </div>
                      </li>
            )}
          </ol>
        </div>
      </div>
    )
  }

  isAuthor(el) {
    var author;
    switch (el.author_id) {
      case 1:
        author = "User 1";
        break;
      case 2:
        author = "User 2";
        break;
    }
    return author;
  }
}
