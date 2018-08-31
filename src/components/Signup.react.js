import React, { Component } from 'react'
import { Container, Grid, Header, Form, Checkbox, Button, Input } from 'semantic-ui-react'
import { User } from '../omapp/omapp'

import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { Field, reduxForm } from 'redux-form';

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

export default class SignUp extends Component{

    constructor(props){
        super(props)
        this.username = "{username}"
    }

    completarReg(idPlan, authLevel){
        if(this.checkForm()){
            if (this.props.signupMethod === "google.com"){
                
                let user = this.props.user
                user.username = this.refs.nickText.value
                this.props.signupUserHandler(user);
            }
            else if (this.props.signupMethod === "email") {
                this.props.signupWithEmailAndPasswordHandler(this.refs.email.value, this.refs.psw.value, this.refs.nickText.value, idPlan, authLevel);
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

    submit = (values) => {
        // Do something with the form values
        console.log(values);
      }

    render(){
        return(
            <Grid>
                <Grid.Row/>
                <Grid.Row centered>
                    <Grid.Column width={14}>
                        <Header as='h3'>Registro de usuario</Header>
                            <SignUpForm onSubmit={this.submit}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        ) 

    }
}



class SignUpForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Field value={this.username}>
                    <label>Nombre de usuario</label>
                    <input placeholder='Anonymouse' />
                    <Input type='hidden' value='1'/>
                    <Form.Button>Subscribir</Form.Button>
                </Form.Field>
            </Form>
      )
    }
  }

  SignUpForm = reduxForm({
    form: 'signUp' // a unique name for this form
  })(SignUpForm);