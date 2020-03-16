import { ADD_TODO, TOGGLE_TODO } from './actionTypes';

export interface ITodo {
  content: any;
  completed: boolean;
}

export interface TodosState {
  allIds: string[];
  byIds: Record<string, ITodo>;
}

const initialState: TodosState = {
  allIds: [],
  byIds: {},
};

export function todos(state = initialState, action: any): TodosState {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false,
          },
        },
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed,
          },
        },
      };
    }
    default:
      return state;
  }
}
