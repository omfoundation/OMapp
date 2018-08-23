import React, { Component } from 'react';
import {Router, Switch, Route } from "react-router-dom";

import Root from './components/Root.react';

import './css/App.css';

class App extends Component {
  render() {
    return (
        <Root/>
      );
  }
}

export default App;
