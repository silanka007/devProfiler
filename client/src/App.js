import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Login, Register } from './components/auth';
import Navbar from './components/layouts/navbar';
import Landing from './components/layouts/landing';
import Alert from './components/layouts/alert';
import './App.css';
//redux imports
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken.utils';
import { userLoadedAction } from '../src/redux/actions/auth.action';
import PrivateRoute from './components/routing/privateRouting';
import Dashboard from './components/dashboard/dashboard';


if(localStorage.token){
  setAuthToken(localStorage.token);
}


function App() {

  useEffect(() => {
    store.dispatch(userLoadedAction())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch> 
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
