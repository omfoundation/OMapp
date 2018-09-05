import React, { Component } from 'react';
import { User } from '../omapp/model'

import { Form, Grid, Card, Button, List, Icon } from 'semantic-ui-react';

export default class SignUp extends Component {

    completarReg(idPlan, authLevel) {

        let mockUser = new User()
        
        mockUser.email = 'mock@gmail.com'
        mockUser.name = 'Mr. Cat Mock'
        mockUser.username = 'mockUsername'
        mockUser.profilePhotoURL = 'http://cdn.themindcircle.com/wp-content/uploads/2016/08/maine-coon-cat-photography-robert-sijka-1.jpg'

        this.props.signupUserHandler(mockUser)

        /*
        if (this.checkForm()) {
            if (this.props.signupMethod === "google.com") {

                let user = this.props.user
                user.username = this.refs.nickText.value
                this.props.signupUserHandler(user);
            }
            else if (this.props.signupMethod === "email") {
                this.props.signupWithEmailAndPasswordHandler(this.refs.email.value, this.refs.psw.value, this.refs.nickText.value, idPlan, authLevel);
            }
            else {
                alert('SignUp.js - ERROR');
            }

        }
        else {
            alert('ERROR - SignUp.js - completarReg');
        }
        */
    }

    checkForm() {
        return true
        /*
        if (!(this.props.signupMethod === 'google.com')) {

            //Registro por email
            let txtEmail = this.refs.email.value;
            let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

            if (!(txtEmail.replace(/\s/g, '') !== "") && (txtEmail.match(mailformat))) {
                alert("Introduce un email valido!");
                return false;
            }

            let txtPas = this.refs.psw.value;
            let txtPasRe = this.refs.pswRepeat.value;

            if (txtPas.replace(/\s/g, '') !== "") {

                //Chequeamos que no sea solo blancos
                if (txtPas === txtPasRe) {

                    //Claves iguales?
                    if ((txtPas.legth < 6)) {

                        //No es mayor a 6
                        alert("La clave debe ser de mayor longitud (min. 6char)");
                        return false;
                    }
                } else {
                    alert("Ambas claves deben ser iguales!");
                    return false;
                }
            } else {
                alert("Introduce una clave valida!");
                return false;
            }
        }

        //Verificamos nick
        let txtName = this.refs.nickText.value;

        if (txtName === "") {
            //No ha sido introducido
            alert("Introduce un nick!");
            return false;
        }

        return true;
        */
    }

    render() {
        return (
            <div>
                <br />
                {/* NAVBAR ACTIVO AQUI??*/}
                <br />
                <Grid verticalAlign='middle'>
                    <Grid.Row centered>
                        <Grid.Column computer={11} mobile={14} tablet={12}>
                            {this.props.signupMethod !== 'google.com' &&
                                //Si la forma de login es diferente a google para registrar
                                //Mostrar esto
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

                            <br />
                            <Form>
                                <Form.Field>
                                    <label>Apodo/Nick:</label>
                                    <input className='iNick' maxLength="13" type='text' placeholder='Introduzca nick' ref='nickText' required />
                                </Form.Field>
                                <br />
                            </Form>
                            <br />
                            <Card.Group centered>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Basico</Card.Header>
                                        <Card.Description>Gratis</Card.Description>
                                        <List as='ul'>
                                            <List.Item ><Icon name='right triangle'/>Id plan: 1</List.Item>
                                            <List.Item ><Icon name='right triangle'/>Nivel de acceso: 1</List.Item>
                                            <List.Item ><Icon name='right triangle'/>10GB</List.Item>
                                        </List>
                                    </Card.Content>
                                    <Card.Content extra className='ui two buttons'>
                                        <Button basic color='green' onClick={() => { this.completarReg(1, 1) }}>Seleccionar</Button>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Pro</Card.Header>
                                        <Card.Description>$1.99</Card.Description>
                                        <List as='ul'>
                                            <List.Item ><Icon name='right triangle'/>Id plan: 2</List.Item>
                                            <List.Item ><Icon name='right triangle'/>Nivel de acceso: 3</List.Item>
                                            <List.Item ><Icon name='right triangle'/>50GB</List.Item>
                                        </List>
                                    </Card.Content>
                                    <Card.Content extra className='ui two buttons'>
                                        <Button basic color='green' onClick={() => { this.completarReg(2, 3) }}>Seleccionar</Button>
                                    </Card.Content>
                                </Card>

                                <Card>
                                    <Card.Content>
                                        <Card.Header>Ultra</Card.Header>
                                        <Card.Description>$4.99</Card.Description>
                                        <List as='ul'>
                                            <List.Item ><Icon name='right triangle'/>Id plan: 2</List.Item>
                                            <List.Item ><Icon name='right triangle'/>Nivel de acceso: 5</List.Item>
                                            <List.Item ><Icon name='right triangle'/>150GB</List.Item>
                                        </List>
                                    </Card.Content>
                                    <Card.Content extra className='ui two buttons'>
                                        <Button basic color='green' onClick={() => { this.completarReg(3, 5) }}>Seleccionar</Button>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )

    }
}