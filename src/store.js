import { createStore } from 'redux';
import {
  ADD_TODO
} from './constants/todo';


const preloadState = {
  todo: ["Sudah ada Todo"]
}

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, action.todo]
      }
  }
  return state;
}

export default createStore(reducer, preloadState)
