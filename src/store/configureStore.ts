import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { isDev } from '../config';
import { rootReducer } from './rootReducer';
import { RootState } from './types';

interface StorePrams {
  initialState?: RootState;
  middleware?: any[];
}

export function configureStore({ initialState, middleware = [] }: StorePrams) {
  const composeEnhancers = isDev ? composeWithDevTools : compose;

  const _store = createStore(
    rootReducer,
    initialState,
    // @ts-ignore
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware))),
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => _store.replaceReducer(require('./rootReducer').default));
  }

  return _store;
}
