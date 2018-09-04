import React, { Component } from 'react';
import { Menu, Dropdown, Tab, TabPane } from 'semantic-ui-react';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        /*Pasar por prop screen activa de loginStatus*/
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
        const tabStyle = {
            padding: 0,
            width: "100%"
        }

        const panes = [
            { menuItem: <Menu.Item header as="h4"><img src="favicon.ico" /> OMapp</Menu.Item>},
            {
                menuItem: 'Home',
                render: () => 
                    <Tab.Pane style={tabStyle}> 
                        <Menu stackable secondary>
                            <Menu.Item name="home" active={this.state.activeItem === 'home'} onClick={this.handleItemClick}>
                                Opcion 1
                            </Menu.Item>
                            <Menu.Item name="feed" active={this.state.activeItem === 'feed'} onClick={this.handleItemClick}>
                                Opcion 2
                            </Menu.Item>
                            <Menu.Item name="feeds" active={this.state.activeItem === 'feeds'} onClick={this.handleItemClick}>
                                Opcion 3
                            </Menu.Item>
                        </Menu>
                    </Tab.Pane>
            },
            {
                menuItem: 'Tab 2', render: () => 
                    <Tab.Pane style={tabStyle}>
                        <Menu stackable secondary>
                            <Dropdown item text='Conf' active={this.state.activeItem === 'home'}>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Opcion 1</Dropdown.Item>
                                    <Dropdown.Item>Opcion 2</Dropdown.Item>
                                    <Dropdown.Item>Opcion 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    </Tab.Pane>
            },
            { menuItem: 'Salir'}
        ]

        

        return (
            //<Menu stackable>
                <Tab menu={{ attached: 'top' }} panes={panes} style={tabStyle}/>
            //</Menu>
        );
    }
}