import React from 'react';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  render() {
    const loggedInMenu = user => (
      <div className="sticky-menu">
        <div className="user-info">
          <Link className="ui medium header" to={`/u/${user.username}`}>
            <img className="ui avatar image" src={user.avatar} alt={`${user.username}'s avatar`} />
            {user.username}
          </Link>
        </div>
        <div className="ui hidden divider"></div>
        <Link className="ui labeled button add-button" tabIndex="0" to="/p/new">
          <div className="ui black button">
            <i className="plus square outline icon"></i> Add Post
          </div>
        </Link>
        <div className="ui vertical menu">
          <div className="item">
            <div className="ui input"><input type="text" placeholder="Search..." /></div>
          </div>
          <a className="item">
            <i className="user icon"></i> Profile
          </a>
          <a className="item">
            <i className="archive icon"></i> Archive
          </a>
          <a className="item">
            Messages
            <div className="ui label">0</div>
          </a>
          <a className="item" onClick={this.props.logoutUser}>
            <i className="sign-out icon"></i> Logout
          </a>
        </div>
      </div>
    );

    const guestMenu = (
      <div className="ui vertical menu sticky-menu">
        <div className="item">
          <div className="ui input"><input type="text" placeholder="Search..."/></div>
        </div>
        <Link className="item" to="/login">
          <i className="sign-in icon"></i> Login
        </Link>
        <Link className="item" to="/signup">
          <i className="user plus icon"></i> Signup
        </Link>
      </div>
    );

    return(
      <div className="four wide column computer only">
        {
          this.props.currentUser ? loggedInMenu(this.props.currentUser) : guestMenu
        }
      </div>
    );
  }
}

export default SideMenu;
