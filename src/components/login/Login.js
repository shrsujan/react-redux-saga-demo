import React, { Component } from 'react';
import { push } from 'react-router-redux';

import * as routes from '../../constants/routes';

import store from '../../store';

import Logo from '../common/Logo';
import LoginForm from './LoginForm';

class Login extends Component {
  state = {
    isLoggedIn: false
  };

  setLogin(bool) {
    this.setState({ isLoggedIn: bool });
  }

  componentDidMount() {
    if (!localStorage.getItem('access_token')) {
      this.setLogin(false);
    } else {
      this.setLogin(true);
      store.dispatch(push(routes.APP_ROOT));
    }
  }

  render() {
    let { isLoggedIn } = this.state;

    return !isLoggedIn ? (
      <div className="wrapper">
        <div className="login-wrapper">
          <div className="login-box">
            <Logo />
            <LoginForm />
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Login;
