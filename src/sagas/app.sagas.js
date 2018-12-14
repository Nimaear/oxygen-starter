// @flow
import { takeLatest, select } from 'redux-saga/effects';
import { AppActionTypes } from 'actions';
import persistStore from 'store/serializer';

function* init() {}

function* persist() {
  const state = yield select();
  persistStore(state);
}

export default [takeLatest(AppActionTypes.INIT, init), takeLatest(AppActionTypes.PERSIST_STORE, persist)];
