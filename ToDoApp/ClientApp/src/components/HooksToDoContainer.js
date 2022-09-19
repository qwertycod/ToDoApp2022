import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {addTodoItem} from '../redux'


function HooksToDoContainer() {
  const count = useSelector(state => state.todo.count)
  const dispatch = useDispatch()
  console.log('rendering HooksToDoContainer')

    return (
        <div>
            <h2>count of state - {count} </h2>
            <button onClick={() => dispatch(addTodoItem())}>Add</button>
        </div>
    );
}

export default HooksToDoContainer;