// @flow
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from 'reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import { all } from 'redux-saga/effects';
import getSagas from 'sagas';
import { hibernateStore } from './serializer';

type StoreT = {
  initialState: {},
  middleware: Array<() => void>,
};

export const configureStore = ({ initialState, middleware = [] }: StoreT = {}) => {
  let rootTask;

  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [],
    });

  const rootReducer = createRootReducer();
  const composeEnhancers = devtools || compose;

  const sagaMiddleware = createSagaMiddleware();
  if (!process.browser) {
    const store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(...[sagaMiddleware].concat(...middleware)))
    );

    rootTask = sagaMiddleware.run(function*() {
      yield all(getSagas());
    });
    store.close = () => {
      store.dispatch(END);
      return rootTask.done;
    };
    return store;
  }
  if (window.store) {
    return new Promise((resolve) => resolve(window.store));
  }

  return hibernateStore(initialState).then((persistedState) => {
    const store = createStore(
      rootReducer,
      persistedState,
      composeEnhancers(applyMiddleware(...[sagaMiddleware].concat(...middleware)))
    );

    rootTask = sagaMiddleware.run(function*() {
      yield all(getSagas());
    });

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index').default;
        store.replaceReducer(nextRootReducer);
      });

      module.hot.accept('../sagas', () => {
        const getNewSagas = require('../sagas/index').default;
        rootTask.cancel();
        rootTask.done.then(() => {
          rootTask = sagaMiddleware.run(function* replacedSaga() {
            yield all(getNewSagas());
          });
        });
      });
    }
    return store;
  });
};

export default configureStore;
