import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  USER_AUTHENTICATED,
  ADD_USERNAME
} from '../constants/CONSTANTS';
import Loader from './Loader';
import './Login.css';


export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isError: false,
      message: '',
      isLoading: false
    }

    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin() {
    this.setState(
      {isLoading: true},
      () => {
        fetch(
          'http://localhost:3030/api/v1/account/token',
          {
            method: 'POST',
            body: JSON.stringify(
              {
                'username': this.state.username,
                'password': this.state.password
              }
            ),
            headers: {
              'content-type': 'application/json'
            }
          }
        )
        .then(async (res) => {
          if (res.status == 200) {
            const data = await res.json()
            this.props.userAuthenticated(data.token);
            localStorage.setItem('storedToken', data.token);
            this.setState({isLoading: false})
            this.props.history.push('/dashboard')
          } else if (res.status == 403 && (this.state.username == '' && this.state.password == '')) {
            this.setState({
              message: 'Login failed, please fill your Username or Password',
              isError: true,
              isLoading: false
            })
          } else if (res.status == 403) {
            this.setState({
              message: 'Login failed, no account matched data',
              isError: true,
              isLoading: false
            })
          }
        })
        .catch((err) => {
          console.trace();
          this.setState({
            message: 'Unchaught error!, Try refresh your browser',
            isError: true,
            isLoading: false
          })
        })
      }
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      )
    } else {
      if (this.state.isError) {
        return (
          <h1>{this.state.message}</h1>
        )
      } else {
        return(
          <div className="ContentContainer">
            <div className="login-container">
              <div className="login-wrapper">
                <div className="left-content">
                  <span>
                    <Link to={'/'}>re:blog</Link>
                  </span>
                  <p>Place where you can write whatever you thought, it's literally whatever</p>
                </div>
                <div className="right-content">
                  <div className="greeter">
                    <h2>Welcome!</h2>
                    <h3>Sign in to your account</h3>
                  </div>
                  <form>
                    <div className="UserLogin">
                      <label>Username</label>
                      <input
                        type="text"
                        onChange={(ev) => this.setState({username: ev.target.value})}
                      />
                    </div>
                    <div className="UserPassword">
                      <label>Password</label>
                      <input
                        type="password"
                        onChange={(ev) => this.setState({password: ev.target.value})}
                      />
                    </div>
                    <span>Forgot Password</span>
                    <button
                      type="button"
                      onClick={this.submitLogin}
                    >
                      Login
                    </button>
                    {/*<button
                      type="button"
                      onClick={() => console.log(this.state)}
                    >
                      Debug
                    </button>*/}
                  </form>
                </div>
              </div>
            </div>
            {console.log(this.props)}
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    token: state.token
    // storedToken: state.storedToken
    // username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userAuthenticated: (token) => {
      dispatch({
        type: USER_AUTHENTICATED,
        token: token
      })
    }
    // passingUserName: (username) => {
    //   dispatch({
    //     type: ADD_USERNAME,
    //     username: username
    //   })
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
