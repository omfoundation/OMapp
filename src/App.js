import React, { Component } from 'react';
import './css/App.css';

import LoginButton from './components/LoginButton.js';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Bienvenido a OMapp</h1>
        </header>

        <p className="App-intro">
          Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
        </p>

        <LoginButton/>

      </div>
    );
  }
}

export default App;

