import React, { Component } from 'react';
import '../css/App.css';

class LoginButton extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <button>Iniciar sesión con Google</button>
        );
    }
}

export default LoginButton;