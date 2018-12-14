//@flow
import React from 'react';
import { hydrate } from 'react-dom';
import { configureStore } from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppActions } from 'actions';
import App from 'views/App/App';

const initialData = window.__INITIAL_DATA__ ? window.__INITIAL_DATA__ : {};

const renderApp = (store, Application) =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js', { scope: '/' })
      .then(() => console.log({ ServiceWorker: 'Installed' }));
  });
}

configureStore({
  initialState: initialData.state,
  middleware: [],
}).then((store) => {
  store.dispatch(AppActions.init());

  renderApp(store, App);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    if (module.hot) {
      module.hot.accept();
    }
  }
});
