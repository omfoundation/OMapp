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
                    <a onClick={this.openNav.bind(this)} className="menuBtn">&#9776;</a>
                    <p className="title">OMapp: <span className='nameScreen'>{this.getNameScreen()}</span></p>
                </div>

                <div id="mySidenav" ref="sidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
                    <Link to='/' onClick={this.closeNav.bind(this)}>Home</Link>
                    <Link to='/feed' onClick={this.closeNav.bind(this)}>Feed</Link>
                </div>
            </div>
        );
    }
}

export default NavBar;