import React from 'react';
import { history } from '../store';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import * as routes from '../constants/routes';

import Login from './login';
import AppRoot from './appRoot';
import PrivateRoute from './common/PrivateRoute';

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.LOGIN} component={Login} />
      <PrivateRoute path={routes.APP_ROOT} component={AppRoot} />
    </Switch>
  </ConnectedRouter>
);

export default Router;
