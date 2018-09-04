import { combineReducers } from 'redux'
import {
    SIGN_UP_USER_WITH_GOOGLE,
    SHOW_SIGN_UP_VIEW,
    SHOW_HOME_VIEW,
    SHOW_LOADING_STATE,
    SIGN_UP_USER
} from '../actions'

function root(previousState, action){
    let newState = {}
    switch (action.type) {
        case SIGN_UP_USER_WITH_GOOGLE:
            return previousState
        case SHOW_SIGN_UP_VIEW:
            newState = Object.assign({}, previousState,
            { 
                userInfo: action.userInfo,
                loginStatus: 'SIGN_UP_VIEW'
            })
            return newState
        case SHOW_HOME_VIEW:
            newState = Object.assign({}, previousState,
            { 
                userInfo: action.userInfo,
                loginStatus: 'HOME_VIEW'
            })
            return newState
        case SHOW_LOADING_STATE:
            newState = Object.assign({}, previousState,
            { 
                loginStatus: 'LOADING',
            })
            return newState
        case SIGN_UP_USER:
            return previousState
        default:
            return {loginStatus: 'NOT_AUTHENTICATED'}    
    }
}

const rootReducer = combineReducers({
    root
})

export default rootReducer