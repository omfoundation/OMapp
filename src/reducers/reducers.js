import { combineReducers } from 'redux'
import {
    SIGN_UP_USER_WITH_GOOGLE,
    SHOW_SIGN_UP_VIEW,
} from './actions'

function signUpUserWitnGoogle(previousState, action){
    switch (action.type) {
        case SIGN_UP_USER_WITH_GOOGLE:
            newState = Object.assign({}, previousState,
                { loading:true }
            )
            return newState
        default:
            return previousState         
    }
}

function showSignUpView(previousState, action){
    switch (action.type) {
        case SHOW_SIGN_UP_VIEW:
        newState = Object.assign({}, previousState,
            { 
                loading: false,
                userInfo: action.userInfo,
                loginStatus: 'SIGNUP_VIEW'
            }
        )
        return newState
    }
}

const rootReducer = combineReducers({
    signUpUserWitnGoogle,
    showSignUpView
})

export default rootReducer