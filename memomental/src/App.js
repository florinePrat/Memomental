import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './Assets/css/default.min.css'
import homePage from './components/pages/homePage';
import card from './components/cards/homeCards';
import myCard from './components/cards/myCards';
import addCard from './components/cards/addCards';
import gcard from './components/cards/managCards';
import { Switch } from 'react-router-dom';
import { signup } from './components/signup/signup.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import NavBar from "./components/headerComponent/header";

// class App call all components and verify if login for some pages with PrivateRoute
class App extends Component{
  render(){
    return (
        <Router>

          <div className="App">
              <NavBar/>
              <Route exact path="/" component={homePage}/>
              <Route exact path ="/signup" component={signup}/>
          </div>
            <div className="App-content">
                <Switch>
                    <PrivateRoute path='/card' component={card}/>
                    <PrivateRoute path='/myCard' component={myCard}/>
                    <PrivateRoute path='/addCard' component={addCard}/>
                    <PrivateRoute path='/gcard' component={gcard}/>
                </Switch>
            </div>

        </Router>
    )
  }
}


export default App;
