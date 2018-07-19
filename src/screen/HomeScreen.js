import React from 'react';
import {Redirect} from 'react-router-dom';

import LoginScreen from './LoginScreen.js';
import OMAppComponent from '../components/OMAppComponent';

//import firebase, {auth, provider} from '../firebase';
//import '../css/App.css';

class HomeScreen extends OMAppComponent{
    constructor(props){
        super(props);
        
        this.state = this.omapp.getCurrentuser();
        

        this.LogInClick = this.LogInClick.bind(this); 
        this.LogOutClick = this.LogOutClick.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);

    };

    LogInClick(){
        //Iniciando sesion;
        this.omapp.signInWithPopup(this);
    };

    LogOutClick(){
        //Cerrando sesion
        this.omapp.signOut(this);
    }

    /*componentDidMount() {
        //Ayuda a mantener sesion y captar cambios
       this.omapp.onMount(this);
    }*/
    
    render(){
        console.log('home', this.state);
        //console.log('InDB: ',this.state.inDB);

        if((this.state.user) && (this.state.inDB)){
            //Logeado
            return(
                <div>
                    <img src={this.state.user.photoURL} height="100"  alt="user"/>
                    <p>
                        Hola {this.state.user.displayName}!
                        <br/>
                        <strong>Correo: </strong> {this.state.user.email}
                    </p>
                    <button onClick={this.LogOutClick}>Cerrar sesión</button>
                </div>
            );
        }else{
            //No hay datos de user/no logeado
            console.log('Home > login');
            return <Redirect to='/'/>
        }
        
    }
}

export default HomeScreen;