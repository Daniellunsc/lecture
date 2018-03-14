import {combineReducers} from 'redux'
import categoriesReducer from './categoriesReducer'
import postsReducer from './postsReducer'
import commentsReducer from './commentsReducer'
import loginReducer from './loginReducer'
import postOrderReducer from './postOrderReducer'
  
const rootReducer = combineReducers({
    categoriesReducer, 
    postsReducer, 
    commentsReducer,
    loginReducer,
    postOrderReducer})

export default rootReducer