import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import './AppRouter.css';
import LandingPage from './components/LandingPage';
import HomeRouter from './HomeRouter';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import PostsRouter from './PostsRouter';
// import Login from './components/Login';
// import Register from './components/Register'


export default class AppRouter extends React.Component {
  render() {
    return(
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/home" component={HomeRouter}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
