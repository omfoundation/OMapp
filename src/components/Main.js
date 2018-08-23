import React from 'react';
import Access from './Access.js';
import Home from './Home.js';
import SignUp from './SignUp.js';
import Loading from './Loading.js';

import '../css/access.css';

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = this.props.state;
    }

    render() {
        if (this.props.state.loading){
            return <Loading/>;
        }
        switch(this.state.loginStatus) {
            case 'SIGNUP':
                return <SignUp 
                            signUpMode={this.props.signupMethod} 
                            completarRegHandler={this.props.completarRegHandler.bind(this)}
                        />
            case 'NOT_AUTHENTICATED':
                return (<div>
                        <Messages error={this.props.state.error}/>
                        <Access 
                            googleAuthenticationHandler={this.props.googleAuthenticationHandler.bind(this)}
                            processLogIn={this.props.processLogIn.bind(this)}
                            signupWithEmailAndPasswordHandler={this.props.signupWithEmailAndPasswordHandler.bind(this)}
                            signupWithGoogleHandler={this.props.signupWithGoogleHandler.bind(this)}
                            errors={<ErrorView errorMessage={this.props.errors.message}/>}/>
                       </div>)
            case 'AUTHENTICATED':
                return <SignUp  
                            signUpMode={this.props.signupMethod}
                            completarRegHandler={this.props.completarReg.bind(this)}
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

var Messages = class Messages extends React.Component {
    render() {
        return (
            <h1>{this.props.error.message}</h1>
        )
    }
}

var ErrorView = class ErrorView extends React.Component {
    render() {

        if(this.props.errorMessage == ''){
            return null;
        }

        return (
            <p style={{color: 'red'}}>Error: {this.props.errorMessage}</p>
        )
    }
}
