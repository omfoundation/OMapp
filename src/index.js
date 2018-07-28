import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import { render } from "react-dom";

import { Root } from "./components/Root";

import './css/App.css';
import './css/index.css';

class App extends React.Component {
    render() {
        return (
            /*
            <Router>
                <Route path={"/"} component={Root} >
                    <Route path={"home"} component={Access} />
                    <Route path={"404"} component={NotFound} />
                    <Route path={"signup"} component={SignUp} />
                </Route>
            </Router>
            */
            <Router>
               <Root/>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));
