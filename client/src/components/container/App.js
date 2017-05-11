import React, { Component } from 'react';
import '../../App.css';
import Goal from './Goal'
import Steps from './Steps'


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1>GoalZapp</h1>
          <br/>
          <Goal />
          <Steps />
        </div>
        </div>
          );
          }
          }
