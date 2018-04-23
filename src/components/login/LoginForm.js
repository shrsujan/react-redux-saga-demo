import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { loginWatcher } from '../../store/actionCreators/session';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: ''
    },
    isSubmitting: false
  };

  /**
   * simple validation logic is used here
   * formik can be used for forms
   * yup validation library can be used with formik to validate the forms
   *
   * @returns {Promise}
   */
  validate = () => {
    let { email, password } = this.state;

    return new Promise((resolve, reject) => {
      let errors = {};

      if (!email) errors.email = 'Please enter your email address';
      if (!password) errors.password = 'Please enter your password';

      let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email && !emailRegex.test(email)) errors.email = 'Please enter a valid email address';
      if (password && password.length < 8) errors.password = 'Password must be greater that or equalt to 8 characters';
      if (Object.keys(errors).length > 0) {
        reject(errors);
      } else {
        resolve();
      }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.validate()
      .then(() => {
        this.setState({
          errors: {},
          isSubmitting: true
        });
        new Promise((resolve, reject) => {
          this.props.loginWatcher({ ...this.state }, resolve, reject);
        }).catch(e => {
          this.setState({
            isSubmitting: false
          });
        });
      })
      .catch(errors => {
        this.setState({ errors });
      });
  };

  handleEmailChange = event => {
    event.preventDefault();
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    event.preventDefault();
    this.setState({
      password: event.target.value
    });
  };

  render() {
    let { email, password, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={this.handleEmailChange} />
        <span className="error">{errors.email}</span>
        <input type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
        <span className="error">{errors.password}</span>
        <button type="submit" className="success">
          {this.state.isSubmitting ? (
            <div className="loader">
              <span className="loader-inner" />
            </div>
          ) : (
            `Login`
          )}
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  loginWatcher: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ loginWatcher }, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
