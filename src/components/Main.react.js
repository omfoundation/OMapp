import React from 'react';
import { Container } from 'semantic-ui-react';

import Home from './Home.react';
import NavBar from './NavBar.react';
import Loading from './Loading.react';

import {showScreenTest} from '../actions'

export default class Main extends React.Component {
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
                console.log('set Home');
                screenTest = <Home user={this.props.user}
                            defaultProfilePhotoURL={this.props.defaultProfilePhotoURL}/>
            break;

            case "Feed":
            console.log('set feed');
                screenTest = <div><h2>Feed test</h2></div>
            break;
        
            default:
                console.log('set',screenName);
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
