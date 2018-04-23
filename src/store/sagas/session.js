import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

// import axios from '../../utils/axios';
import * as alert from '../../utils/alert';
import * as actions from '../../constants/actions';

import { fillUserProfile, authError, clearSession } from '../actionCreators/session';

/**
 * Login Operation using saga
 */
// Login API
function loginApi(authParams) {
  /* return axios.request({
    method: 'post',
    url: `/oauth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: authParams
  }); */

  // mimicking above axios call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (authParams.email === 'test@test.com' && authParams.password === 'test1234') {
        resolve({
          data: {
            access_token: '123-456-789-0000'
          }
        });
      } else {
        reject({
          message: 'Email/Password incorrect'
        });
      }
    }, 2000);
  });
}
// Saga function that handles the side effect when the loginActionWatcher is triggered
export function* loginActionEffect(loginAction) {
  let { payload, resolve, reject } = loginAction;

  try {
    let { data } = yield call(loginApi, payload);

    Object.keys(data).forEach(key => {
      localStorage.setItem(key, data[key]);
    });
    alert.success('Welcome to the App!');
    yield put(push('/'));
    if (resolve) resolve();
  } catch (e) {
    alert.error(e.message || 'Authentication Error');
    yield put(authError(e));
    if (reject) reject(e);
  }
}
// Saga function that is initiated in the beginning to be able to listen to LOG_IN_WATCHER action
export function* loginActionWatcher() {
  yield takeLatest(actions.LOG_IN_WATCHER, loginActionEffect);
}

/**
 * Fetch Self Operation using saga
 */
// Fetch Self API
function fetchSelfApi(authParams) {
  /* return axios.request({
    method: 'get',
    url: `/users/self`,
    headers: {
      'Content-Type': 'application/json'
    }
  }); */

  // mimicking above axios call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        firstName: 'test',
        lastName: 'tester',
        email: 'test@test.com',
        address: 'testington',
        phoneNumber: '1234567890'
      };

      resolve(user);
    }, 2000);
  });
}
// Saga function that handles the side effect when the fetchSelfActionWatcher is triggered
export function* fetchSelfActionEffect(fetchSelfAction) {
  try {
    let user = yield call(fetchSelfApi);

    yield put(fillUserProfile(user));
    yield put(push('/'));
  } catch (e) {
    alert.error(e.message || 'Fetch Self API Error');
    yield put(authError(e));
  }
}
// Saga function that is initiated in the beginning to be able to listen to GET_USER_PROFILE_WATCHER action
export function* fetchSelfActionWatcher() {
  yield takeLatest(actions.GET_USER_PROFILE_WATCHER, fetchSelfActionEffect);
}

/**
 * Logout Operation using saga
 */
// Saga function that handles the side effect when the logoutActionWatcher is triggered
export function* logoutActionEffect() {
  try {
    localStorage.clear();
    yield put(clearSession());
    yield put(push('/login'));
  } catch (e) {
    yield put(authError(e));
  }
}
// Saga function that is initiated in the beginning to be able to listen to LOG_OUT_WATCHER action
export function* logoutActionWatcher() {
  yield takeLatest(actions.LOG_OUT_WATCHER, logoutActionEffect);
}
