import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/nav.css';
import OMAppComponent from '../components/OMAppComponent';

class NavBar extends Component{
    
    constructor(props){
        super(props);

        //this.getNameScreen = this.getNameScreen.bind(this);
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
                <div className="topnav">
                    <a onClick={this.openNav.bind(this)} className="menuBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"/>
                        </svg>
                    </a>

                    <p className="title">OMapp: <span className='nameScreen'>{this.getNameScreen()}</span></p>
                </div>

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