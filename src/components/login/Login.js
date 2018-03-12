import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import * as routes from '../../constants/routes';

import Logo from '../common/Logo';
import LoginForm from './LoginForm';

class Login extends Component {
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

    return isLoggedIn ?
      <Redirect to={routes.APP_ROOT} /> :
      (
        <div className="wrapper">
          <div className="login-wrapper">
            <div className="login-box">
              <Logo />
              <LoginForm />
            </div>
          </div>
        </div>
      );
  }
}

export default Login;
