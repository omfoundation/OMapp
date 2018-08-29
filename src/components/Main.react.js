import React from "react";
import { Route } from 'react-router-dom'

import Access from "./Access.react";
import Home from "./Home.react";
import SignUp from "./Signup.react";
import Loading from "./Loading.react";

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = this.props.state;
    }
    
    render() {

        if (this.props.state.loading){
            return <Loading/>;
        }
        switch(this.props.state.loginStatus) {
            case 'SIGNUP':
                return <SignUp 
                            signupMethod={this.props.signupMethod} 
                            completeSignupHandler={this.props.completeSignupHandler.bind(this)}
                        />
            case 'NOT_AUTHENTICATED':
                return (<div>
                        <Access 
                            googleAuthenticationHandler={this.props.googleAuthenticationHandler.bind(this)}
                            processLoginHandler={this.props.processLoginHandler.bind(this)}
                            signupWithEmailAndPasswordHandler={this.props.signupWithEmailAndPasswordHandler.bind(this)}
                            signupWithGoogleHandler={this.props.signupWithGoogleHandler.bind(this)}
                            error={<ErrorView error={this.props.error}/>}/>
                       </div>)
            case 'AUTHENTICATED':
                return  <Route path="/signup" component={SignUp} 
                            signupMethod={this.props.signupMethod}
                            completeSignupHandler={this.props.completeSignupHandler.bind(this)}
                        /> 
            case 'REGISTERED':
                return <Home 
                            user={this.props.user} 
                            defaultProfilePhotoURL={this.props.defaultProfilePhotoURL} 
                            logoutHandler={this.props.logoutHandler.bind(this)}
                        />
            default:
                return <h1>ERROR - Shouldn't happen</h1>
        }
    }
}

var ErrorView = class ErrorView extends React.Component {
    render() {
        
        if(isEmpty(this.props.error)){
            return null;
        }

        return (
            <p style={{color: 'red'}}>Error: {this.props.error.message}</p>
        )
    }
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}
