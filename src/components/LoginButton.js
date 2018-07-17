import React from 'react';
import '../css/App.css';
import OMAppComponent from './OMAppComponent.js'

class LoginButton extends OMAppComponent {

    constructor(props){
        super(props); 
        
        this.loginClick = this.loginClick.bind(this);
    }
    
    loginClick(){
        this.omapp.loginClick();
    }
    
    render(){
        return(
            <button onClick={this.loginClick}>Iniciar sesión con Google</button>
        );
    }
}

export default LoginButton;