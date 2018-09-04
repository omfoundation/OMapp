import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { requestUserInfoFromGoogle, signUpUser } from '../actions'

import NavBar from './NavBar.react'
import Home from './Home.react'
import Access from "./Access.react";
import SignUp from "./Signup.react";
import Loading from "./Loading.react";

import { Responsive } from 'semantic-ui-react'

import * as omapp from '../omapp/omapp'

export class Root extends Component {

    constructor(props){
        super(props)
        this.user = {
            registered: false,
            signupMethod: null,
            username: null,
            email: null,
            profilePhotoURL: null,
        }
        
        /*
        super(props);
        this.state = {}
        this.state.loginStatus = 'NOT_AUTHENTICATED';
        this.state.loading = false;
        this.state.error = false;
        this.error = null;
        this.signupMethod = null;*/
        this.defaultProfilePhotoURL = 'https://discourse-cdn-sjc1.com/gethopscotch/uploads/default/original/3X/9/6/961305dba186fe363dbef523761f620698b7050a.gif';
        /* //this.signupWithGoogleRedux = this.signupWithGoogleRedux.bind(this)
        */
    }

    googleAuthenticationHandler() {
        this.setState({ loading: true });
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

    setUser(user) {
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

    logoutHandler() {
        var thisComponent = this;
        omapp.signOutPromise().then(
            function () {
                thisComponent.setAuthenticationToNotAuthenticated();
            }
        );
    }

    enableLoadingView() {
        this.setState({ loading: true });
    }

    disableLoadingView() {
        this.setState({ loading: false });
    }

    setAuthenticationToRegistered() {
        console.log("Root.react.js - State changed to 'REGISTERED'")
        this.setState({ loginStatus: 'REGISTERED' });
    }

    setAuthenticationToNotAuthenticated() {
        this.setState({ loginStatus: 'NOT_AUTHENTICATED' });
    }

    showErrorView(error) {
        this.error = error;
        this.setState({ error: true, loading: false });
    }

    changeLoginStatusToRegistered() {
        this.setState({ loginStatus: 'REGISTERED', loading: false });
    }

    signupWithEmailAndPassword() {
        this.signupMethod = 'email';
        this.setState({ loginStatus: 'SIGNUP' });
    }

    signupWithGoogle(){
        const { dispatch } = this.props
        dispatch(requestUserInfoFromGoogle())
    }

    signupUser(userInfo){
        const { dispatch } = this.props
        dispatch(signUpUser(userInfo))
        
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
    }

    render() {
        
        let { loginStatus, userInfo } = this.props

        /**** Para forzar la entrada directa a Home ***/
        loginStatus = 'HOME_VIEW'
        userInfo = {}
        /**********************************************/    
            
        if (loginStatus === 'LOADING'){
            return <Loading/>
        }
        else if(loginStatus === 'SIGN_UP_VIEW'){
            return  (
                <SignUp 
                    userInfo={userInfo}
                    signupMethod={this.signupMethod}
                    signupUserHandler={this.signupUser.bind(this)}
                    signupWithEmailAndPasswordHandler={this.signupWithEmailAndPassword.bind(this)}
                />
            )
        }
        else if(loginStatus === 'HOME_VIEW'){
        return (
            <div id='root-container'>
                <Responsive minWidth={401}>
                    <NavBar />
                </Responsive>
                <Responsive  maxWidth={400}>
                    <h1>Hammmburguesaaaaa!!! ;-)</h1>
                </Responsive>
                <Home 
                    userInfo={userInfo}
                    defaultProfilePhotoURL={this.defaultProfilePhotoURL}
                    error={this.error}
                />
            </div>            
        )}
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
}

var ErrorView = class ErrorView extends React.Component {

    isEmpty(str) {
        return (!str || 0 === str.length);
    }

    render() {

        if (this.isEmpty(this.props.error)) {
            return null;
        }

        return (
            <p style={{ color: 'red' }}>Error: {this.props.error.message}</p>
        )
    }
}

function mapStateToProps(state) {

    const {root} = state
    const {loginStatus, userInfo} = root

    console.log('userInfo que sale: ', userInfo)

    return {
        loginStatus, userInfo
    }
} 

Root.propTypes = {
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object
}

export default connect(mapStateToProps)(Root)