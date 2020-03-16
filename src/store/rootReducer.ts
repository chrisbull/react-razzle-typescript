import { combineReducers } from 'redux';

import { todos } from '../modules/todos';

export const rootReducer = combineReducers({
  todos,
});
