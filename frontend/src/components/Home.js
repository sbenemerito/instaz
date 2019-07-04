import React from 'react';
import PostList from './PostList';

class Home extends React.Component {

  render() {
    return (
      <div className="Home">
        <div className="ui container center aligned">
          <div className="ui two column stackable grid">
            <PostList />
            <div className="six wide column computer only">
              <h1>Side Menu</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
