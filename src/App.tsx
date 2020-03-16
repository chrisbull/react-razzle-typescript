import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import { Todos } from './Pages/Todos';
import { Home } from './Pages/Home';

const App = () => (
  <Switch>
    <Route path="/todos" component={Todos} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;
