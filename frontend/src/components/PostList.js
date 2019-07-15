import React from 'react';
import { connect } from 'react-redux';

import { addComment, fetchPosts, likePost } from '../actions';
import PostListItem from './PostListItem';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return(
      <div className="left aligned nine wide computer sixteen wide mobile column post-list">
        {
          this.props.posts.map(post => {
            return(
              <PostListItem
                key={post.id}
                post={post}
                currentUser={this.props.currentUser}
                addComment={this.props.addComment}
                likePost={this.props.likePost}
                showActions={this.props.currentUser ? true : false}
                isPreview={true} />
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(
  mapStateToProps,
  { addComment, fetchPosts, likePost }
)(PostList);
