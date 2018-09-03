import * as omapp from '../omapp/omapp'

export const SIGN_UP_USER_WITH_GOOGLE = 'SIGN_UP_USER_WITH_GOOGLE'
export const SHOW_SIGN_UP_VIEW = 'SHOW_SIGN_UP_VIEW'

function signUpUserWitnGoogle() {
    return {
      type: SIGN_UP_USER_WITH_GOOGLE
    }
  }

  function showSignUpView(userInfo) {
    return {
      type: SHOW_SIGN_UP_VIEW,
      userInfo: userInfo
    }
  }

export function requestUserInfoFromGoogle() {
    return dispatch => {
      dispatch(signUpUserWitnGoogle())
      return omapp.getUserInfoFromGoogle()
        .then(userInfo => dispatch(showSignUpView(userInfo)))
    }
  }