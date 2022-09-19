import { ADD_TODO } from './toDoActionTypes'

const intialState  = {
    error:null,
    isLoaded : false,
    items:[{"id":"5fb563a29a28320b6f6995eb","subject":"WakeUp","isComplete":true,"createdDate":"2016-05-22T04:35:44Z","finishDate":"2016-05-23T04:35:44Z"}],
    newSubject:'',
    createdDate:new Date().toJSON(),
    finishDate:'',
    count: 1
}

const toDoReducer = (state = intialState, action) => {
        switch(action.type){
            case ADD_TODO :
                console.log('add todo called')    
            return {
                ...state,
                count : state.count + 1
                //logic to add todo item
                
            }
            default : return state
        }
}

export default toDoReducer