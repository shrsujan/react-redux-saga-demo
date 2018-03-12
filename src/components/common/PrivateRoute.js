import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as routes from '../../constants/routes';

/**
 * Component to authenticate routes.
 */
class PrivateRoute extends Component {
  state = {
    isLoggedIn: true
  };

  setLogin(bool) {
    this.setState({ isLoggedIn: bool });
  }

  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.setLogin(false);
    } else {
      this.setLogin(true);
    }
  }

  render() {
    let { isLoggedIn } = this.state;

    return isLoggedIn ? <Route {...this.props} /> : <Redirect to={routes.LOGIN} />;
  }
}

export default PrivateRoute;
