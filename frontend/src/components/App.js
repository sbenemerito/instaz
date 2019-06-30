import React from 'react';
import { withRouter } from 'react-router-dom';
import PostList from './PostList';

class App extends React.Component {
  render() {
    return (
      <div className="ui container center aligned App">
        <h1>Instaz</h1>
        <div className="ui two column stackable grid">
          <PostList />
          <div className="six wide column computer only">
            <h1>Side Menu</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
