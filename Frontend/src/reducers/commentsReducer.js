
import * as Helpers from '../utils/Helpers'

import {SET_COMMENTS, ADD_COMMENT, ALTER_COMMENT} from '../actions/commentsActions'

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

        case ALTER_COMMENT:
            return{
                ...state, comments: Helpers.applyUpdateInState(action.comment, state.comments)
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