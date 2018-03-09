
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

            let comments = state.comments.filter(comment=> comment.id !== action.comment.id)

            return{
                ...state, comments: [
                    ...comments,
                    {
                        ...action.comment
                    }
                ]
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