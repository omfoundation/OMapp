import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../css/nav.css';
import { Menu, Icon, Sticky} from 'semantic-ui-react'

import OMAppComponent from '../components/OMAppComponent';

class NavBar extends Component{
    
    constructor(props){
        super(props);
        
        //this.getNameScreen = this.getNameScreen.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }
    
        openNav() {
            this.refs.sidenav.style.width = "250px";   
        }

        closeNav() {
            this.refs.sidenav.style.width = "0"; 
        }

        getNameScreen(){
            let nscr;

            switch(window.location.pathname){
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
        }
    render(){
        
        return(
            <div className="nav">

            <Sticky>
                <Menu inverted>

                <Menu.Item onClick={this.openNav}>
                    <Icon name='content'/>
                </Menu.Item>

                <Menu.Item header>
                    <p className="title">OMapp: <span className='nameScreen'>{this.getNameScreen()}</span></p>
                </Menu.Item>
                   
                </Menu>
            </Sticky>

           <div id="mySidenav" ref="sidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
                    <Link to='/home' onClick={this.closeNav.bind(this)}>Home</Link>
                    <Link to='/feed' onClick={this.closeNav.bind(this)}>Feed</Link>
                </div>

            </div>
        );
    }
}

export default NavBar;