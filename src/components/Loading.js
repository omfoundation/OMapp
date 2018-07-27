import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import omapp from '../omapp/omapp.js';

import '../css/loader.css';

class Loading extends Component{
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
            return <Redirect to='/signup'/>
        }

        
    }
}

export default Loading;