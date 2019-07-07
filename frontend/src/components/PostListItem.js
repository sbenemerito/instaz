import React from 'react';
import { Link } from 'react-router-dom';

class PostListItem extends React.Component {
  render() {
    const post = this.props.post;

    return(
      <div className="ui fluid card">
        <div className="content">
          <Link className="ui right floated sub header" to={`/p/${post.id}`}>{post.timesince_posted} ago</Link>
          <Link className="ui left floated small header" to={`/u/${post.author.username}`}>
            <img className="ui avatar image" src={post.author.avatar} alt={`${post.author.username}'s avatar`} />
            {post.author.username}
          </Link>
        </div>
        <div className="image">
          <img src={post.image} alt={post.caption} />
        </div>
        {
          // Only show action icons for authenticated user
          this.props.showActions ? (
            <div className="content action-icons">
              <i className="clickable big heart outline like icon"></i>
              <i className="clickable big comment outline link icon"></i>
              <i className="clickable big share link icon"></i>
            </div>
          ) : null
        }
        <div className="relaxed content">
          <p className="ui sub header">{post.likes} likes</p>
          <p><Link className="ui left floated small header" to={`/u/${post.author.username}`}>{post.author.username}</Link> {post.caption}</p>
          <div className="ui divider"></div>
          {
            post.comments.map((comment, index) => {
              // Only show up to 3 comments
              return index > 2 ? null : (
                <p key={comment.id}>
                  <Link className="ui left floated small header" to={`/u/${comment.author.username}`}>
                    {comment.author.username}
                  </Link>
                  {comment.message}
                </p>
              )
            })
          }
          {
            post.comments.length > 3 ? <Link className="ui left floated sub header" to={`/p/${post.id}`}>View all comments</Link> : null
          }
        </div>
        {
          // Only show comment form for authenticated user
          this.props.showActions ? (
            <div className="extra content">
              <div className="ui large transparent left icon input">
                <i className="comment outline icon"></i>
                <input type="text" placeholder="Add Comment..." />
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default PostListItem;
