import React from 'react';
import { connect } from 'react-redux';

import PostListItem from './PostListItem';
import { addComment, likePost, viewPost } from '../actions';

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
      <div className="ui two column stackable grid">
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
        <div className="six wide column computer only">
          <h1>Side Menu</h1>
        </div>
      </div>
    );

    return (
      <div className="Home">
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
  { addComment, likePost, viewPost }
)(PostDetail);
