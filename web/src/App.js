import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// components
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

// route
import SignUp from './route/SignUp'
import Login from './route/Login'
import Home from './route/Home'
import ShopSearch from './route/ShopSearch'
import NotFound from './route/NotFound'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/shops" component={ShopSearch} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
