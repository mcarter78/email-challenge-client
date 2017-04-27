import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css';

injectTapEventPlugin();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login} />
      <Route path="/users/:id" component={Dashboard} />
    </Route>
  </Router>
), document.getElementById('root'));
