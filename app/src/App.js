import React from 'react';
import LoginScreen from './screens/loginScreen'
import DashboardScreen from './screens/dashboard'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Route path="/" render={()=>(
            !localStorage.getItem('userToken')?(<LoginScreen/>):(<Redirect to="/dashboard"></Redirect>)
          )}/>
          <Route path="/dashboard" render={()=>(
            localStorage.getItem('userToken')?(<DashboardScreen/>):(<Redirect to="/"></Redirect>)
          )}/>
      </div>
    </Router>
  );
}

export default App;
