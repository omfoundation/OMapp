import React, { Component } from 'react';

//const omapp = function(){alert("HOLA");}

import omapp from "../omapp/omapp.js";

class OMAppComponent extends Component {

    constructor(props){
        super(props);
        this.omapp = omapp;
    }

    render(){
        return(
            <div></div>
        );
    }
}

export default OMAppComponent;