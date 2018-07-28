import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import omapp from '../omapp/omapp.js';
import { Access } from "./Access.js";
import { Home } from "./Home.js";

import '../css/access.css';
import '../css/access.css';

export class Main extends React.Component {

    constructor(props){
        super(props);

        this.state = omapp.dataUser; 
        this.location = props.location;
    }

    render() {
        console.log('Access', this.state);
        if (!this.state.user){
            return (<Route path="/" component={Access} />)
        }
        else if (this.state.inDB) {
            return (<Home/>)
        }
        else {
            return (<Route path="/access" component={Access} />)
        }
    }
}