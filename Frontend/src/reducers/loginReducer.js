import { LOGIN_USER } from '../actions/loginActions'

let initialState = {
    username: ''
}

function loginReducer(state=initialState, action){
    switch(action.type){

        case LOGIN_USER:
            return{
                ...state, username: action.username
            }

        default:
            return {...state}
    }
}

export default loginReducer