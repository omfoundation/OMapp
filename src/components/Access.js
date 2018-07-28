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

        this.state = {
            dataUser: omapp.dataUser,
            referrer: null
        }

        //this.state = () => omapp.getCurrentuser().then(result => result);
        this.processLogIn = this.processLogIn.bind(this);
    }

    openModalLogIn(){
        this.refs.modLogIn.style.display= "block";
    }

    closeModalLogIn(){
        this.refs.modLogIn.style.display= 'none';
    }
    
    openModalRes(){
        this.refs.modRes.style.display= "block";
    }

    closeModalRes(){
        this.refs.modRes.style.display= 'none';
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

    processLogIn(){
        //omapp.setLogStyle('email')
        console.log('Intentando');
        if(this.checkLogData()){
            omapp.signInWitgEmail(this.refs.uemail.value, this.refs.upsw.value, this);
        }
    }

    registerWithEmailPasswordClickHandler(){
        omapp.setLogStyle('email');
        this.setState({signupChoice: 'email'});
        //this.setState({referrer: '/signup'});

    }

    signInWithGoogleClickHandler(){
        this.setState({loading: true});
        omapp.setLogStyle('email');
        omapp.signInWithGoogle(this)
        
        //this.setState({referrer: '/signup'});

    }


    render(){
        console.log('Access', this.state);
        if (omapp.getUser() === null){
            //Si no esta login
            return(
                <div>

                    <p className="App-intro">
                        Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                    </p>
                    <button  onClick={() => this.openModalLogIn()}>Iniciar sesion</button>
                    <br/>
                    <button onClick={()=>{this.openModalRes()}} >Registrarse</button>

                    {/*****************Iniciar sesion modal *************/}
                    <div ref="modLogIn" className="modal"> 
                        {/* Modal Content */}
                        <div className="modal-content animate">
                        <span className="close red" onClick={() => this.closeModalLogIn()}>&times;</span>

                            <div className="container">
                                <label htmlFor="uemail"><b>Email</b></label>
                                <input type="text" placeholder="Enter email" ref="uemail" required />

                                <label htmlFor="upsw"><b>Contraseña</b></label>
                                <input type="password" placeholder="Enter contraseña" ref="upsw" required />

                                <button type="submit" className="btn greenBG" onClick={this.processLogIn}>Iniciar sesion</button>
                                <br/>
                                <button  onClick={() => {omapp.signInWithGoogle(this)}}>Entra con Google</button>
                                <Link to={ '/access'} onClick={()=>{this.signInWithGoogleClickHandler(this)}}>Entra con Google 2</Link>
                            </div>
                        </div>
                    </div>


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
        else{

            //Si esta login en google auth pero no sabemos db

            console.log('probando contenido de user: ', omapp.getUser().user);

            if (this.state.loading) {
                return (
                    <Loading referrer="/access"/>
                )                
            }

            console.log('User is registered? ' + omapp.isUserRegistered(omapp.getUser()));
            if(omapp.isUserRegistered(omapp.getUser())){
                //existe en db
                console.log('>>>>> home');
                return (
                        <Route path="/home" component={Loading} />
                )
            }else{
                //no existe en db
                console.log('>>>>> signup');
                //return <SignUp/> 
                return (
                        <Route path="/signup" component={SignUp} />
                )
            }            
        }   
    }
}