import {
    SET_POSTS,
    ALTER_POST,
    POST_ERRORS,
    ADD_POST,
    SET_POST_ORDER
} from '../actions/postsActions'

import * as Helpers from '../utils/Helpers'

let initialState = {
    posts:[],
    postOrder: {}
}

function postsReducer(state=initialState, action){
    switch(action.type){

        case SET_POSTS:
            return {...state, posts: action.posts}

        case ALTER_POST:

            let posts = state.posts.filter(post=> post.id !== action.post.id)

            return{
                ...state, posts: [
                    ...posts,
                    {
                        ...action.post
                    }
                ]
            }

        case ADD_POST:
            return{
                ...state,
                posts: [
                    {
                        ...action.post
                    },
                  ...state.posts,                   
                ]
            }
            
        case SET_POST_ORDER:
            return{
                ...state,
                postOrder:{
                    type: action.payload.postOrder,
                    asc: action.payload.asc
                }
            }

        case POST_ERRORS:
            return{
                ...state, postError: action.error
            }
            

        default:
            return {...state}
    }
}

export default postsReducer