import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Login, Register } from './components/auth';
import Navbar from './components/layouts/navbar';
import Landing from './components/layouts/landing';
import './App.css';
//redux imports
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch> 
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
