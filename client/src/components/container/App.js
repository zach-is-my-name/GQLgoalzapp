import React, { Component } from 'react';
import '../../App.css';

import Goal from './Goal'
import Steps from './Steps'
import User from './User'


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1>GoalZapp</h1>
          <br/>
          <Goal />
          <Steps />
          <User />
        </div>
        </div>
          );
          }
          }
