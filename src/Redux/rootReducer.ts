import { combineReducers } from 'redux';

import { todos } from './todos';
import { visibilityFilter } from './visibilityFilter';

// rootReducer.ts
export const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});
