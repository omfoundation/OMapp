import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import NavBar from './NavBar.react'
import Main from './Main.react'
import Access from "./Access.react";
import SignUp from "./Signup.react";
import Loading from "./Loading.react";

import { Container } from 'semantic-ui-react'

import { User } from '../omapp/model'
import * as omapp from '../omapp/omapp'

import { requestUserInfoFromGoogle } from '../actions'

export class Root extends React.Component {

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

        this.signupWithGoogleRedux = this.signupWithGoogleRedux.bind(this)
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

    getUser(){
        return this.user
    }

    processLogin(username, password) {
        var thisComponent = this;
        this.enableLoadingView();
        /*
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
        */
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

    changeLoginStatusToRegistered(){
        this.setState({loginStatus: 'REGISTERED', loading: false});
    }

    signupWithEmailAndPassword(){
        this.signupMethod = 'email';
        this.setState({loginStatus: 'SIGNUP'});        
    }

    signupWithGoogle(){
        let thisComponent = this
        thisComponent.setState({loginStatus: 'SIGNUP', loading: false})

        /*
        return new Promise((resolve, reject) => {
            this.signupMethod = 'google.com'
            this.setState({loading: true});
            let thisComponent = this
            omapp.getUserInfoFromGoogle()
            .then(result => {
                thisComponent.user = new User()
                let user = thisComponent.user
                user.email = result.email
                user.profilePhotoURL = result.profilePhotoURL ? result.profilePhotoURL : null
                thisComponent.signupMethod = 'google.com'
                thisComponent.setState({loginStatus: 'SIGNUP', loading: false})
                resolve(true)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
        */
    }

    signupWithGoogleRedux(){
        const { dispatch } = this.props
        dispatch(requestUserInfoFromGoogle())
    }

    signupUser(user){
        let thisComponent = this
        thisComponent.setState({loading: true})
        /*
        omapp.isUsernameAlreadyRegistered(user.username)
        .then(result => {
            if(result === true){
                this.error = {errorCode:-1, message: 'Nombre de usuario ya registrado'}
                thisComponent.setState({loginStatus: 'NOT_AUTHENTICATED', loading: false})
            }
            else{
                omapp.signupUser(user.toJSON())
                .then(result => {
                    console.log(result)
                    thisComponent.user = user
                    thisComponent.setState({loginStatus: 'REGISTERED', loading: false})
                })
                .catch(error => console.log(error))
            }

        })
        .catch(error => console.log(error))
        */
       thisComponent.setState({loginStatus: 'REGISTERED', loading: false})
       console.log('Login status: ', this.state.loginStatus)
    }

    render() {
        
        if (this.state.loading){
            return <Loading/>
        }
        else if (this.state.loginStatus === 'NOT_AUTHENTICATED'){
            return (
                <Access 
                    googleAuthenticationHandler={() => this.googleAuthenticationHandler()}
                    processLoginHandler={ () => this.processLogin()}
                    signupWithEmailAndPasswordHandler={ () => this.signupWithEmailAndPassword()}
                    signupWithGoogleHandler={() => this.signupWithGoogle()}
                    signupWithGoogleReduxHandler={() => this.signupWithGoogleRedux()}
                    error={<ErrorView error={this.error}/>}
                />
            )
        }
        else if(this.state.loginStatus === 'SIGNUP'){
            return  (
                <SignUp 
                    user={this.user}
                    signupMethod={this.signupMethod}
                    signupUserHandler={this.signupUser.bind(this)}
                    signupWithEmailAndPasswordHandler={this.signupWithEmailAndPassword.bind(this)}
                /> 
            )
        }

        return (
            <div id='root-container'>
                <NavBar />
                <Container textAlign='center'>
                    <Main
                        signupMethodHandler={this.signupMethod}
                        logoutHandler={this.logoutHandler.bind(this)}
                        state={this.state}
                        user={this.user}
                        signupMethod={this.signupMethod}
                        defaultProfilePhotoURL={this.defaultProfilePhotoURL}
                        error={this.error}
                    />
                </Container>
            </div>
            
        )
    }
}

var ErrorView = class ErrorView extends React.Component {

    isEmpty(str) {
        return (!str || 0 === str.length);
    }

    render() {
        
        if(this.isEmpty(this.props.error)){
            return null;
        }

        return (
            <p style={{color: 'red'}}>Error: {this.props.error.message}</p>
        )
    }
}

function mapStateToProps(state) {
    const {
        loading,
        loginStatus
    } = state

    return {
        loading,
        loginStatus
    }
} 

Root.propTypes = {
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Root)