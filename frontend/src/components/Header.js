import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const authMenu = (
      <div className="ui large borderless menu">
        <Link className="header item" to="/">Instaz</Link>
        <Link className="right floated item" to="/auth/login">Login</Link>
        <Link className="item" to="/auth/signup">Signup</Link>
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
              this.user ? userMenu : authMenu
            }
          </div>
        </div>

        <div className="tablet mobile only row">
          <div className="column">
            <div className="ui large borderless menu">
              <Link className="header item">Instaz</Link>
              <a id="mobile_item" className="item right floated"><i className="bars icon"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  {}
)(Header);
