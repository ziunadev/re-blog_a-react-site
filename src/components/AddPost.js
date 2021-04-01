import React from 'react';


export default class AddPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentTitle: '',
      contentBody: ''
    }

    this.submitContent = this.submitContent.bind(this);
  }

  submitContent() {
    const data = JSON.stringify(
      {
        title: this.state.contentTitle,
        content: this.state.contentBody
      }
    );
    const token = localStorage.getItem('storedToken');
    fetch(
      'http://localhost:3030/api/v1/user/post',
      {
        method: 'POST',
        body: data,
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${token}`
        }
      }
    ).then((res) => {
      if (res.status == 200) {
        console.log('ok');
        this.setState(
          {
            contentTitle: '',
            contentBody: ''
          }
        )
      } else {
        alert(`Cannot add Data, error : ${res.status}`)
      }
    }).catch((err) => alert('Cannot add Data'))
  }

  render() {
    return (
      <div className="add-post">
        <form>
          <div className="content-title">
            <label>Title</label>
            <input
              type="text"
              onChange={(ev) => this.setState({contentTitle: ev.target.value})}
              value={this.state.contentTitle}
            />
          </div>
          <div className="content-body">
            <label>Content</label>
            <textarea
              type="text"
              onChange={(ev) => this.setState({contentBody: ev.target.value})}
              value={this.state.contentBody}
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
