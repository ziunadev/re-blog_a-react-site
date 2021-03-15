import { createStore } from 'redux';
import {
  ADD_TODO
} from './constants/CONSTANTS';


const preloadState = {
  todo: ["Sudah ada Todo"],
  username: [],
  password: []
}

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, action.todo]
      }
    case ADD_USERNAME:
      return {
        ...state,
        username: 
      }
  }
  return state;
}

export default createStore(reducer, preloadState)
