import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Root from './components/Root.react'

const store = configureStore()

export default class AsyncApp extends Component {

    constructor(props){
        super(props)
        this.state = {hasError: false}
    }

    render() {
        if (this.state.hasError){
            return (<h1>ERROR</h1>)
        }
        else{
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
            )
        }
    }
}