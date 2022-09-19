import React from 'react';
import {addTodoItem } from '../redux'
import { connect } from 'react-redux'

function ToDoContainer(props) {
    console.log(props)
    return (
        <div>
            <h2>Number of items - {props.state.todo.count}</h2>
            <button onClick={props.addTodoItem11}>Add item</button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        state : state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodoItem11 : () => dispatch(addTodoItem())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainer);