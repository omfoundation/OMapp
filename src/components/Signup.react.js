import React, { Component } from 'react';

export default class SignUp extends Component{
    constructor(props){
        super(props);

        this.completarReg = this.completarReg.bind(this);
    }

    completarReg(idPlan, authLevel){
        if(this.checkForm()){
            if (this.props.signupMethod === "google.com"){
                this.props.completeSignupHandler('', '', this.refs.nickText.value, idPlan, authLevel);
            }
            else if (this.props.signupMethod === "email") {
                this.props.completeSignupHandler(this.refs.email.value, this.refs.psw.value, this.refs.nickText.value, idPlan, authLevel);
            }
            else{
                alert('SignUp.js - ERROR');
            }
            
        }
        else{
            alert('ERROR - SignUp.js - completarReg');
        }
    }

    checkForm(){
        if(!(this.props.signupMethod === 'google.com')){
            
            //Registro por email
            let txtEmail = this.refs.email.value;
            let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

            if(!(txtEmail.replace(/\s/g,'') !== "") &&(txtEmail.match(mailformat))){
                alert("Introduce un email valido!");
                return false;
            }

            let txtPas = this.refs.psw.value;
            let txtPasRe = this.refs.pswRepeat.value;

            if(txtPas.replace(/\s/g,'') !== ""){
                
                //Chequeamos que no sea solo blancos
                if(txtPas === txtPasRe){
                    
                    //Claves iguales?
                    if((txtPas.legth < 6)){
                        
                        //No es mayor a 6
                        alert("La clave debe ser de mayor longitud (min. 6char)");
                        return false;
                    }
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

        if(txtName === ""){
            //No ha sido introducido
            alert("Introduce un nick!");
            return false;
        }

        return true;
    }

    render(){
        return(
            <div> 

                    { this.props.signupMethod !== 'google.com' &&
                        //Si la forma de login es diferente a google para registrar
                        //Mostrar esto
                        <div>
                            <form>
                                <label><b>Email</b></label>
                                <input type="text" placeholder="Enter Email" ref="email" required />
                            
                                <label><b>Password</b> (6 caracteres min.)</label>
                                <input type="password" placeholder="Enter Password" ref="psw" required />
                            
                                <label><b>Repeat Password</b></label>
                                <input type="password" placeholder="Repeat Password" ref="pswRepeat" required />
                            </form>
                        </div>  
                    }

                    <br/>
                    <label><b>Apodo/Nick:</b></label>
                    <br/>
                    <input className='iNick' maxLength="13" type='text' placeholder='Introduzca nick' ref='nickText'required />
                    <br/>
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

    }
}