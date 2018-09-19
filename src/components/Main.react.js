import React, { Component }from 'react';

import Home from './Home.react';
import NavBar from './NavBar.react';
import Loading from './Loading.react';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {showScreenTest} from '../actions'

export class Main extends React.Component {
    constructor(props){
        super(props);
    };
    //let activeView = <Home/>;
        //activeView = <Loading/>;
        changeView(newView){
            console.log("cambiando vista");

            const { dispatch } = this.props;
            dispatch(showScreenTest(newView));

            /*
            switch (newView) {
                case "Home":
                    this.setState({
                        activeView: <Home user={this.props.user}
                            defaultProfilePhotoURL={this.props.defaultProfilePhotoURL}
                            />,
                        nameView: "Home"
                    });
                break;

                case "Feed":
                    this.setState({
                        activeView: <div><h2>Feed test</h2></div>,
                        nameView: "Feed"
                    });
                break;
            
                default:
                    this.setState({
                        activeView: <div><h2>{newView} View test</h2></div>,
                        nameView: newView
                    });
                    break;
            }*/
        }
        
        getViewName(){
            //return this.state.nameView;
        }

    render() {

        console.log("Props en main", this.props);

        let {screenName} = this.props
        let screenTest;

        

        switch (screenName) {
            case "Home":   
                screenTest = <Home user={this.props.user}
                            defaultProfilePhotoURL={this.props.defaultProfilePhotoURL}/>
            break;

            case "Feed":
                screenTest = <div><h2>Feed test</h2></div>
            break;
        
            default:
                screenTest = <div><h2>{screenName} View test</h2></div>
            break;
        }
        return (
            <div>
                <NavBar changeView={this.changeView.bind(this)} getterView={this.getViewName.bind(this)}/>
                {screenTest}
            </div>    
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