import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Root from './components/Root.react';

import { Container, Grid } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
            <Root/>
      );
  }
}

export default App