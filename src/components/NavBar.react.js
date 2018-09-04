import React, { Component } from 'react';
import { Menu, Dropdown, Tab, Responsive, Grid, TabPane, Icon, Accordion } from 'semantic-ui-react';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        /*Pasar por prop screen activa de loginStatus*/
        this.state = { activeItem: 'home', activeIndex: 0 };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    LogOutClick() {
        this.props.logoutHandler();
    }

    toggleMenu() {
        let menu = document.getElementById('verticalmenu');

        if (menu.style.display == 'block') {
            //ACITVO >> desactivar
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
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
        var vertMenu = {
            padding: 0,
            width: "100%",
            marginTop: 0,
            display: "none"

        };
        const navMenu = {
            padding: 0,
            width: "100%",
            marginBottom: 0
        };

        const tabStyle = {
            padding: 0,
            width: "100%"
        };

        const panes = [
            { menuItem: <Menu.Item header as="h4"><img src="favicon.ico" /> OMapp</Menu.Item> },
            {
                menuItem: 'Home',
                render: () =>
                    <Tab.Pane style={tabStyle}>
                        <Menu secondary>
                            <Menu.Item name="op1" active={this.state.activeItem === 'op1'} onClick={this.handleItemClick}>
                                Opcion 1
                            </Menu.Item>
                            <Menu.Item name="op2" active={this.state.activeItem === 'op2'} onClick={this.handleItemClick}>
                                Opcion 2
                            </Menu.Item>
                            <Menu.Item name="op3" active={this.state.activeItem === 'op3'} onClick={this.handleItemClick}>
                                Opcion 3
                            </Menu.Item>
                        </Menu>
                    </Tab.Pane>
            },
            {
                menuItem: 'Tab 2', render: () =>
                    <Tab.Pane style={tabStyle}>
                        <Menu secondary>
                            <Menu.Item name="op4" active={this.state.activeItem === 'op4'} onClick={this.handleItemClick}>
                                Opcion 4
                            </Menu.Item>
                            <Menu.Item name="op5" active={this.state.activeItem === 'op5'} onClick={this.handleItemClick}>
                                Opcion 5
                            </Menu.Item>
                            <Menu.Item name="op6" active={this.state.activeItem === 'op6'} onClick={this.handleItemClick}>
                                Opcion 6
                            </Menu.Item>
                        </Menu>
                    </Tab.Pane>
            },
            { menuItem: 'Salir' }
        ]



        return (
            //<Menu stackable>
            <div>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Tab menu={{ attached: 'top', fixed: true }} panes={panes} style={tabStyle} />
                </Responsive>

                <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                    <Menu borderless fixed style={navMenu} fluid>
                        <Menu.Item>
                            <img src="favicon.ico" /> OMapp
                        </Menu.Item>

                        <Menu.Menu position="right">
                            <Menu.Item name='HGmenu' active={this.state.activeItem === 'HGmenu'} onClick={this.toggleMenu}>
                                <Icon disabled name='bars' color='black' />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    <Accordion as={Menu} vertical style={vertMenu} fluid stackable id="verticalmenu">
                        <Menu.Item>
                            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Home
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === 0}>
                                <Menu.Menu>
                                    <Menu.Item name="op1" active={this.state.activeItem === 'op1'} onClick={this.handleItemClick}>
                                        Opcion 1
                                    </Menu.Item>
                                    <Menu.Item name="op2" active={this.state.activeItem === 'op2'} onClick={this.handleItemClick}>
                                        Opcion 2
                                    </Menu.Item>
                                    <Menu.Item name="op3" active={this.state.activeItem === 'op3'} onClick={this.handleItemClick}>
                                        Opcion 3
                                    </Menu.Item>
                                </Menu.Menu>
                            </Accordion.Content>
                        </Menu.Item>

                        <Menu.Item name='browse' active={this.state.activeItem === 'browse'} onClick={this.handleItemClick}>
                            <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Tab 2
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === 1}>
                                <Menu.Menu>
                                    <Menu.Item name="op4" active={this.state.activeItem === 'op4'} onClick={this.handleItemClick}>
                                        Opcion 4
                                    </Menu.Item>
                                    <Menu.Item name="op5" active={this.state.activeItem === 'op5'} onClick={this.handleItemClick}>
                                        Opcion 5
                                    </Menu.Item>
                                    <Menu.Item name="op6" active={this.state.activeItem === 'op6'} onClick={this.handleItemClick}>
                                        Opcion 6
                                    </Menu.Item>
                                </Menu.Menu>
                            </Accordion.Content>
                        </Menu.Item>
                        <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleItemClick}>
                            Salir
                        </Menu.Item>
                    </Accordion>
                </Responsive>
            </div>
            //</Menu>
        );
    }
}