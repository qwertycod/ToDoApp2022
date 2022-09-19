import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import {loadState, saveState } from '../localStorage';


const persistedState = loadState();
const store = createStore(rootReducer, persistedState,  composeWithDevTools(applyMiddleware(logger, thunk)))

store.subscribe(() =>{
    saveState(store.getState());
})

//const store = createStore(rootReducer,  applyMiddleware(logger, thunk), )
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))

export default store