import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import { Home } from './Home';
import { Loading } from './Loading';
import { SignUp } from './SignUp';


import '../css/access.css'

import omapp from '../omapp/omapp.js';

export class Access extends Component{
    constructor(props){
        super(props);
        this.state = {showLogin:false};
        //this.state = () => omapp.getCurrentuser().then(result => result);
        this.processLogIn = this.processLogIn.bind(this);
    }

    openModalLogIn(){
        //this.refs.modLogIn.style.display= "block";
        this.setState({showLogin:true})
    }

    closeModalLogIn(){
        //this.refs.modLogIn.style.display= 'none';
        this.setState({showLogin:false})
    }

    openModalRes(){
        this.props.signUpHandler();   
    }

    closeModalRes(){
        this.setState({showLogin:false});
    }

    processLogIn(){
        console.log('Intentando');
        this.props.processLogin();
    }

    registerWithEmailPasswordClickHandler(){
        omapp.setLogStyle('email');
        this.setState({signupChoice: 'email'});
    }

    render(){

            var loginStyle = {display: 'none'};

            if (this.state.showLogin) {
                loginStyle = {display: 'block'};  
            }

            return(
                <div>
                    <p className="App-intro">
                        Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                    </p>
                    <button  onClick={() => this.openModalLogIn()}>Iniciar sesion</button>
                    <br/>
                    <button onClick={()=>{this.openModalRes()}} >Registrarse</button>

                    {/*****************Iniciar sesion modal *************/}
                    {console.log(loginStyle)}
                    <Login
                        style={loginStyle}
                        onCloseHandler={this.closeModalRes.bind(this)} 
                        googleAuthenticationHandler={this.props.googleAuthenticationHandler.bind(this)}
                        processLogIn={this.props.processLogIn}
                    />

                    {/***********Registro modal***************/}

                    <div ref="modRes" className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => this.closeModalRes()}>&times;</span>
                            <h2>Registro</h2>
                            <p>Selecciona tu metodo preferido:</p>
                            <a className="btn"><Link to={ '/signup' } onClick={()=>{this.registerWithEmailPasswordClickHandler()}}>Con email y contraseña</Link></a>
                            <br/>
                            <button onClick={() => {this.signInWithGoogleClickHandler(this)}}>Con cuenta Google</button>
                        </div>

                    </div>

                </div>

            ) 
        }
    
}

var Login = class Login extends Component {

    constructor(props){
        super(props);
    }

    onLoginWithGoogle(){
        this.props.googleAuthenticationHandler();
    }

    checkLogData(){
        let txtEmail = this.refs.uemail.value;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if((txtEmail.replace(/\s/g,'') != "") &&(txtEmail.match(mailformat))){
            //Chequeamos que no sea solo blancos
            //ok
            //return true;

            let txtPas = this.refs.upsw.value;

            if(txtPas.replace(/\s/g,'') != ""){
                //Nada de blancos 
                //OK
            }else{
                alert("Introduce una clave valida");
                return false;
            }

        }else{
            alert("Introduce un email valido!");
            return false;
        }

        return true;
    }

    onProcessLogIn(){
        if(this.checkLogData()){
            this.props.processLogIn(this.refs.uemail.value, this.refs.upsw.value);
        }
    }

    onClose(){
        this.props.onCloseHandler();    
    }

    render() {
        return (
            <div ref="modLogIn" className="modal" style={this.props.style}> 
                {/* Modal Content */}
                <div className="modal-content animate">
                    <span className="close red" onClick={this.onClose.bind(this)}>&times;</span>
                    <div className="container">
                        <label htmlFor="uemail"><b>Email</b></label>
                        <input type="text" placeholder="Enter email" ref="uemail" required />
                        <label htmlFor="upsw"><b>Contraseña</b></label>
                        <input type="password" placeholder="Enter contraseña" ref="upsw" required />
                        <button type="submit" className="btn greenBG" onClick={this.onProcessLogIn.bind(this)}>Iniciar sesion</button>
                        <br/>
                        <button onClick={this.onLoginWithGoogle.bind(this)}>Entra con Google</button>
                    </div>
                </div>
            </div>
        )
    }
}