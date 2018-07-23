import React, { Component } from 'react';
import {Router, Switch, Route } from "react-router-dom";

import './css/App.css';

import AccessScreen from './screen/AccessScreen.js';
import LoadingScreen from './screen/LoadingScreen.js';
import SignUpScreen from './screen/SignUpScreen.js';
import HomeScreen from './screen/HomeScreen.js';
import FeedScreen from './screen/FeedScreen.js';
import NotFoundScreen from './screen/NotFoundScreen.js';
import NavBar from './components/navBar.js'



class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar/>
  
          <Switch>
            <Route exact path='/' component={AccessScreen}/>
            <Route path='/load' component={LoadingScreen}/>  
            <Route path='/signup' component={SignUpScreen}/>  
            <Route path='/home' component={HomeScreen}/> 
            <Route path='/feed' component={FeedScreen}/> 
            <Route path="*" component={NotFoundScreen} />
          </Switch>

      </div>
      );
  }
}

export default App;
