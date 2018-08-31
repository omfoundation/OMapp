import React, { Component } from 'react';
import { Container, Grid, Header, Form, Checkbox, Button } from 'semantic-ui-react'
import { User } from '../omapp/omapp'

export default class SignUp extends Component{

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

    render(){
        return(
            <Grid>
            <Grid.Row/>
            <Grid.Row centered>
            <Grid.Column width={14}>
            <Header as='h3'>Registro de usuario</Header>
            <Form>
            <Form.Field>
              <label>Nombre de usuario</label>
              <input placeholder='Anonymouse' />
            </Form.Field>
            <Grid columns={1} stackable>
            <Grid.Row/>
            <Grid.Row centered>
                <Grid.Column width={5} textAlign={"center"} floated={"left"}>
                    
                        <Header as='h4' textAlign={"center"}>Plan A</Header>
                        <Container as='p' textAlign={"justified"}>
                            Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32  
                        </Container>
                        <Button type='submit'>Subscribir</Button>
                    
                </Grid.Column>
                <Grid.Column width={5} textAlign={"center"} floated={"left"}>
                    
                        <Header as='h4' centered textAlign={"center"}>Plan B</Header>
                        <Container as='p' textAlign={"justified"}>
                            Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32  
                        </Container>
                        <Button type='submit'>Subscribir</Button>
                   
                </Grid.Column>
                <Grid.Column width={5} textAlign={"center"} floated={"left"}>
                   
                        <Header as='h4' textAlign={"center"}>Plan C</Header>
                        <Container as='p' textAlign={"justified"}>
                            Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32  
                        </Container>
                        <Button type='submit'>Subscribir</Button>
                    
                </Grid.Column>
            </Grid.Row>
            </Grid>
          </Form>
          </Grid.Column>
          </Grid.Row>
          </Grid>
        ) 

    }
}