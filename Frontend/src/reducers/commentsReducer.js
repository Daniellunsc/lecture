
import * as Helpers from '../utils/Helpers'

import {SET_COMMENTS} from '../actions/commentsActions'

let initialState = {
    comments: []
}

function commentsReducer(state=initialState, action){
    switch(action.type){
        default:
            return {...state}
    }
}

export default commentsReducer