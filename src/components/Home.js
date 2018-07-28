import React from 'react';
import {Redirect} from 'react-router-dom';

import { Access } from './Access';

import OMAppComponent from './OMAppComponent';
import { isLong } from 'long';
import omapp from '../omapp/omapp';

//import firebase, {auth, provider} from '../firebase';
//import '../css/App.css';

export class Home extends OMAppComponent{
    constructor(props){
        super(props);
        
        this.state = {
            reRender: true
        };
         
        this.LogOutClick = this.LogOutClick.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);

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
        console.log('home', omapp.dataUser);
        //console.log('InDB: ',this.state.inDB);

        if(omapp.isLogIn()){
            //Logeado
            return(
                <div>
                    <img src={omapp.dataUser.user.photoURL || omapp.defaulPhoto} height="100"  alt="user"/>
                    <p>
                        Hola {omapp.dataUser.nick}!
                        <br/>
                        <strong>Correo: </strong> {omapp.dataUser.email}
                    </p>
                    <button onClick={this.LogOutClick}>Cerrar sesión</button>
                </div>
            )
        }else{
            //No hay datos de user/no logeado
            console.log('No hay datos de userio. No logeado');
            return (<Access/>)
        }
        
    }
}