import React from 'react';

import { NavBar } from './NavBar';
import { Main } from './Main';

import '../css/root.css';

export class Root extends React.Component {
    render() {
        return (
            <div id="root-container">
                <div id="header">
                    <NavBar /> 
                </div>
                <hr/>
                <div id="main-container">
                    <Main />
                </div>
            </div>
        );
    }
}