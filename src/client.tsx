import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AnalyticsProvider } from './modules/analytics';
import { configureStore } from './store/configureStore';
import { RootState } from './store/types';
import App from './App';

const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__ as RootState,
  });

hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}

if (!window.store) {
  window.store = store;
}
