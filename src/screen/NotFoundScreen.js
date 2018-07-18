import React, { Component } from 'react';

const errorURL = 'https://image.freepik.com/vetores-gratis/erro-404-modelo-web-com-gato-engracado_23-2147763339.jpg';

class NotFoundScreen extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <img src={errorURL} alt='404' height="500"/>
            </div>
        );
    }
}

export default NotFoundScreen;