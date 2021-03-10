import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Posts from './components/Posts';
import Post1 from './components/posts/Post1';
import Post2 from './components/posts/Post2';

export default class PostsRouter extends React.Component {
  render() {
    return(
      <Switch>
        <Route path="/home/posts" exact component={Posts}/>
        <Route path="/home/posts/post1" component={Post1}/>
        <Route path="/home/posts/post2" component={Post2}/>
      </Switch>
    )
  }
}
