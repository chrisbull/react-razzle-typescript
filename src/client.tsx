import App from './App';
import { BrowserRouter, useLocation } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './Redux/store';
import { RootState } from './Redux/types';

// temp placehoder for google analytics
const ga = {
  send: (config: any[]) => {},
};

console.log({
  window,
});

const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__ as RootState,
  });

function usePageViews() {
  const location = useLocation();
  React.useEffect(() => {
    ga.send(['pageview', location.pathname]);
  }, [location]);
}

const AnalyticsWrapper = ({ children }: PropsWithChildren<any>) => {
  usePageViews();
  return children;
};

hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <AnalyticsWrapper>
        <App />
      </AnalyticsWrapper>
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
