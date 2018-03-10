export const LOGIN_USER = 'LOGIN_USER'

export const loginUser = (username) => {
    return {
        type: LOGIN_USER,
        username
    }
}
