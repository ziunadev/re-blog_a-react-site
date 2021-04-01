import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_AUTHENTICATED } from './constants/CONSTANTS'
// import './AppRouter.css';
import LandingPage from './components/LandingPage';
import HomeRouter from './HomeRouter';
import Todo from './components/Todo';
import DashboardRouter from './components/DashboardRouter';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import PostsRouter from './PostsRouter';
import Login from './components/Login';
// import Register from './components/Register'


// export default class AppRouter extends React.Component {
export class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var token = localStorage.getItem('storedToken')
    if (this.props.token == null) {
      this.props.userAuthenticated(token);
    }
  }

  render() {
    return(
      <div>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              component={LandingPage}
            />
            <Route
              path="/home"
              component={HomeRouter}
            />
            <Route
              path="/todo"
              component={Todo}
            />
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/dashboard"
              component={DashboardRouter}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userAuthenticated: function(storedToken) {
      dispatch(
        {
          type: USER_AUTHENTICATED,
          token: storedToken
        }
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
