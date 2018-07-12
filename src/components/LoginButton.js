import React, { Component } from 'react';
import '../css/App.css';
import OMAppComponent from './OMAppComponent.js'

class LoginButton extends OMAppComponent {

    constructor(props){
        super(props);
        //this.LogInClick = this.LogInClick.bind(this); 
        
    }

    render(){
        return(
            <button onClick={this.omapp}>Iniciar sesión con Google</button>
        );
    }
}

export default LoginButton;