import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { requestUserInfoFromGoogle, signUpUser } from '../actions'

import { Route, Switch} from 'react-router' // react-router v4
import { Link } from 'react-router-dom'
import { ConnectedRouter, push } from 'connected-react-router'

import Main from './Main.react'
import Access from "./Access.react";
import SignUp from "./Signup.react";
import Home from './Home.react'
import NavBar from './NavBar.react'
import Loading from "./Loading.react";
import PrivateRoute from "./PrivateRoute.react"

import Views from '../views'

import * as omapp from '../omapp/omapp'

export class Root extends Component {

    constructor(props) {
        super(props)
        this.defaultProfilePhotoURL = 'https://discourse-cdn-sjc1.com/gethopscotch/uploads/default/original/3X/9/6/961305dba186fe363dbef523761f620698b7050a.gif'
    }

    signupWithGoogleHandler() {
        const { dispatch } = this.props
        dispatch(requestUserInfoFromGoogle())
    }

    signupUser(userInfo) {
        const { dispatch } = this.props
        dispatch(signUpUser(userInfo))
    }

    changeView(newView){
        console.log("cambiando vista");
        //dispatch(showScreenTest(newView));
        const { dispatch } = this.props
        dispatch(push(`/${newView}`));
    }

    render() {

        let { view, userInfo, pathname, search, hash } = this.props
        //const { dispatch } = this.props
        /**** Para forzar la entrada directa a Home ***/
        //view = Views.Home;
        /**********************************************/

        /**** Objeto contenedor de la información del usuario ***/
        //userInfo = {}
        /**********************************************/

        // if (view === Views.Loading){
        //     return <Loading/>
        // }
        // else if(view === Views.SignUp){
        //     return  (
        //         <SignUp 
        //             userInfo={ userInfo }
        //             signupUserHandler={ () => this.signupUser() }
        //         />
        //     )
        // }
        // else if(view === Views.Home){
        //     return <Main
        //             defaultProfilePhotoURL={ this.defaultProfilePhotoURL }
        //             userInfo={ userInfo }
        //             dispatch={dispatch}
        //         />
        // }
        // return (
        //     <Access 
        //         signupWithGoogleHandler={ () => this.signupWithGoogleHandler() }
        //     />
        // )

        return(
            <div>
                { userInfo.userAuthenticated  && <NavBar changeView={this.changeView.bind(this)} /> }
                <div>
                <ConnectedRouter history={this.props.history}>
                    <Switch>
                        <Route exact path='/' render={() => ( userInfo.userAuthenticated === true ?  <Main /> : <Access signupWithGoogleHandler={ () => this.signupWithGoogleHandler() } />)} />
                        <PrivateRoute path="/home" component={Home} user={this.props.user} defaultProfilePhotoURL={this.props.defaultProfilePhotoURL}  />
                        <PrivateRoute path="/feed" component={() => (<div><h2>Feed test</h2></div>)} />
                        <Route path="/signup" render={() => (<SignUp userInfo={ userInfo } signupUserHandler={ () => this.signupUser() }/>)} />
                        <PrivateRoute path="/" component={() => (<div>
                            <h2>View test</h2>
                            <p>
                                Pathname: {pathname}
                                <br />
                                search: {search}
                                <br />
                                hash: {hash}
                                <br />
                                <Link to='/op6?prueba=ha?segundo=sa'>Probando parametros en url</Link>
                            </p>
                            </div>)}/>
                    </Switch>
                </ConnectedRouter>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    console.log('userInfo que entra: ', state.userInfo)

    const { root } = state
    const { view, userInfo } = root
    const {pathname, search, hash} = state.router.location

    console.log('userInfo que sale: ', userInfo)

    return {
        view, userInfo, pathname, search, hash
    }
}

Root.propTypes = {
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object
}

export default connect(mapStateToProps)(Root)