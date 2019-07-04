import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const authMenu = (
      <div className="ui large borderless menu">
        <Link className="header item" to="/">Instaz</Link>
        <Link className="right floated item" to="/login">Login</Link>
        <Link className="item" to="/signup">Signup</Link>
      </div>
    );

    const userMenu = (
      <div className="ui large borderless menu">
        <Link className="header item" to="/">Instaz</Link>
      </div>
    );

    return(
      <div className="ui grid Header">
        <div className="computer only row">
          <div className="column">
            {
              this.props.currentUser ? userMenu : authMenu
            }
          </div>
        </div>

        <div className="tablet mobile only row">
          <div className="column">
            <div className="ui large borderless menu">
              <Link className="header item" to="/">Instaz</Link>
              <a id="mobile_item" className="item right floated"><i className="bars icon"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
