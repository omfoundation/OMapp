import React, { Component } from 'react'
import { connect } from 'react-redux'

import Root from './components/Root.react'

import { requestUserInfoFromGoogle } from './actions'

class AsyncApp extends Component {
  render() {
    return (<Root/>)
  }
}

function mapStateToProps(state) {
    const {
      loading,
      defaultState 
    } = state

    return {
        loading,
        defaultState
    }
} 
  
export default connect(mapStateToProps)(AsyncApp)
