import React, { Component } from 'react';

import '../css/loader.css'

export default class Loading extends Component{
    constructor(props){
        super(props);

        this.state ={
            loader: true
        };
    }

    render(){
        return(
            <div className="loader"></div>
        ) 
    }
}