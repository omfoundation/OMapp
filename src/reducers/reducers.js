import { combineReducers } from 'redux'
import {
    SIGN_UP_USER_WITH_GOOGLE,
    SHOW_SIGN_UP_VIEW,
} from '../actions'

const initialState = {}

function signUpUserWitnGoogle(previousState, action){
    switch (action.type) {
        case SIGN_UP_USER_WITH_GOOGLE:
            const newState = Object.assign({}, previousState,
                { loading:true }
            )
            return newState
        default:
            return initialState        
    }
}

function showSignUpView(previousState, action){
    switch (action.type) {
        case SHOW_SIGN_UP_VIEW:
            const newState = Object.assign({}, previousState,
            { 
                loading: false,
                userInfo: action.userInfo,
                loginStatus: 'SIGNUP_VIEW'
            }
        )
            return newState

        default:
            return initialState
    }
}

const rootReducer = combineReducers({
    signUpUserWitnGoogle,
    showSignUpView
})

export default rootReducer