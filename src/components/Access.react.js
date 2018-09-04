import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Container, Grid, Button, Icon } from 'semantic-ui-react'
import { Header, Image, Modal, Form, Card } from 'semantic-ui-react'

export default class Access extends Component {

    render() {
        return (
            <Grid verticalAlign='middle'>
                <Grid.Row centered>
                    <Grid.Column computer={6} mobile={14} tablet={10}>
                        <br />
                        <br />
                        <Card fluid>
                            <Card.Content>
                                <Image floated='right' size='mini' alt="logo" src='favicon.ico' />
                                <Card.Header>OMapp</Card.Header>
                                <Card.Meta>OlimMorin app</Card.Meta>
                                <Card.Description>
                                    Para disfrutar de los servicios que ofrece la plataforma desde registrarte o iniciar sesion.
                                    <br />
                                    Prodras hacerlo facilmente:
                                    <br />
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
                                            <Button onClick={() => this.props.googleAuthenticationHandler()} positive> <Icon name="google" />Entra con Google</Button>
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