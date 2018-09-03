import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Root from './components/Root.react';

import { Provider } from 'react-redux'
import { createStore } from 'react'
import rootReducer from './reducers'

const store = createStore(rootReducer)

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Root/>
          </BrowserRouter>
        </Provider>
      );
  }
}

export default App