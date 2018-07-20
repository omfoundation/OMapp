import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import omapp from '../omapp/omapp.js';

class LoginScreen extends Component{
    constructor(props){
        super(props);

        this.state = omapp.dataUser;  
        //this.state = () => omapp.getCurrentuser().then(result => result);
    }
    
    render(){
        console.log('login', this.state);
        if (!this.state.user){
            //Si no esta login
                return(
                    <div>
                        <p className="App-intro">
                            Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                        </p>
                        <button onClick={() => {omapp.signInWithPopup(this)}}>Iniciar sesion con GOOGLE</button>
                     </div>
                )  
        }else{
            //Si esta login en google auth pero no sabemos db
            
            if(this.state.inDB){
                //existe en db
                console.log('Login > home');
                return <Redirect to='/home'/>
            }else{
                //no existe en db
                if(this.state.inDB == null){
                    console.log('Login > loader');
                    return <Redirect to='/load'/>
                }else{
                    console.log('Login > signup');
                    return <Redirect to='/signup'/>
                }
                
            }
            
        }
        
    }
}

export default LoginScreen;