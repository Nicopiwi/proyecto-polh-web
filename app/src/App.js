import React from 'react';
import LoginScreen from './screens/loginScreen'
import DashboardScreen from './screens/dashboard'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/" render={(props)=>(
              !localStorage.getItem('userToken')?(<LoginScreen {...props}/>):(<Redirect to="/dashboard"></Redirect>)
            )}/>
          </Switch>
          <Route path="/dashboard" render={(props)=>(
            localStorage.getItem('userToken')?(<DashboardScreen {...props}/>):(<Redirect to="/"></Redirect>)
          )}/>
      </div>
    </Router>
  );
}

export default App;
