import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import UserDetails from './UserDetails';
import { getUserProfileWatcher, logoutWatcher } from '../../store/actionCreators/session';

class AppRoot extends Component {
  componentDidMount() {
    this.props.getUserProfileWatcher();
  }

  logout = () => {
    this.props.logoutWatcher();
  }

  render() {
    const { session } = this.props;

    return (
      <div className="wrapper">
        <div className="login-box">
          <h1>AppRoot</h1>
          {
            session.user ?
              <UserDetails user={this.props.session.user} /> :
              <div />
          }
          <button className="error" onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  }
}

AppRoot.propTypes = {
  session: PropTypes.object,
  getUserProfileWatcher: PropTypes.func,
  logoutWatcher: PropTypes.func
};

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => bindActionCreators({ getUserProfileWatcher, logoutWatcher }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
