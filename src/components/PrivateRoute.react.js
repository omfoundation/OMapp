import React from 'react'
import { Route, Redirect } from 'react-router' // react-router v4
import {isAuthUser} from '../omapp/omapp'

const PrivateRoute  = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthUser() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/'
          }} />
    )} />
  )

export default PrivateRoute;