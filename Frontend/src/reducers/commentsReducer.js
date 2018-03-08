
import * as Helpers from '../utils/Helpers'

import {SET_COMMENTS, ADD_COMMENT} from '../actions/commentsActions'

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
        
        case ADD_COMMENT:
            return {
                ...state,
                comments: [
                    {
                    ...action.comment
                    },
                    ...state.comments
                ]
                
                
            }

        default:
            return {...state}
    }
}

export default commentsReducer