import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import PostsRouter from './PostsRouter';
import Login from './components/Login';
import Register from './components/Register';
import Fetch from './components/Fetch';

export default class HomeRouter extends React.Component {
  render() {
    return(
      <div className="MainContainer">
        <Header />
        <Switch>
          <Route path="/home" exact component={Home}/>
          <Route path="/home/fetch" component={Fetch}/>
          <Route path="/home/posts" component={PostsRouter}/>
          <Route path="/home/login" component={Login}/>
          <Route path="/home/register" component={Register}/>
        </Switch>
        <Footer />
      </div>
    )
  }
}
