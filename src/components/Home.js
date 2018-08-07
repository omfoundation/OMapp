import React, {Component} from 'react';

export class Home extends Component {
    constructor(props){
        super(props);
    };

    LogOutClick(){
        this.props.logoutHandler();
    }
    
    render(){
        return (
            <div>
                <img src={this.props.user.photoURL || this.props.defaultPhotoURL} height="100"  alt="user"/>
                <p>
                    Hola {this.props.user.nick}!
                    <br/>
                    <strong>Correo: </strong> {this.props.user.email}
                </p>
                <button onClick={this.LogOutClick.bind(this)}>Cerrar sesión</button>
            </div>
        )  
    }
}