import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './rootReducer';
import { RootState } from './types';

interface StorePrams {
  initialState?: RootState;
  middleware?: any[];
}

function configureStore({ initialState, middleware = [] }: StorePrams) {
  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

  const composeEnhancers = devtools || compose;

  const _store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware))),
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => _store.replaceReducer(require('./rootReducer').default));
  }

  return _store;
}

export default configureStore;
