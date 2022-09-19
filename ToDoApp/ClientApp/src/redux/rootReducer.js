import {combineReducers} from 'redux'
import toDoReducer from './todo/toDoReducer'
import userReducer from './user/userReducer'

const rootReducer = combineReducers(
    {
        todo : toDoReducer,
        user : userReducer
    }
)
 
export default rootReducer