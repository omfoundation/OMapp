import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

//import '../css/access.css'

import { Button, Modal, Icon, Form } from 'semantic-ui-react'

import omapp from '../omapp/omapp.js';

class AccessScreen extends Component{
    constructor(props){
        super(props);

        this.state = omapp.dataUser;  
        //this.state = () => omapp.getCurrentuser().then(result => result);
        this.processLogIn = this.processLogIn.bind(this);
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

    render(){
        console.log('Access', this.state);
        if (!this.state.user){
            //Si no esta login
                return(
                    <div className="AccssScreen">
                        <p className="App-intro">
                            Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                        </p>

                        {/*****************Iniciar sesion modal *************/}
                        <Modal trigger={<Button color="black">Iniciar sesion</Button>} closeIcon> 
                            <Modal.Header ><Icon name="sign in"/>Log In</Modal.Header>
                                <Modal.Content>
                                    <Form>
                                        <Form.Field>
                                            <label htmlFor="uemail">Email</label>
                                            <input type="text" placeholder="Enter email" ref="uemail" required />
                                        </Form.Field>
                                    </Form>

                                    <Form>
                                        <Form.Field>
                                            <label htmlFor="upsw">Contraseña</label>
                                            <input type="password" placeholder="Enter contraseña" ref="upsw" required />
                                        </Form.Field>
                                    </Form>                 
                                </Modal.Content>

                                <Modal.Actions>
                                    <Button type="submit" className="btn greenBG" onClick={this.processLogIn}>Iniciar sesion</Button>
                                    <Button  onClick={() => {omapp.signInWithGoogle(this)}}> <Icon name="google"/>Entra con Google</Button>
                                </Modal.Actions>         
                        </Modal>

                        <br />
                        <br />

                        {/*****************Registro modal *************/}
                        <Modal trigger={<Button color="black">Registrarse</Button>} closeIcon>
                            <Modal.Header ><Icon name="signup"/>Sign Up</Modal.Header>

                            <Modal.Content>
                                <Button.Group size='large'>
                                        <Link to='/signup' ><Button onClick={()=>{omapp.setLogStyle('email')}}>Con email y contraseña</Button></Link>
                                        <Button.Or />
                                        <Button onClick={() => {omapp.signInWithGoogle(this)}}><Icon name="google"/>Con cuenta Google</Button>
                                </Button.Group>
                            </Modal.Content>
                        </Modal>
                    


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