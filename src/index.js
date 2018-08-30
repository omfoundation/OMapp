import registerServiceWorker from './registerServiceWorker'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"

import App from './App'

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

import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app'))

registerServiceWorker()