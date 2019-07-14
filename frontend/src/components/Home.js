import React from 'react';

import PostList from './PostList';
import SideMenu from './SideMenu';

class Home extends React.Component {

  render() {
    return (
      <div className="Home">
        <div className="ui container center aligned">
          <div className="ui three column stackable grid">
            <div className="two wide column computer only"></div>
            <PostList currentUser={this.props.currentUser} />
            <SideMenu currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
