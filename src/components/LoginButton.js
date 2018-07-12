import React, { Component } from 'react';
import '../css/App.css';

class LoginButton extends Component {

    constructor(props){
        super(props);

        this.LogInClick = this.LogInClick.bind(this); 
    }

    LogInClick(){
        alert('Iniciando...');
    }

    render(){
        return(
            <button onClick={this.LogInClick}>Iniciar sesión con Google</button>
        );
    }
}

export default LoginButton;