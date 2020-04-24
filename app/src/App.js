import React from 'react';
import LoginScreen from './screens/loginScreen'
import DashboardScreen from './screens/dashboard'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import COLORS from './colorPalette'

const theme = createMuiTheme({palette: {
    primary: {main: COLORS.primary },
    secondary: {main: COLORS.secondary},
    error: {main: COLORS.accent }
  }
    
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
