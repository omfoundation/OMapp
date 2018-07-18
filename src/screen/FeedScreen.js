import React, { Component } from 'react';

const catURL = 'http://3.bp.blogspot.com/_tqK9UvJpH7I/TMc9tzPSFjI/AAAAAAAAEI0/dOwLJqp9M6U/s1600/lindo-gatito.jpg';

class FeedScreen extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <img src={catURL} height="300"  alt="gatito"/>
        );
    }
}

export default FeedScreen;