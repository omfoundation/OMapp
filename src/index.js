import registerServiceWorker from './registerServiceWorker'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"

import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import 'semantic-ui-css/semantic.min.css'

import App from './App'

const reducers = {
  form: formReducer 
}
const reducer = combineReducers(reducers)

const store = createStore(reducer)

/*
import './css/index.css';
import './css/access.css'
import './css/App.css'
import './css/index.css'
import './css/loader.css'
import './css/nav.css'
import './css/root.css'
import './css/signup.css'
*/

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app'))

registerServiceWorker()