import { createStore } from 'redux';
import {
  ADD_TODO,
  USER_AUTHENTICATED
  // ADD_USERNAME,
  // TOKEN_AUTHENTICATED
} from './constants/CONSTANTS';


const preloadState = {
  todo: ["Sudah ada Todo"],
  isLogin: false,
  token: null
  // username: ''
}

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, action.todo]
      }
    case USER_AUTHENTICATED:
      return {
        ...state,
        isLogin: true,
        token: action.token
      }
    // case ADD_USERNAME:
    //   return {
    //     ...state,
    //     username: action.username
    //   }
  }
  return state;
}

export default createStore(reducer, preloadState)
