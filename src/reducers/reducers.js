import { combineReducers } from 'redux'
import {
    REQUEST_USER_INFO_FROM_GOOGLE
} from './actions'

function userInformationObtainedFromGoogle(state = 'reactjs', action) {
    switch (action.type) {
      case REQUEST_USER_INFO_FROM_GOOGLE:
        return action.object
      default:
        return state
    }
}

const rootReducer = combineReducers({
    userInformationObtainedFromGoogle
})

export default rootReducer