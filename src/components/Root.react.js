import * as omapp from '../omapp/omapp';
import React from 'react';
import NavBar from './NavBar.react.js';
import Main from './Main.react.js';

import '../css/root.css';

export default class Root extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
        this.state.loginStatus = 'NOT_AUTHENTICATED';
        this.state.loading = false;
        this.state.error = false;
        this.error = null;
        this.signupMethod = null;
        this.defaultProfilePhotoURL = 'http://sitelcity.com/wp-content/uploads/2015/04/default-user-image-300x300.png';
        this.user = {
            registered: false,
            signupMethod: null,
            username: null,
            email: null,
            profilePhotoURL: null,
        }
    }

    googleAuthenticationHandler() {
        this.setState({loading: true});
        var thisComponent = this;
        omapp.signInWithGooglePromise()
        .then((user) => {
                user.registered = true;
                thisComponent.setUser(user);
                thisComponent.setAuthenticationToRegistered();
                thisComponent.disableLoadingView();
            }
        )
        .catch((error) => {
            console.log(error);
            thisComponent.disableLoadingView();
        });
    }

    setUser(user){
        this.user.email = user.email;
        this.user.username = user.username;
        this.user.idPlan = user.idPlan;
        this.user.signupMethod = user.signupMethod;
        this.user.registered = user.registered;
        this.user.profilePhotoURL = user.profilePhotoURL;
    }

    processLogin(username, password) {
        var thisComponent = this;
        this.enableLoadingView();
        omapp.signInWithEmailPromise(username, password)
        .then((user) => {
            this.user.username = user.username;
            this.user.email = user.email;
            this.user.profilePhotoURL = user.profilePhotoURL;
            this.user.registered = true;
            //this.user.user.signupMethod = user.signupMethod;
            thisComponent.setAuthenticationToRegistered();
            thisComponent.disableLoadingView();
        })
        .catch((error) => console.log(error));
    }

    logoutHandler(){
        var thisComponent = this;
        omapp.signOutPromise().then(
            function(){
                thisComponent.setAuthenticationToNotAuthenticated();
            }    
        );
    }

    enableLoadingView(){
        this.setState({loading: true});
    }

    disableLoadingView(){
        this.setState({loading: false});
    }

    setAuthenticationToRegistered(){
        console.log("Root.react.js - State changed to 'REGISTERED'")
        this.setState({loginStatus: 'REGISTERED'});
    }

    setAuthenticationToNotAuthenticated(){
        this.setState({loginStatus: 'NOT_AUTHENTICATED'});
    }

    showErrorView(error){
        this.error = error;
        this.setState({error: true,loading: false});
    }

    completarReg(email,password,nickname,idPlan, authLevel){
        
        var thisComponent = this;
        
        this.enableLoadingView();

        var userDataToRegister = {
            email: email,
            nickname: nickname,
            idPlan: idPlan,
            authLevel,
            signupMethod: this.signupMethod,
            profilePhotoURL: null
        };

        omapp.completeRegDBPromise(userDataToRegister, password)
        .then(function(user){
                thisComponent.user.email = user.email;
                thisComponent.user.nickname = user.nickname;
                thisComponent.setAuthenticationToRegistered();
                thisComponent.disableLoadingView();
            }
        )
        .catch(function(error){
                console.log(error);
                thisComponent.showErrorView(error);
                thisComponent.setAuthenticationToNotAuthenticated();
            }
        );
    }

    changeLoginStatusToRegistered(){
        this.setState({loginStatus: 'REGISTERED', loading: false});
    }

    signupWithEmailAndPassword(){
        this.signupMethod = 'email';
        this.setState({loginStatus: 'SIGNUP'});        
    }

    signupWithGoogle(){
        this.user.signupMethod = 'google.com';
        this.signupMethod = 'google.com';
        this.setState({loginStatus: 'SIGNUP'});        
    }

    render() {


        return (
            <div id='root-container'>
                <div id='header'>
                    <NavBar /> 
                </div>
                <hr/>
                <div id='main-container'>
                    <Main
                        signupMethodHandler={this.signupMethod}
                        completeSignupHandler={this.completarReg.bind(this)}
                        googleAuthenticationHandler={this.googleAuthenticationHandler.bind(this)}
                        processLoginHandler={this.processLogin.bind(this)}
                        signupWithEmailAndPasswordHandler={this.signupWithEmailAndPassword.bind(this)}
                        signupWithGoogleHandler={this.signupWithGoogle.bind(this)}
                        logoutHandler={this.logoutHandler.bind(this)}
                        state={this.state}
                        user={this.user}
                        signupMethod={this.signupMethod}
                        defaultProfilePhotoURL={this.defaultProfilePhotoURL}
                        error={this.error}
                    />
                </div>
            </div>
        )
    }
}