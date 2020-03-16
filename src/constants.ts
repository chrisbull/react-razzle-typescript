import { VisibilityFilterState } from './Redux/visibilityFilter';

export const VISIBILITY_FILTERS: Record<string, VisibilityFilterState> = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
};
