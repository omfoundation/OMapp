import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import omapp from '../omapp/omapp.js';

import '../css/signup.css';

class SignUpScreen extends Component{
    constructor(props){
        super(props);

        this.state = omapp.getCurrentuser();
        //this.state = () => omapp.getCurrentuser().then(result => result);

        this.completarReg = this.completarReg.bind(this);
    }

    completarReg(idPlan, authLevel){
        
        let txtName = this.refs.nickText.value;
        //chequeamos si nick fue introducido
        if(txtName != ""){
            //console.log('completando: '+ txtName+ ' IdPla: ' + idPlan + ' lvel: ' +authLevel);

            omapp.completeRegDB(txtName,idPlan,authLevel, this);

        }else{
            //No ha sido introducido
            alert("Introduce un nick!");
        }
    }

    componentDidMount() {
        omapp.onMount(this);
    }

    render(){
        console.log('signup', this.state);
        if(!(omapp.getCurrentuser().inDB)){
            //No hay registro
            return(
                <div> 
                    <form>
                        <br/>
                        <label className='lbForm'><b>Apodo/Nick:</b></label>
                        <br/>
                        <input className='iNick' maxLength="13" type='text' placeholder='Introduzca nick' ref='nickText'required autoFocus/>
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
                        
                    </form>
                </div>
            )
        }else{
            console.log("Sing > home");
            return <Redirect to='/home'/>
        }
        
    }
}

export default SignUpScreen;