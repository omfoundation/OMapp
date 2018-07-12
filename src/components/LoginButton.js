import React, { Component } from 'react';
import firebase from 'firebase';
import '../css/App.css';

class LoginButton extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            user: null
        };

        this.LogInClick = this.LogInClick.bind(this); 
        //this.componentWillMount = this.componentWillMount.bind(this);
        this.LogOutClick = this.LogOutClick.bind(this);

    };

    LogInClick(){
        //alert('Iniciando...');
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            //OK
        }).catch(function(error) {
            //Error 
            console.log(error);
        });
    };

    LogOutClick(){
        //Cerrando sesion
        firebase.auth().signOut().then(function() {
            //OK
            this.setState({ user: null });
          }).catch(function(error) {
            //ERROR
            console.log(error);
          });
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }else{
                //this.setState({ user: null });
            } 
        });
    }

    render(){
        console.log('render '+ this.state.user);
        if(this.state.user){
            //Logeado
            return(
                <div>
                    <p>
                        Hola {this.state.user.displayName}!
                    </p>
                    <button onClick={this.LogOutClick}>Cerrar sesión</button>
                </div>
            );

        }else{
            //No hay datos de user/no logeado
            return(
                <button onClick={this.LogInClick}>Iniciar sesión con Google</button>
            );
        }
        
    }
}

export default LoginButton;