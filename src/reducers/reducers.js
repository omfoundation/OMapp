import { combineReducers } from 'redux'
import {
    SIGN_UP_USER_WITH_GOOGLE,
    SHOW_SIGN_UP_VIEW,
} from '../actions'

function root(previousState, action){
    let newState = {}
    switch (action.type) {
        case SIGN_UP_USER_WITH_GOOGLE:
            newState = Object.assign({}, previousState,
                { loading:true }
            )
            return newState
        case SHOW_SIGN_UP_VIEW:
            newState = Object.assign({}, previousState,
            { 
                loading: false,
                userInfo: action.userInfo,
                loginStatus: 'SIGN_UP_VIEW'
            })
            return newState
        default:
            return {loginStatus: 'NOT_AUTHENTICATED'}    
    }
}

const rootReducer = combineReducers({
    root
})

export default rootReducer