import React, { Component } from 'react'

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
