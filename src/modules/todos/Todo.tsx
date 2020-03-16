import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../store/types';

const mapState = (state: RootState) => ({
  todos: state.todos,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function TodoComponent(props: Props) {
  const { todoId } = useParams();
  const todo = todoId && props.todos.byIds[todoId];
  return (
    <div>
      <h3>Requested todo IDs: {todoId}</h3>
      {todo && <div>{todo.content}</div>}
    </div>
  );
}

export const Todo = connector(TodoComponent);
