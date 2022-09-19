import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import "https://fonts.googleapis.com/css?family=Roboto";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import redux from 'redux'
// const createStore = redux.createStore

// const ADD_ITEM = 'ADD_ITEM';

// function addItem() {
//     return {
//         type:addItem,
//         info: 'add info'
//     }
// }

// const initialState = {
//     error:null,
//     isLoaded : false,
//     items:[],
//     newSubject:'',
//     createdDate:new Date().toJSON(),
//     finishDate:'',
//     count : 1
// };

// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case ADD_ITEM : return {
//             ...state,
//             count : state.count + 1
//         }

//         default : return state
//     }
// }

// const store = createStore(reducer)
// console.log('Initial state', state.getState())
// store.subscribe(() => console.log('Updated state', store.getState()))
// store.dispatch(addItem())
// store.dispatch(addItem())
// store.dispatch(addItem())
// store.dispatch(addItem())
