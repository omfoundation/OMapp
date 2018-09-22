import React, { Component }from 'react';

import Home from './Home.react';
import Root from './Root.react'

import NavBar from './NavBar.react';
import Loading from './Loading.react';

import { connect } from 'react-redux'
import { push } from 'connected-react-router'


import PropTypes from 'prop-types'

import {showScreenTest} from '../actions'

export class Main extends React.Component {
    constructor(props){
        super(props);
    };
   
    render() {

        console.log("Props en main", this.props);

        let {screenName} = this.props

        return (
            <div>holi</div>   
        )  
    }
}

function mapStateToProps(state) {

    const { root } = state
    const { screenName } = root

    return {
        screenName
    }
} 

Main.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Main)