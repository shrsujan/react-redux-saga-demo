import * as actions from '../../constants/actions';

// Worker triggering actionCreators
export function loginWatcher(session, resolve, reject) {
  return { type: actions.LOG_IN_WATCHER, payload: session, resolve, reject };
}
export function logoutWatcher() {
  return { type: actions.LOG_OUT_WATCHER, payload: null };
}
export function getUserProfileWatcher() {
  return { type: actions.GET_USER_PROFILE_WATCHER, payload: null };
}

// Redux state changing actionCreators
export function fillUserProfile(user) {
  return { type: actions.FILL_USER_PROFILE, payload: user };
}
export function authError(error) {
  return { type: actions.AUTH_ERROR, payload: error };
}
export function clearSession() {
  return { type: actions.CLEAR_SESSION, payload: null };
}
