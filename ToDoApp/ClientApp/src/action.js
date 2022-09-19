import redux from 'redux'

const ADD_ITEM = 'ADD_ITEM';

function addItem() {
    return {
        type:addItem,
        info: 'add info'
    }
}

const initialState = {
    error:null,
    isLoaded : false,
    items:[],
    newSubject:'',
    createdDate:new Date().toJSON(),
    finishDate:'',
    count : 1
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_ITEM : return {
            ...state,
            count : state.count + 1
        }

        default : return state
    }
}