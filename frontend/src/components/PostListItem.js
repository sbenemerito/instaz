import React from 'react';
import { Link } from 'react-router-dom';

import CommentForm from './CommentForm';

class PostListItem extends React.Component {
  render() {
    const { post, isPreview } = this.props;
    const captionPreviewElem = ({ id, caption }) => (
      <span>
        {caption + '...'} <Link className="ui sub header" to={`/p/${id}`}>View full caption</Link>
      </span>
    );
    const postActionsElem = (user, post) => (
      <div className="content action-icons">
        <i
          onClick={() => this.props.likePost(post.id)}
          className={"clickable big heart like icon" + (post.is_liked ? " red" : "")}>
        </i>
        <i
          onClick={() => { document.getElementById(`comment-field${post.id}`).focus(); }}
          className="clickable big comment outline link icon">
        </i>
        <i className="clickable big share icon"></i>
        {
          // Show archive button for post owner
          post.author.username === user.username
          ? <i className="clickable right floated big archive link icon"></i>
          : null
        }
      </div>
    );

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
          this.props.showActions ? postActionsElem(this.props.currentUser, post) : null
        }
        <div className="relaxed content">
          <p className="ui sub header">{post.likes} likes</p>
          <p className="post-description">
            <Link className="ui left floated small header author" to={`/u/${post.author.username}`}>
              {post.author.username}
            </Link>
            {post.caption && post.caption.length > 120 && isPreview ? captionPreviewElem(post) : post.caption}
          </p>
          { post.comments.length > 0 ? <div className="ui divider"></div> : null }
          {
            post.comments.map((comment, index) => {
              // Only show up to 3 comments for posts in list
              return isPreview && index > 2 ? null : (
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
            isPreview && post.comments.length > 3
            ? <Link className="ui left floated sub header" to={`/p/${post.id}`}>View all comments</Link>
            : null
          }
        </div>
        {
          // Only show comment form for authenticated user
          this.props.showActions ? (
            <CommentForm post={post} addComment={this.props.addComment} elementId={`comment-field${post.id}`} />
          ) : null
        }
      </div>
    );
  }
}

export default PostListItem;
