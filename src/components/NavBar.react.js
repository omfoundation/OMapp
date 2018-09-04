import React, { Component } from 'react';
import { Menu, Dropdown, Tab, TabPane } from 'semantic-ui-react';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        /*Pasar por prop screen actica*/
        this.state = { activeItem: 'home' };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    LogOutClick() {
        this.props.logoutHandler();
    }

   /*  getNameScreen() {
        let nscr;

        switch (window.location.pathname) {
            case '/':
                nscr = 'Acceder al sistema'
                break;

            case '/login':
                nscr = 'Iniciar sesion'
                break;

            case '/load':
                nscr = 'Cargando...'
                break;

            case '/signup':
                nscr = 'Sign Up'
                break;

            case '/home':
                nscr = 'Home'
                break;

            case '/feed':
                nscr = 'Feed'
                break;

            default:
                nscr = '404 Error'
        }

        return nscr;
    } */

    render() {

        return (
                <Menu stackable borderless attached='top'> 
                    <Menu.Item header as="h4">
                        <img src="favicon.ico" /> OMapp
                    </Menu.Item>
                    <Menu.Item name="home" active={this.state.activeItem === 'home'} onClick={this.handleItemClick}>
                        Home
                    </Menu.Item>
                    <Menu.Item name="feed" active={this.state.activeItem === 'feed'} onClick={this.handleItemClick}>
                        Feed
                    </Menu.Item>
                    <Dropdown item text='Conf' active={this.state.activeItem === 'home'}>
                        <Dropdown.Menu>
                            <Dropdown.Item>Opcion 1</Dropdown.Item>
                            <Dropdown.Item>Opcion 2</Dropdown.Item>
                            <Dropdown.Item>Opcion 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Menu position="right">
                        <Menu.Item onClick={() => this.LogOutClick()}>Salir</Menu.Item>
                    </Menu.Menu>
                </Menu>
        );
    }
}