import { combineReducers } from 'redux'
import {
    SIGN_UP_USER_WITH_GOOGLE,
    SHOW_SIGN_UP_VIEW,
    SHOW_HOME_VIEW,
    SHOW_LOADING_STATE,
    SIGN_UP_USER,
    LOG_OUT_START,
    SHOW_SCREEN_TEST
} from '../actions'

import Views from '../views'

function root(previousState, action){
    let newState = {}
    switch (action.type) {
        case SIGN_UP_USER_WITH_GOOGLE:
            return previousState

        case SHOW_SIGN_UP_VIEW:
            newState = Object.assign({}, previousState,
            { 
                userInfo: action.userInfo,
                view: Views.SignUp
            })
            return newState

        case SHOW_HOME_VIEW:
            newState = Object.assign({}, previousState,
            { 
                userInfo: action.userInfo,
                view: Views.Home
            })
            return newState

        case SHOW_LOADING_STATE:
            newState = Object.assign({}, previousState,
            { 
                view: Views.Loading,
            })
            return newState

        case SIGN_UP_USER:
            return previousState

        case SHOW_SCREEN_TEST:
            newState = Object.assign({},previousState,{
                screenName: action.screen
            })
            return newState;
        default:
            return {view: Views.Access}    
    }
}

function home(previousState, action){
    let newState = {}
    switch (action.type) {
        case LOG_OUT_START:
            newState = Object.assign({}, previousState,
            { 
                view: Views.Loading,
            })
            return newState
        default:
            return { view: Views.Access }    
    }
}

const rootReducer = combineReducers({
    root,
    home
})

export default rootReducer