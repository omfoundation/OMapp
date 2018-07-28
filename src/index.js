import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { render } from "react-dom";

import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";

import './css/App.css';
import './css/index.css';

class App extends React.Component {

    constructor(props){
        super(props);
        this.props = props;
    }

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
                <Root>
                    <div>
                        <Route exact path="/" component={Root} location={this.props.location} />
                        <Route path="/signup" component={SignUp} location={this.props.location} />
                    </div>
                </Root>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));
