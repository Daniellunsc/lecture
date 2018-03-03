import {
    SET_CATEGORIES,
    ERROR_FETCH_CATEGORIES
} from '../actions/categoriesActions'

const initialState = {
    categories: []
}

function categoriesReducer(state=initialState, action){

    console.log(action)

    switch(action.type){

        case SET_CATEGORIES:
            return {...state, categories: action.categories}
            
        case ERROR_FETCH_CATEGORIES:
            return {...state, error: action.error}

        default:
            return {...state}
    }

}

export default categoriesReducer