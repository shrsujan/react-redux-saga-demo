import React from 'react';
import ReactDOM from 'react-dom';

import './public';

import * as serviceWorker from './registerServiceWorker';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
