import { all } from 'redux-saga/effects';
import {
  loginActionWatcher,
  logoutActionWatcher,
  fetchSelfActionWatcher
} from '../sagas/session';

export default function* rootSaga() {
  yield all([
    loginActionWatcher(),
    logoutActionWatcher(),
    fetchSelfActionWatcher()
  ]);
}
