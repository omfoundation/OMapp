import React, { Component } from 'react';

const omapp = function(){alert("HOLA");}

class OMAppComponent extends Component {

    constructor(props){
        super(props);
        //this.LogInClick = this.LogInClick.bind(this);
        this.omapp = omapp;
    }

    render(){
        return(
            <div></div>
        );
    }
}

export default OMAppComponent;