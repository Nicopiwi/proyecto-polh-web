import React from 'react';
import LoginScreen from './screens/loginScreen'
import DashboardScreen from './screens/dashboard'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import store from './redux/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <Route exact path="/" render={(props)=>(
              !localStorage.getItem('userToken')?(<LoginScreen {...props}/>):(<Redirect to="/dashboard"></Redirect>)
            )}/>
            <Route path="/dashboard" render={(props)=>(
              localStorage.getItem('userToken')?(<DashboardScreen {...props}/>):(<Redirect to="/"></Redirect>)
            )}/>
            
        </div>
      </Router>
    </Provider>
  );
}

export default App;
