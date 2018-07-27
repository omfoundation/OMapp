import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import omapp from '../omapp/omapp.js';

const catURL = 'http://3.bp.blogspot.com/_tqK9UvJpH7I/TMc9tzPSFjI/AAAAAAAAEI0/dOwLJqp9M6U/s1600/lindo-gatito.jpg';

class FeedScreen extends Component{

    constructor(props){
        super(props);
    }

    render(){
        if(omapp.isLogIn()){
            return(
                <img src={catURL} height="300"  alt="gatito"/>
            );
        }else{
            return <Redirect to='/'/>
        }
    }
}

export default FeedScreen;