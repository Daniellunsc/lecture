import {
    SET_POSTS,
    ALTER_POST,
    ERROR_FETCH_POSTS
} from '../actions/postsActions'

import * as Helpers from '../utils/Helpers'

let initialState = {
    posts:[]
}

function postsReducer(state=initialState, action){
    switch(action.type){

        case SET_POSTS:
            return {...state, posts: action.posts}

        case ALTER_POST:
            return{
                ...state, posts: Helpers.applyUpdateInState(action.post, state.posts)
            }

        case ERROR_FETCH_POSTS:
            return{
                ...state, postError: action.error
            }

        default:
            return {...state}
    }
}

export default postsReducer