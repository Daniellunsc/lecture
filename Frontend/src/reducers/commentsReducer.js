
import * as Helpers from '../utils/Helpers'

import {SET_COMMENTS} from '../actions/commentsActions'

let initialState = {
    comments: []
}

function commentsReducer(state=initialState, action){
    switch(action.type){

        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }

        default:
            return {...state}
    }
}

export default commentsReducer