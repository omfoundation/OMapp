import React, { Component } from 'react';

import '../css/access.css'

export default class Access extends Component{
    constructor(props){
        super(props);
        this.state = {showLogin:false};
        this.processLogIn = this.processLogIn.bind(this);
    }

    openModalLogIn(){
        this.setState({showLogin:true})
    }

    closeModalLogIn(){
        this.setState({showLogin:false})
    }

    openModalLogin(){
        this.props.signUpHandler();   
    }

    closeModalLogin(){
        this.setState({showLogin:false});
    }

    openModalSignup(){
        this.setState({showSignup:true})
    }

    closeModalSignup(){
        this.setState({showSignup:false})
    }

    processLogIn(){
        this.props.processLogin();
    }

    registerWithEmailPasswordClickHandler(){
        //omapp.setLogStyle('email');
        this.setState({signupChoice: 'email'});
    }

    procesSignupEmailAndPassword(){

    }

    render(){

            var loginStyle = {display: 'none'};
            var signupStyle = {display: 'none'};

            if (this.state.showLogin) {
                loginStyle = {display: 'block'};  
            }
            else if(this.state.showSignup){
                signupStyle = {display: 'block'};
            }

            return(
                <div>
                    <p className='App-intro'>
                        Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                    </p>
                    {this.props.errors}
                    <button  onClick={() => this.openModalLogIn()}>Iniciar sesion</button>
                    <br/>
                    <button onClick={()=>{this.openModalSignup()}} >Registrarse</button>

                    {/*****************Iniciar sesion modal *************/}
                    <LoginMethodPopup
                        style={loginStyle}
                        onCloseHandler={this.closeModalLogin.bind(this)} 
                        googleAuthenticationHandler={this.props.googleAuthenticationHandler}
                        processLogIn={this.props.processLogIn.bind(this)}
                    />

                    <SignupMethodChoicePopup
                        style={signupStyle}
                        onCloseHandler={this.closeModalSignup.bind(this)} 
                        onSignupWithEmailAndPasswordHandler={this.props.signupWithEmailAndPasswordHandler.bind(this)}
                        onSignupWithGoogleHandler={this.props.signupWithGoogleHandler.bind(this)}
                    />
                </div>

            ) 
        }
    
}


class SignupMethodChoicePopup extends Component {

    onSignupWithEmailAndPasswordHandler(){
        this.props.signupWithEmailPasswordHandler();
    }

    closeClickHandler(){
        this.props.onCloseHandler();    
    }

    signupWithEmailPasswordClickHandler(){
        this.props.onSignupWithEmailAndPasswordHandler();
    }

    signupWithGoogleClickHandler(){
        this.props.onSignupWithGoogleHandler();
    }

    render() {
        return (
            <div ref='modRes' className='modal' style={this.props.style}>
                <div className='modal-content'>
                    <span className='close' onClick={this.closeClickHandler.bind(this)}>&times;</span>
                    <h2>Registro</h2>
                    <p>Selecciona tu metodo preferido:</p>
                    <a className='btn'><button onClick={()=>{this.signupWithEmailPasswordClickHandler()}}>Con email y contraseña</button></a>
                    <br/>
                    <button onClick={() => {this.signupWithGoogleClickHandler()}}>Con cuenta Google</button>
                </div>
            </div>
        )
    }
}

class LoginMethodPopup extends Component {

    onLoginWithGoogle(){
        this.props.googleAuthenticationHandler();
    }

    checkLogData(){
        let txtEmail = this.refs.uemail.value;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if((txtEmail.replace(/\s/g,'') != '') &&(txtEmail.match(mailformat))){
            //Chequeamos que no sea solo blancos
            //ok
            //return true;

            let txtPas = this.refs.upsw.value;

            if(txtPas.replace(/\s/g,'') != ''){
                //Nada de blancos 
                //OK
            }else{
                alert('Introduce una clave valida');
                return false;
            }

        }else{
            alert('Introduce un email valido!');
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
            <div ref='modLogIn' className='modal' style={this.props.style}> 
                {/* Modal Content */}
                <div className='modal-content animate'>
                    <span className='close red' onClick={this.onClose.bind(this)}>&times;</span>
                    <div className='container'>
                        <label htmlFor='uemail'><b>Email</b></label>
                        <input type='text' placeholder='Enter email' ref='uemail' required />
                        <label htmlFor='upsw'><b>Contraseña</b></label>
                        <input type='password' placeholder='Enter contraseña' ref='upsw' required />
                        <button type='submit' className='btn greenBG' onClick={this.onProcessLogIn.bind(this)}>Iniciar sesion</button>
                        <br/>
                        <button onClick={this.onLoginWithGoogle.bind(this)}>Entra con Google</button>
                    </div>
                </div>
            </div>
        )
    }
}

