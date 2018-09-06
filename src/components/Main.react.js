import React from 'react';
import { Container } from 'semantic-ui-react';

import Home from './Home.react';
import NavBar from './NavBar.react';
import Loading from './Loading.react';

export default class Main extends React.Component {
    render() {

        let activeView = <Home/>;

        activeView = <Loading/>;

        return (
            <Container>
                <NavBar />
                { activeView }
            </Container>    
        )
    }
}
