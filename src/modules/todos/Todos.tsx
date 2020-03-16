import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { v4 as UUID } from 'uuid';

import { RootState } from '../../store/types';
import { Todo } from './Todo';
import { ADD_TODO } from './actions';

// const mapState = (state: RootState) => ({
//   todos: state.todos,
// });

// const mapDispatch = {
//   createNewTodo: (content: string) => ({ type: ADD_TODO, payload: { content, id: UUID() } }),
// };

// const connector = connect(mapState, mapDispatch);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// type Props = PropsFromRedux & {};

export const Todos = () => {
  const match = useRouteMatch();
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const createNewTodo = useCallback(() => {
    dispatch({ type: ADD_TODO, payload: { content: newTodo, id: UUID() } });
  }, [newTodo]);

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:todoId`}>
          <Todo />
        </Route>
        <Route exact path={match.path}>
          <h1>Todos</h1>
          <h3>Please select a todo.</h3>
          <ul>
            {todos.allIds.map((todoId) => {
              return (
                <li key={`todo_${todoId}`}>
                  <Link to={`${match.path}/${todoId}`}>Todo: {todoId}</Link>
                </li>
              );
            })}
          </ul>

          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" name="todo" onChange={(e) => setNewTodo(e.target.value)} />
            <button title="Add Todo" onClick={createNewTodo}>
              Add Todo
            </button>
          </form>
        </Route>
      </Switch>
    </div>
  );
};
