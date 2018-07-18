import React, { Component } from 'react';
import './css/App.css';
import HomeScreen from './screen/HomeScreen.js';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">OMapp</h1>
        </header>

        <HomeScreen/> 

      </div>
      );
  }
}

export default App;
