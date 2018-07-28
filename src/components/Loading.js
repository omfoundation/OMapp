import React, { Component } from 'react';

import { SignUp } from './SignUp';

import omapp from '../omapp/omapp.js';

import '../css/loader.css';

export class Loading extends Component{
    constructor(props){
        super(props);

        this.state ={
            loader: true
        };
    }

    render(){
        if(omapp.dataUser.inDB == null){
            omapp.checkReg(this);
        }

        if(this.state.loader){
            return(
                <div className="loader"></div>
            )
        }else{
            return <SignUp/>
        }

        
    }
}