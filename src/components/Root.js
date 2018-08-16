import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavBar } from './NavBar';
import Main from './Main';
import { SignUp } from "./SignUp";

import '../css/root.css';

export default class Root extends React.Component {
    render() {
        return (
            <div id="root-container">
                <div id="header">
                    <NavBar /> 
                </div>
                <hr/>
                <div id="main-container">
                    <Main/>
                </div>
            </div>
        )
    }
}