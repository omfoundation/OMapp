import React from "react";
import { Route } from 'react-router-dom'

import Home from "./Home.react";
import Loading from "./Loading.react";

export default class Main extends React.Component {
    render() {
        return (
            <Home 
                user={this.props.user} 
                defaultProfilePhotoURL={this.props.defaultProfilePhotoURL} 
                logoutHandler={this.props.logoutHandler.bind(this)}
            />
        )
    }
}
