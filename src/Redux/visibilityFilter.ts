import { SET_FILTER } from './actionTypes';
import { VISIBILITY_FILTERS } from '../constants';

export type VisibilityFilterState = 'all' | 'completed' | 'incomplete';

const initialState: VisibilityFilterState = VISIBILITY_FILTERS.ALL;

export const visibilityFilter = (state = initialState, action: any): VisibilityFilterState => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};
