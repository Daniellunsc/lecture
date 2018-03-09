
import * as Helpers from '../utils/Helpers'

import {SET_COMMENTS, ADD_COMMENT, ALTER_COMMENT, SET_EDITING_ID} from '../actions/commentsActions'

let initialState = {
    comments: [],
    editingID: ''
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

        case SET_EDITING_ID:
            return{
                ...state, editingID: action.idcomment
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