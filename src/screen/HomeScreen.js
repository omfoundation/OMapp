import React from 'react';
import OMAppComponent from '../components/OMAppComponent';

//import firebase, {auth, provider} from '../firebase';
//import '../css/App.css';

class HomeScreen extends OMAppComponent{
    constructor(props){
        super(props);
        
        this.state = {
            user: null
        };

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

    componentDidMount() {
        //Ayuda a mantener sesion y captar cambios
       this.omapp.onMount(this);
    }
    
    render(){
        if(this.state.user){
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
            return(
                <div>
                    <p className="App-intro">
                        Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                    </p>
                    <button onClick={this.LogInClick}>Iniciar sesion con GOOGLE</button>
                </div>
            );
        }
        
    }
}

export default HomeScreen;