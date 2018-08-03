import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import omapp from '../omapp/omapp.js';

import { Access } from "./Access.js";
import { Home } from "./Home.js";
import { SignUp } from "./SignUp.js";
import { Loading } from "./Loading.js";



import '../css/access.css';
import '../css/access.css';

export class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
        this.state.loginStatus = "NOT_AUTHENTICATED";
        this.state.loading = false;
        this.state.error = {code:-1, message:''};
    }

    googleAuthenticationHandler() {
        console.log("Setting loginState to LOADING");
        this.setState({loginStatus: "LOADING"});
        this.setState({loading: true});
        omapp.signInWithGoogle(this);
    }

    processLogIn(username, password) {
        this.setState({loading: true});
        omapp.signInWitgEmail(username, password, this);
    }

    signUpHandler(){
        this.setState({loginStatus: "SIGNUP"});
    }

    render() {

        if (this.state.loading){
            return <Loading/>;
        }

        switch(this.state.loginStatus) {
            case "SIGNUP":
                return <SignUp/>
            case "NOT_AUTHENTICATED":
                return (<div>
                        <Messages error={this.state.error}/>
                        <Access 
                            googleAuthenticationHandler={this.googleAuthenticationHandler.bind(this)}
                            processLogIn={this.processLogIn.bind(this)}
                            signUpHandler={this.signUpHandler.bind(this)}>
                       </Access>
                       </div>)
            case "AUTHENTICATED":
                return <SignUp/>
            case "REGISTERED":
                return <Home/>
            default:
                return <h1>ERROR - Shouldn't happen</h1>
        }
    }
}

var Messages = class Messages extends React.Component {
    render() {
        return (
            <h1>{this.props.error.message}</h1>
        )
    }
}
