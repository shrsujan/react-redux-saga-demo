import session from './session';
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

const rootReducer = combineReducers({ session, router });

export default rootReducer;
