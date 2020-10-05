import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

// components
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

// route
import Login from './route/Login'
import Home from './route/Home'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
