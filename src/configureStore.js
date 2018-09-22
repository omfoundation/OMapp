
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/reducers'

import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const loggerMiddleware = createLogger()
export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  console.log('PRELOADED STATE: ', preloadedState)
  return createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      loggerMiddleware
    )
  )
}