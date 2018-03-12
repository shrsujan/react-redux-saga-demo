import store from '../store';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import Router from './Router';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
