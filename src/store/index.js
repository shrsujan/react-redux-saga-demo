import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, compose, applyMiddleware } from 'redux';

import rootSaga from './sagas';
import reducers from './reducers';

/**
 * History of choice
 * Browser history is used in this case
 */
const history = createHistory();

/**
 * Saga Middleware
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Middlewares for redux
 * For intercepting and dispatching navigation actions
 */
const historyMiddleware = routerMiddleware(history);
let middlewares;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  middlewares = applyMiddleware(historyMiddleware, sagaMiddleware);
} else {
  middlewares = applyMiddleware(logger, historyMiddleware, sagaMiddleware);
}

const store = createStore(
  reducers,
  compose(
    middlewares,
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' &&
    process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension()
      : f => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;

export { history };
