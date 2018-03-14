import {
    SET_POST_ORDER
} from '../actions/postsActions'

let initialState = {
    postOrder: {}
}

function postOrderReducer(state=initialState, action){
    switch(action.type){

        case SET_POST_ORDER:
            return{
                ...state,
                postOrder:{
                    type: action.payload.postOrder,
                    asc: action.payload.asc
                }
            }

        default:
            return {...state}
    }
}

export default postOrderReducer