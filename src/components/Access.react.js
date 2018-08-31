import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Container, Grid, Button, Icon } from 'semantic-ui-react'
import { Header, Image, Modal, Form, Card } from 'semantic-ui-react'

export default class Access extends Component {

    render() {
        return (
            <Grid centered verticalAlign='middle' columns={2}>
                <Grid.Row >
                    <Grid.Column>
                        <br />
                        <br />
                        <Card >
                            <Card.Content>
                                <Image floated='right' size='mini' alt="logo" src='favicon.ico' />
                                <Card.Header>OMapp</Card.Header>
                                <Card.Meta>OlimMorin app</Card.Meta>
                                <Card.Description>
                                    Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                                    <br/>
                                    Prodras hacerlo facilmente:
                                    <br/>
                                    {this.props.error}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    {/*****************Iniciar sesion modal *************/}
                                    <Modal trigger={<Button color="black">Iniciar sesion</Button>} closeIcon>
                                        <Modal.Header ><Icon name="sign in" />Log In</Modal.Header>
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
                                            <Button type="submit" className="btn" onClick={() => alert('implementar')}>Iniciar sesion</Button>
                                            <Button onClick={() => this.props.onSignupWithGoogleHandler()} positive> <Icon name="google" />Entra con Google</Button>
                                        </Modal.Actions>
                                    </Modal>
                                    {/*****************Registro modal *************/}
                                    <Modal trigger={<Button color="black">Registrarse</Button>} closeIcon>
                                        <Modal.Header ><Icon name="signup" />Sign Up</Modal.Header>
                                        <Modal.Content>
                                            <h2>Registrate con los siguientes metodos:</h2>
                                            <Container textAlign={"center"}>
                                                <Button.Group >
                                                    <Button onClick={() => alert('implementar')}>Con email y contraseña</Button>
                                                    <Button.Or text='O' />
                                                    <Button onClick={() => this.props.signupWithGoogleHandler()} positive><Icon name="google" />Con cuenta Google</Button>
                                                </Button.Group>
                                            </Container>
                                        </Modal.Content>
                                    </Modal>
                                </div>
                            </Card.Content>
                        </Card>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

class SignupMethodChoicePopup extends Component {

    onSignupWithEmailAndPasswordHandler() {
        this.props.signupWithEmailPasswordHandler();
    }

    closeClickHandler() {
        this.props.onCloseHandler();
    }

    signupWithEmailPasswordClickHandler() {
        this.props.onSignupWithEmailAndPasswordHandler();
    }

    signupWithGoogleClickHandler() {
        this.props.onSignupWithGoogleHandler();
    }

    render() {
        return (
            <div ref="modRes" className="modal" style={this.props.style}>
                <div className="modal-content">
                    <span className="close" onClick={this.closeClickHandler.bind(this)}>&times;</span>
                    <h2>Registro</h2>
                    <p>Selecciona tu metodo preferido:</p>
                    <a className="btn"><button onClick={() => { this.signupWithEmailPasswordClickHandler() }}>Con email y contraseña</button></a>
                    <br />
                    <button onClick={() => this.signupWithGoogleClickHandler()}>Con cuenta Google</button>
                </div>
            </div>

        )
    }
}

class LoginMethodPopup extends Component {

    onLoginWithGoogle() {
        this.props.googleAuthenticationHandler();
    }

    checkLogData() {
        let txtEmail = this.refs.uemail.value;
        let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

        if ((txtEmail.replace(/\s/g, '') !== "") && (txtEmail.match(mailformat))) {
            //Chequeamos que no sea solo blancos
            //ok
            //return true;

            let txtPas = this.refs.upsw.value;

            if (txtPas.replace(/\s/g, '') !== "") {
                //Nada de blancos 
                //OK
            } else {
                alert("Introduce una clave valida");
                return false;
            }

        } else {
            alert("Introduce un email valido!");
            return false;
        }

        return true;
    }

    onProcessLogin() {
        if (this.checkLogData()) {
            this.props.processLoginHandler(this.refs.uemail.value, this.refs.upsw.value);
        }
    }

    onClose() {
        this.props.onCloseHandler();
    }

    render() {
        return (
            <div ref="modLogIn" className="modal" style={this.props.style}>
                {/* Modal Content */}
                <div className="modal-content animate">
                    <span className="close red" onClick={this.onClose.bind(this)}>&times;</span>
                    <div className="container">
                        <label htmlFor="uemail"><b>Email</b></label>
                        <input type="text" placeholder="Enter email" ref="uemail" required />
                        <label htmlFor="upsw"><b>Contraseña</b></label>
                        <input type="password" placeholder="Enter contraseña" ref="upsw" required />
                        <button type="submit" className="btn greenBG" onClick={this.onProcessLogin.bind(this)}>Iniciar sesion</button>
                        <br />
                        <button className={"entra con google"} onClick={() => this.onLoginWithGoogle()}>Entra con Google</button>
                    </div>
                </div>
            </div>
        )
    }
}