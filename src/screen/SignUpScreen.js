import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import omapp from '../omapp/omapp.js';

import '../css/signup.css';

import { Button, Form } from 'semantic-ui-react'

class SignUpScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: omapp.dataUser.user,
            inDB: omapp.dataUser.inDB,
            style: omapp.dataUser.style,
            reRender: false
        };
        //this.state = () => omapp.getCurrentuser().then(result => result);

        this.completarReg = this.completarReg.bind(this);
    }

    completarReg(idPlan, authLevel){
        //chequeamos form
        if(this.checkForm()){
            //console.log('completando: '+ txtName+ ' IdPla: ' + idPlan + ' lvel: ' +authLevel);

            if(omapp.dataUser.style =='g'){
                omapp.completeRegDB('','',this.refs.nickText.value,idPlan,authLevel, this);
            }else{
                omapp.completeRegDB(this.refs.email.value,this.refs.psw.value,
                    this.refs.nickText.value,idPlan,authLevel, this);
            }
            
        }
    }

    checkForm(){
        if(!(omapp.dataUser.style == 'g')){
            //Registro por email

            let txtEmail = this.refs.email.value;
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if((txtEmail.replace(/\s/g,'') != "") &&(txtEmail.match(mailformat))){
                //Chequeamos que no sea solo blancos
                //ok
                //return true;
            }else{
                alert("Introduce un email valido!");
                return false;
            }

            let txtPas = this.refs.psw.value;
            let txtPasRe = this.refs.pswRepeat.value;

            if(txtPas.replace(/\s/g,'') != ""){
                //Chequeamos que no sea solo blancos
                //ok
                if(txtPas == txtPasRe){
                    //Claves iguales?
                    //ok
                    if((txtPas.legth < 6)){
                        //No es mayor a 6
                        alert("La clave debe ser de mayor longitud (min. 6char)");
                        return false;
                    }
                    //return true;
                }else{
                    alert("Ambas claves deben ser iguales!");
                    return false;
                }

            }else{
                alert("Introduce una clave valida!");
                return false;
            }
        }
        
        //Verificamos nick
        let txtName = this.refs.nickText.value;

        if(txtName != ""){
            //Listo
            //return true;
        }else{
            //No ha sido introducido
            alert("Introduce un nick!");
            return false;
        }

        return true;
    }


    render(){
        console.log('signup', this.state);

        /*
        if(!omapp.isLogIn()){
            console.log("Sing > login")
            return <Redirect to='/'/>
        }
        */
        //!(omapp.dataUser.inDB)
        if(!omapp.isLogIn()){
            //No hay registro   
            return(
                <div> 
                        { omapp.dataUser.style != 'g' &&
                            //Si la forma de login es diferente a google para registrar
                            //MOstrar esto
                            <div>
                                <Form>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input type="text" placeholder="Enter Email" ref="email" required />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Password (6 caracteres min.)</label>
                                        <input type="password" placeholder="Enter Password" ref="psw" required />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Repeat Password</label>
                                        <input type="password" placeholder="Repeat Password" ref="pswRepeat" required />
                                    </Form.Field>

                                </Form>
                            </div>
                            
                        }

                        <br/>
                        <Form>
                            <Form.Field>
                                <label>Apodo/Nick:</label>
                                <input className='iNick' maxLength="13" type='text' placeholder='Introduzca nick' ref='nickText'required />
                            </Form.Field>
                            <br/>
                        </Form>
                        <br/>

                        <div className='plans'>
                                <div className="columns">
                                <ul className="price">
                                    <li className="header">Basico</li>
                                    <li className="grey">Gratis</li>
                                    <li>Id plan: 1</li>
                                    <li>Nivel de acceso: 1</li>
                                    <li>10GB</li>
                                    <li className="grey"><a href="#" onClick={() =>{this.completarReg(1,1)}} className="button">Seleccionar</a></li>
                                </ul>
                                </div>
        
                                <div className="columns">
                                <ul className="price">
                                    <li className="header">Pro</li>
                                    <li className="grey">Bs.F 2.99 / mes</li>
                                    <li>Id plan: 2</li>
                                    <li>Nivel de acceso: 3</li>
                                    <li>100GB</li>
                                    <li className="grey"><a href="#" onClick={() =>{this.completarReg(2,3)}} className="button">Seleccionar</a></li>
                                </ul>
                                </div>
        
                                <div className="columns">
                                <ul className="price">
                                    <li className="header">Premium</li>
                                    <li className="grey">Bs.S 10 / año</li>
                                    <li>Id plan: 3</li>
                                    <li>Nivel de acceso: 5</li>
                                    <li>10TB</li>
                                    <li className="grey"><a href="#" onClick={() =>{this.completarReg(3,5)}} className="button">Seleccionar</a></li>
                                </ul>
                                </div>
                        </div>
                        
                </div>
            ) 
        }else{
            console.log("Sing > home");
            return <Redirect to='/home'/>
        }
    }
}

export default SignUpScreen;