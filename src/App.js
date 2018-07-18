import React, { Component } from 'react';
import {Router, Switch, Route } from "react-router-dom";

import './css/App.css';

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
            <Route exact path='/' component={HomeScreen}/> 
            <Route path='/feed' component={FeedScreen}/> 
            <Route path="*" component={NotFoundScreen} />
          </Switch>

      </div>
      );
  }
}

export default App;
