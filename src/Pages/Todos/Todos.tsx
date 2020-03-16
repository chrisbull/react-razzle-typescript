import { v4 as UUID } from 'uuid';
import React, { Component, useState, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { RootState } from '../../Redux/types';
import { Todo } from './Todo';
import { ADD_TODO } from '../../Redux/actionTypes';

const mapState = (state: RootState) => ({
  todos: state.todos,
});

const mapDispatch = {
  createNewTodo: (content: string) => ({ type: ADD_TODO, payload: { content, id: UUID() } }),
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const Todos = (props: Props) => {
  const match = useRouteMatch();
  const [newTodo, setNewTodo] = useState('');

  const createNewTodo = useCallback(() => {
    props.createNewTodo(newTodo);
  }, [newTodo]);

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:todoId`}>
          <Todo />
        </Route>
        <Route exact path={match.path}>
          <h1>Todos</h1>
          <h3>Please select a topic.</h3>
          <ul>
            {props.todos.allIds.map((todoId) => {
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

export default connector(Todos);
