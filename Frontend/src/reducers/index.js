import {combineReducers} from 'redux'
import categoriesReducer from './categoriesReducer'
import postsReducer from './postsReducer'
 
const rootReducer = combineReducers({categoriesReducer, postsReducer})

export default rootReducer