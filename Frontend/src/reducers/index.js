import {SET_CATEGORIES} from '../actions'

const initialState = {
    categories: []
}

function lecture(state=initialState, action){
    console.log(action)
    switch(action.type){
        
        case SET_CATEGORIES:
            return {...state, categories: action.categories}

        default:
            return state
    }
}

export default lecture