import React from 'react';
import NavBar from './NavBar.react';
import Main from './Main.react';

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