export const REQUEST_USER_INFO_FROM_GOOGLE = 'REQUEST_USER_INFO_FROM_GOOGLE'

function requestUserInfoFromGoogle(object) {
    return {
        type: REQUEST_USER_INFO_FROM_GOOGLE,
        object
    }
}