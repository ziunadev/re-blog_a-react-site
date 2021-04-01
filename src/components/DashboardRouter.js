import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import UserPosts from './UserPosts';
import Settings from './Settings';
import AddPost from './AddPost';
import EditPost from './EditPost';
import './Dashboard.css';


export class DashboardRouter extends React.Component {
  render() {
    if (this.props.isLogin) {
      return (
        <div className="ContentContainer">
          <div className="DashboardContainer">
            <div className="SidebarContainer">
              <div className="Sidebar">
                <Link to={'/'} className="title">re:blog</Link>
                <div className="navigation-button">
                  <ul>
                  <Link to={'/dashboard'}>
                    <li>
                        <div>
                          <img src="/assets/dashboard.svg"/>
                          Dashboard
                        </div>
                    </li>
                    </Link>
                    <Link to={'/dashboard/userposts'}>
                      <li>
                          <div>
                            <img src="/assets/posts.svg"/>
                            Posts
                            </div>
                      </li>
                    </Link>
                    <Link to={'/dashboard/settings'}>
                      <li>
                          <div>
                            <img src="/assets/profile-settings.svg"/>
                            Settings
                          </div>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div className="DashboardContent">
              <div className="content-navbar">
                <div className="user-info-bar">
                  <img src="/assets/search-circle.svg" />
                  <img src="/assets/profile-userb.svg" />
                </div>
              </div>
              <div className="user-content">
                <Switch>
                  <Route
                    path="/dashboard"
                    exact
                    component={Dashboard}
                  />
                  <Route
                    path="/dashboard/userposts"
                    exact
                    component={UserPosts}
                  />
                  <Route
                    path="/dashboard/userposts/add"
                    component={AddPost}
                  />
                  <Route
                    path="/dashboard/userposts/edit/:id"
                    component={EditPost}
                  />
                  <Route
                    path="/dashboard/settings"
                    component={Settings}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="Content-ContentContainer">
          <div className="DashboardContainer">
            <Link to={'/home'}>
              <h1>Cannot go to dashborad, login first</h1>
            </Link>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  };
};


export default connect(mapStateToProps)(DashboardRouter);
