import React from 'react';
import { connect } from 'react-redux';
import { ADD_USERNAME, ADD_PASSWORD } from '../constants/CONSTANTS';
import './Login.css';


export default class Login extends React.Component {
  render() {
    return(
      <div>
        <form>
          <div>
            <label>Username</label>
            <input
              type="text"
              onChange={}/>
          </div>
        </form>
      </div>
    )
  }
}
