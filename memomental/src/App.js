import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import './Assets/css/default.min.css'
import Header from './components/headerComponent/header';
import Homepage from './components/pages/homePage';
import Cartes from './components/Cartes/cartes';
import Mycarte from './components/Cartes/mycartes';
import Addcarte from './components/Cartes/addcartes';
import Recto from './components/Cartes/addrecto';
import Verso from './components/Cartes/addverso';
import MyComponent from './httpRequest';
import { Switch } from 'react-router-dom';
import { Login } from './components/Login/Login.js';
import { Signup } from './components/Signup/Signup.js';
import { PrivateRoute } from './components/PrivateRoute.js';

class App extends Component{
  render(){
    return (
        <Router>

          <div className="App">
            <Header />
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/Login" component={Login}/>
              <Route exact path="/MyComponent" component={MyComponent}/>
              <Route exact path ="/Signup" component={Signup}/>
          </div>
            <div className="App-content">
                <Switch>
                    <PrivateRoute path='/cartes' component={Cartes}/>
                    <PrivateRoute path='/Mycarte' component={Mycarte}/>
                    <PrivateRoute path='/Addcarte' component={Addcarte}/>
                    <PrivateRoute path='/Recto' component={Recto}/>
                    <PrivateRoute path='/Verso' component={Verso}/>
                </Switch>
            </div>

        </Router>
    )
  }
}


export default App;
