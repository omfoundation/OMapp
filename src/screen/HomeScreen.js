import React from 'react';
import {Redirect} from 'react-router-dom';

import OMAppComponent from '../components/OMAppComponent';

import {Button} from 'semantic-ui-react'

import omapp from '../omapp/omapp';

//import firebase, {auth, provider} from '../firebase';
//import '../css/App.css';

class HomeScreen extends OMAppComponent{
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
                    <Button color='black' onClick={this.LogOutClick}>Cerrar sesión</Button>
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