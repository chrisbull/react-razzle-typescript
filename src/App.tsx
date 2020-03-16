import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Todos } from './modules/todos';
import { Home } from './modules/home';

import './App.css';

const App = () => (
  <Switch>
    <Route path="/todos" component={Todos} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;
