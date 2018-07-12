import React, { Component } from 'react';
import firebase, {auth, provider} from '../firebase';
//import '../css/App.css';

class HomeScreen extends Component{
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
        //const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider)
            .then((result) => {
                //OK
                //console.log(result);
                const user = result.user;
                this.setState({
                    user: user
                });
            }).catch(function(error) {
                //Error 
                console.log(error);
        });
    };

    LogOutClick(){
        //Cerrando sesion
        auth.signOut()
            .then(() => {
                //OK
                const user = null;
                this.setState({ 
                    user: user
                });
        }).catch(function(error) {
            //ERROR
            console.log(error);
        });
    }

    componentDidMount() {
        //Ayuda a mantener sesion y captar cambios
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
            }
             
        });
    }
    
    render(){
        if(this.state.user){
            //Logeado
            return(
                <div>
                    <img src={this.state.user.photoURL} height="100"  />
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