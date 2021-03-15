import React from 'react';
import { connect } from 'react-redux';
import { ADD_TODO } from '../constants/CONSTANTS';


export class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.props.addTodo('Ini Todo Baru')}
        >
          Tambah
        </button>
        <ol>
          {this.props.todo.map((el) => <li>{el}</li>)}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: function(todo) {
      dispatch({
        type: ADD_TODO,
        todo: todo
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
