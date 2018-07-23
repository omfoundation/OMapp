import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

import '../css/access.css'

import omapp from '../omapp/omapp.js';

class AccessScreen extends Component{
    constructor(props){
        super(props);

        this.state = omapp.dataUser;  
        //this.state = () => omapp.getCurrentuser().then(result => result);
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

    render(){
        console.log('Access', this.state);
        if (!this.state.user){
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
                            <form className="modal-content animate">
                            <span className="close" onClick={() => this.closeModalLogIn()}>&times;</span>

                                <div className="container">
                                <label htmlFor="uname"><b>Email</b></label>
                                <input type="text" placeholder="Enter email" name="uname" required />

                                <label htmlFor="psw"><b>Contraseña</b></label>
                                <input type="password" placeholder="Enter contraseña" name="psw" required />

                                <button type="submit" className="btn" onClick={()=>{omapp.setLogStyle('email')}}>Iniciar sesion</button>
                                <br/>
                                <button  onClick={() => {omapp.signInWithGoogle(this)}}>Entra con Google</button>
                                </div>
                            </form>
                        </div>


                        {/***********Registro modal***************/}

                        <div ref="modRes" className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => this.closeModalRes()}>&times;</span>
                                <h2>Registro</h2>
                                <p>Selecciona tu metodo preferido:</p>
                                <a className="btn"><Link to='/signup' onClick={()=>{omapp.setLogStyle('email')}}>Con email y contraseña</Link></a>
                                <br/>
                                <button onClick={() => {omapp.signInWithGoogle(this)}}>Con cuenta Google</button>
                            </div>

                        </div>


                     </div>
                )  
        }else{
            //Si esta login en google auth pero no sabemos db
            
            if(this.state.inDB){
                //existe en db
                console.log('Access > home');
                return <Redirect to='/home'/>
            }else{
                //no existe en db
                if(this.state.inDB == null){
                    console.log('Access > loader');
                    return <Redirect to='/load'/>
                }else{
                    console.log('Access > signup');
                    return <Redirect to='/signup'/>
                }
                
            }
            
        }
        
    }
}

export default AccessScreen;