import {combineReducers} from 'redux'
import categoriesReducer from './categoriesReducer'
import postsReducer from './postsReducer'
import commentsReducer from './commentsReducer'
import loginReducer from './loginReducer'
  
const rootReducer = combineReducers({categoriesReducer, postsReducer, commentsReducer,loginReducer})

export default rootReducer