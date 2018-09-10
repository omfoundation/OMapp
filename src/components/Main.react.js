import React from 'react';
import { Container } from 'semantic-ui-react';

import Home from './Home.react';
import NavBar from './NavBar.react';
import Loading from './Loading.react';
import { userRecordConstructor } from '../../node_modules/firebase-functions/lib/providers/auth';

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeView: <Home user={this.props.user}
                defaultProfilePhotoURL={this.props.defaultProfilePhotoURL} 
                /*logoutHandler={this.props.logoutHandler.bind(this)}*/
                />,
            nameView: "Home"
        }
    };
    //let activeView = <Home/>;
        //activeView = <Loading/>;
        changeView(newView){
            console.log("cambiando vista");
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
                    break;
            }
        }
        
        getViewName(){
            return this.state.nameView;
        }

    render() {

        console.log("USERINFO main", this.props.userInfo)

        return (
            <Container>
                <NavBar changeView={this.changeView.bind(this)} getterView={this.getViewName.bind(this)}/>
                { this.state.activeView }
            </Container>    
        )
    }
}
