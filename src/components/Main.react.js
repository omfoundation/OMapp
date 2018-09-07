import React from 'react';
import { Container } from 'semantic-ui-react';

import Home from './Home.react';
import NavBar from './NavBar.react';
import Loading from './Loading.react';
import { userRecordConstructor } from '../../node_modules/firebase-functions/lib/providers/auth';

export default class Main extends React.Component {
    render() {
        constructor(props){
            super(props);
            this.state = {
                activeView: <Home/>
            }
        }

        //let activeView = <Home/>;
        //activeView = <Loading/>;
        function changerView(newView){

        }
        
        function getViewName(){
            return this.state.activeView;
        }

        return (
            <Container>
                <NavBar manageView={() => this.changerView()} getterView={()=> this.getViewName()}/>
                { this.state.activeView }
            </Container>    
        )
    }
}
