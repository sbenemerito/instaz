import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import PostDetail from './PostDetail';
import { logoutUser } from '../actions';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header currentUser={this.props.currentUser} logoutUser={this.props.logoutUser} />

        <Switch>
          <Route path="/" exact component={() => <Home currentUser={this.props.currentUser}/>} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/p/:id" component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentUser: state.currentUser }
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(App);
