import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Root from './components/Root.react'

const store = configureStore()

export default class AsyncApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
            )
    }
}