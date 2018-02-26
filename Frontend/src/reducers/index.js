import {
    SET_CATEGORIES,
    SET_POSTS,
    ADD_POST,
} from '../actions'

const initialState = {
    categories: [],
    posts:[]
}

function lecture(state=initialState, action){
    console.log(action)
    switch(action.type){
        
        case SET_CATEGORIES:
            return {...state, categories: action.categories}
        case SET_POSTS:
            return {...state, posts: action.posts}

        default:
            return state
    }
}

export default lecture