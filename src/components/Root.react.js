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

import Views from '../views'

import * as omapp from '../omapp/omapp'

export class Root extends Component {

    constructor(props){
        super(props)        
        this.defaultProfilePhotoURL = 'https://discourse-cdn-sjc1.com/gethopscotch/uploads/default/original/3X/9/6/961305dba186fe363dbef523761f620698b7050a.gif'
    }

    signupWithGoogle(){
        const { dispatch } = this.props
        dispatch(requestUserInfoFromGoogle())
    }

    signupUser(userInfo){
        const { dispatch } = this.props
        dispatch(signUpUser(userInfo))
    }

    render() {

        let { view, userInfo } = this.props

        /**** Para forzar la entrada directa a Home ***/
        //view = 'HOME_VIEW'
        /**********************************************/ 
        
        /**** Objeto contenedor de la información del usuario ***/
        userInfo = {}
        /**********************************************/ 
            
        if (view === Views.Loading){
            return <Loading/>
        }
        else if(view === Views.SignUp){
            return  (
                <SignUp 
                    userInfo={userInfo}
                    signupUserHandler={ () => this.signupUser() }
                    signupWithEmailAndPasswordHandler={ () => alert('signupWithEmailAndPasswordHandler - click') }
                />
            )
        }
        else if(view === Views.Home){
        return (
            <div id='root-container'>
                    <NavBar />
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
                error={this.error}
            />
        )
        
    }
}

function mapStateToProps(state) {

    const {root} = state
    const {view, userInfo} = root

    console.log('userInfo que sale: ', userInfo)

    return {
        view, userInfo
    }
} 

Root.propTypes = {
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object
}

export default connect(mapStateToProps)(Root)