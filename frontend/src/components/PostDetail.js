import React from 'react';
import { connect } from 'react-redux';

import PostListItem from './PostListItem';
import SideMenu from './SideMenu';
import { addComment, likePost, logoutUser, viewPost } from '../actions';

class PostDetail extends React.Component {
  componentDidMount() {
    this.props.viewPost(this.props.match.params.id);
  }

  render() {
    const loadingDOM = (
      <div className="ui segment loading-div">
        <div className="ui active inverted dimmer">
          <div className="ui massive text loader">Loading</div>
        </div>
      </div>
    );

    const postDOM = post => (
      <div className="ui three column stackable grid">
        <div className="two wide column computer only"></div>
        <div className="left aligned nine wide computer sixteen wide mobile column">
          <PostListItem
            key={post.id}
            post={post}
            currentUser={this.props.currentUser}
            addComment={this.props.addComment}
            likePost={this.props.likePost}
            showActions={this.props.currentUser ? true : false}
            isPreview={false} />
        </div>
        <SideMenu currentUser={this.props.currentUser} logoutUser={this.props.logoutUser} />
      </div>
    );

    return (
      <div className="PostDetail">
        <div className="ui container center aligned">
          {
            this.props.currentPost
            ? postDOM(this.props.currentPost)
            : loadingDOM
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentPost, currentUser } = state;
  return { currentPost, currentUser };
}

export default connect(
  mapStateToProps,
  { addComment, likePost, logoutUser, viewPost }
)(PostDetail);
