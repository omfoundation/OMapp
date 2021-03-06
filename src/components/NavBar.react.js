import React, { Component } from 'react';
import { Menu, Dropdown, Tab, Responsive, Grid, TabPane, Icon, Accordion, Segment } from 'semantic-ui-react';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        /*Pasar por prop screen activa de loginStatus*/
        this.state = { activeItem: this.props.getterView()
                        , activeIndex: 1 };
    }

    handleItemClick = (e, { name }) => {
        //cambiamos componente
        this.props.changeView(name);
        //seteamos nombre
        //this.setState({ activeItem: name });
        //console.log("STATE Despues ", this.state);

    }

    handleClick = (e, titleProps) => {
        console.log("ACTIVE INDEX ", this.state);
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex })
    }

    LogOutClick() {
        //this.props.logoutHandler();
        alert("saliendo");
    }

    toggleMenu() {
        let menu = document.getElementById('verticalMenu');

        if (menu.style.display === 'block') {
            //ACTIVO >> desactivar
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

    render() {
        var vertMenu = {
            padding: 0,
            width: "100%",
            marginTop: 0,
            marginLeft: 0,
            marginRigth: 0,
            display: "none"

        };
        const navMenu = {
            padding: 0,
            minWidth: "100%",
            marginLeft: 0,
            marginRigth: 0,
            marginBottom: 0
        };

        const tabStyle = {
            padding: 0,
            marginLeft: 0,
            marginRigth: 0,
            minWidth: "100%"
        };

        const panes = [
            { menuItem: <Menu.Item header as="h4"><img src="favicon.ico" /> OMapp</Menu.Item> },
            {
                menuItem: 'Social',
                render: () =>
                    <Tab.Pane style={tabStyle}>
                        <Menu secondary>
                            <Menu.Item name="Home" active={this.state.activeItem === 'Home'} onClick={this.handleItemClick}>
                                Home
                            </Menu.Item>
                            <Menu.Item name="op2" active={this.state.activeItem === 'op2'} onClick={this.handleItemClick}>
                                Opcion 2
                            </Menu.Item>
                        </Menu>
                    </Tab.Pane>
            },
            {
                menuItem: 'Tab 2', render: () =>
                    <Tab.Pane style={tabStyle}>
                        <Menu secondary>
                            <Menu.Item name="Feed" active={this.state.activeItem === 'Feed'} onClick={this.handleItemClick}>
                                Feed
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
                <Responsive minWidth={Responsive.onlyTablet.minWidth} >
                    <Tab menu={{ attached: 'top', fixed: true }} panes={panes} style={tabStyle} />
                </Responsive>

                <Responsive maxWidth={Responsive.onlyMobile.maxWidth} >
                    <Menu borderless fixed  fluid style={navMenu}>
                        <Menu.Item>
                            <img src="favicon.ico" /> OMapp: 
                        </Menu.Item>

                        <Menu.Menu position="right">
                            <Menu.Item name='HGmenu' active={this.state.activeItem === 'HGmenu'} onClick={this.toggleMenu}>
                                <Icon disabled name='bars' color='black' />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    <Accordion as={Menu} vertical style={vertMenu} fluid stackable id="verticalMenu">
                        <Menu.Item>
                            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Social
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === 0}>
                                <Menu.Menu>
                                    <Menu.Item name="Home" active={this.state.activeItem === 'Home'} onClick={this.handleItemClick}>
                                        Home
                                    </Menu.Item>
                                    <Menu.Item name="op2" active={this.state.activeItem === 'op2'} onClick={this.handleItemClick}>
                                        Opcion 2
                                    </Menu.Item>
                                </Menu.Menu>
                            </Accordion.Content>
                        </Menu.Item>

                        <Menu.Item>
                            <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Tab 2
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === 1}>
                                <Menu.Menu>
                                    <Menu.Item name="Feed" active={this.state.activeItem === 'Feed'} onClick={this.handleItemClick}>
                                        Feed
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