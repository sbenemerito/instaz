import React from 'react';
import { Link } from 'react-router-dom';

class PostListItem extends React.Component {
  render() {
    const post = this.props.post;

    return(
      <div className="ui fluid card">
        <div className="content">
          <div className="right floated meta">{post.timesince_posted}</div>
          <Link className="ui left floated small header" to={`/user/${post.author.username}`}>
            <img className="ui avatar image" src={post.author.avatar} alt={`${post.author.username}'s avatar`} />
            {post.author.username}
          </Link>
        </div>
        <div className="image">
          <img src={post.image} alt={post.caption} />
        </div>
        <div className="content">
          <span className="right floated">
            <i className="heart outline like icon"></i> {post.likes} like(s)
          </span>
          <i className="comment icon"></i> {post.comments.length} comments
        </div>
        <div className="relaxed content">
          <Link className="ui left floated small header" to={`/user/${post.author.username}`}>
            {post.author.username}
          </Link> {post.caption}
        </div>
        <div className="extra content">
          <div className="ui large transparent left icon input">
            <i className="comment outline icon"></i>
            <input type="text" placeholder="Add Comment..." />
          </div>
        </div>
      </div>
    );
  }
}

export default PostListItem;
