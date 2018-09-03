const signUp = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_INFO_FROM_GOOGLE_ACCOUNT':
            return ['loading', {}]
        default:
            return state
    }
}

export default signUp