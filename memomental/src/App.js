import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './Assets/css/default.min.css'
import Homepage from './components/pages/homePage';
import Cartes from './components/cards/homeCards';
import Mycarte from './components/cards/myCards';
import Addcarte from './components/cards/addcartes';
import gcard from './components/cards/managCards';
import { Switch } from 'react-router-dom';
import { signup } from './components/signup/signup.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import NavBar from "./components/headerComponent/header";


class App extends Component{
  render(){
    return (
        <Router>

          <div className="App">
              <NavBar/>
              <Route exact path="/" component={Homepage}/>
              <Route exact path ="/signup" component={signup}/>
          </div>
            <div className="App-content">
                <Switch>
                    <PrivateRoute path='/cartes' component={Cartes}/>
                    <PrivateRoute path='/Mycarte' component={Mycarte}/>
                    <PrivateRoute path='/Addcarte' component={Addcarte}/>
                    <PrivateRoute path='/gcard' component={gcard}/>
                </Switch>
            </div>

        </Router>
    )
  }
}


export default App;
